import * as _ from 'lodash';
import { join } from 'path';
import { Context } from 'egg';
import { renameSync } from 'fs';
import { In, Repository } from 'typeorm';
import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { ProjectAppArchiveDocTreeEntity } from '../entity/archive_doc';
import { ProjectAppArchiveEntity } from '../entity/archive';
import { deleteOldFile, getArchiveDocFileUrl, getArchiveWritePath } from '../../../comm/utils';

/**
 * 描述
 */
@Provide()
export class ProjectAppArchiveDocService extends BaseService {
  @Inject()
  ctx: Context;
  
  @InjectEntityModel(ProjectAppArchiveDocTreeEntity)
  archiveDocEntity: Repository<ProjectAppArchiveDocTreeEntity>;

  @InjectEntityModel(ProjectAppArchiveEntity)
  archiveEntity: Repository<ProjectAppArchiveEntity>;

  /**
   * 生成一维节点列表，带有children属性的树节点
   * @param nodes 数据库所有节点列表
   * @param nodeIds 需要生成树的节点ID
   * @returns 
   */
  async createNodes(nodes, nodeIds) {
    const newNodes: Array<any> = [];
    const nodesMap: any = {};
    for (const node of nodes) {
      nodesMap[node.id] = node;
    }
    for (const nodeId of nodeIds) {
      const node = nodesMap[nodeId];
      const parent = nodesMap[node.parentId];

      if (parent) {
        (parent.children || (parent.children = [])).push(node);
      }

      newNodes.push(node);
    }

    const orderFn = (list: Array<any>) => {
      for (const node of list) {
        if (node.children instanceof Array) {
          node.children = node.children.sort((a, b) => {
            return a['orderNum'] - b['orderNum']
          });

          orderFn(node.children);
        }
      }
    }
    await orderFn(newNodes);

    const root = nodesMap[nodeIds[0]];
    let name = root.name;
    if (name.indexOf('_副本') !== -1) {
      let count: any = name.split('_副本')[1];
      if (!count) count = 0;
      name = name.substring(0, name.length - 1);
      name = name + `${+count + 1}`;
    } else {
      name = name + '_副本1';
    }
    root.name = name;

    return newNodes;
  }

  /**
   * 获得所有目录
   */
  async list(param: any) {
    const archive = await this.archiveEntity.findOne({
      where: { id: param.archiveId }
    });
    const items = await this.archiveDocEntity.find({
      where: archive ? { archive } : {}
    });

    if (!_.isEmpty(items)) {
      items.forEach(e => {
        const parentItem = items.filter(m => {
          if (e.parentId == m.id) {
            return m.name
          }
        })
        if (!_.isEmpty(parentItem)) {
          e.parentName = parentItem[0].name;
        }
      })
    }
    return items
  }

  /**
   * 新增
   * @param param
   */
  async add({ archiveId, name, parentId, type, file = null, remark, orderNum, archiveDate }: any): Promise<Object> {
    try {
      const archive = await this.archiveEntity.findOne({
        where: { id: archiveId }
      });
      if (!archive) throw new CoolCommException('没有该历年项目');

      if (file) {
        let oldPath, pathname = new URL(file).pathname;
        oldPath = join(this.ctx.app.baseDir, '..', `public`, pathname)
        const { fileName, writePath } = await getArchiveWritePath(archive, name, pathname);
        await renameSync(oldPath, writePath);        
        await deleteOldFile(file);
        file = await getArchiveDocFileUrl(archive, fileName);
      }

      const obj: any = await new ProjectAppArchiveDocTreeEntity();
      obj.archive = archive;
      obj.name = name;
      obj.parentId = parentId;
      obj.type = type;
      obj.file = file;
      obj.remark = remark;
      obj.orderNum = orderNum;
      obj.archiveDate = archiveDate;

      await this.archiveDocEntity.save(obj);
      return obj;
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 复制
   * @param param
   */
  async copy(param: any) {
    try {
      const archive = await this.archiveEntity.findOne({
        where: { id: param.archiveId }
      })
      if (!archive) throw new CoolCommException('没有该历年项目');
      if (!param.nodeIds) throw new CoolCommException('没有nodeIds参数');
      const nodes = await this.archiveDocEntity.find({
        where: { id: In(param.nodeIds) }
      })
      const newNodes = await this.createNodes(nodes, param.nodeIds);

      const parents = [];
      const setParentId = (obj) => {
        // 根据旧父节点id寻找新的父节点id
        const idx = parents.findIndex((n) => n.id === obj.parentId);
        const oldParent = parents[idx];
        if (oldParent) {
          obj.parentId = oldParent.nowId;
        } else {
          obj.parentId = param.parentId;
        }
      }

      for (const node of newNodes) {

        const obj = { ...node };

        // 默认节点添加到param目标节点
        obj.parentId = param.parentId;

        // 具有子节点的父节点，否则都是子节点
        if (node.children) {
          // 属于父节点下的子目录
          if (node.parentId) {
            obj.parentId = node.parentId;

            setParentId(obj);
          }
          const ids: any = { id: node.id+"" };
          obj.archive = archive;
          delete obj.id;
          const res = await this.archiveDocEntity.insert(obj);
          // 记录新旧父节点id，并把node.id转string类型和node.parentId 作 === 比较
          ids.nowId = res.raw.insertId
          parents.push(ids);
        } else {
          // 子节点设置原来的父节点id
          obj.parentId = node.parentId;
          obj.archive = archive;
          setParentId(obj);
          
          delete obj.id;
          await this.archiveDocEntity.insert(obj);
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 删除
   * @param ids
   */
  async delete(ids) {
    let idArr;
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }
    const docItems = await this.archiveDocEntity.find(idArr);
    for (const item of docItems) {
      if (item.file) await deleteOldFile(item.file);
      await this.archiveDocEntity.delete({ id: item.id });
      await this.delChildItem(item.id);
    }
  }

  /**
   * 删除子目录
   * @param id
   */
  private async delChildItem(id) {
    const delItem = await this.archiveDocEntity.find({ parentId: id });
    if (_.isEmpty(delItem)) {
      return;
    }
    const delItemIds = delItem.map((e) => {
      if (e.file) deleteOldFile(e.file);
      return e.id;
    })
    await this.archiveDocEntity.delete(delItemIds);
    for (const itemId of delItemIds) {
      await this.delChildItem(itemId);
    }
  }

  /**
   * 部门排序
   * @param params
   */
  async order(params) {
    for (const e of params.ids) {
      await this.archiveDocEntity.update(e.id, e);
    }
  }

}
