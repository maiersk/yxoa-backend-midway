import * as _ from 'lodash';
import { Context } from 'egg';
import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocTreeEntity } from '../entity/doctree';
import { ProjectAppDocEntity } from '../entity/doc';

/**
 * 工程树
 */
@Provide()
export class ProjectAppDocTreeService extends BaseService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(ProjectAppDocTreeEntity)
  projectAppDocTreeEntity: Repository<ProjectAppDocTreeEntity>;

  @InjectEntityModel(ProjectAppDocEntity)
  projectAppDocEntity: Repository<ProjectAppDocEntity>;

  private tableName: string;
  
  /**
   * 获得所有目录
   */
  async list() {
    const items = await this.projectAppDocTreeEntity.find();

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
  async add(param: any): Promise<Object> {
    try {
      if (param.type == 1) {
        const doc = await this.projectAppDocEntity.findOne({ where: { id: param.docId } });
        param.name = doc.name;
        param.data = doc.data;
        param.count = doc.count;
        return this.projectAppDocTreeEntity.save(param);
      } else {
        return this.projectAppDocTreeEntity.save(param);
      }
    } catch (err) {
      throw new CoolCommException(err.message)
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
    for (const id of idArr) {
      await this.projectAppDocTreeEntity.delete({ id });
      await this.delChildItem(id);
    }
  }

  /**
   * 删除子目录
   * @param id
   */
  private async delChildItem(id) {
    const delItem = await this.projectAppDocTreeEntity.find({ parentId: id });
    if (_.isEmpty(delItem)) {
      return;
    }
    const delItemIds = delItem.map(e => {
      return e.id;
    })
    await this.projectAppDocTreeEntity.delete(delItemIds);
    for (const itemId of delItemIds) {
      await this.delChildItem(itemId)
    }
  }

  /**
   * 部门排序
   * @param params
   */
  async order(params) {
    for (const e of params) {
      await this.projectAppDocTreeEntity.update(e.id, e);
    }
  }



  /**
   * 
   * @param projectId 项目ID
   * @returns 项目树状数据库表名
   */
  private getTabname(projectId: number = 0) {
    try {
      if (this.tableName) return this.tableName;

      if (projectId === 0) {
        throw new CoolCommException('没有传入项目ID参数');
      }
      this.tableName = `project_app_tree_${projectId}`+"";
      return this.tableName;
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }
  
  /**
   * 获得所有目录
   */
  async prjDocList(param: any) {
    const items = await this.nativeQuery(`SELECT * FROM ${this.getTabname(param.projectId)};`);

    if (!_.isEmpty(items)) {
      items.forEach(e => {
        const parentItem = items.filter(m => {
          if (e.parentId == m.id) {
            return m.name;
          }
        })
        if (!_.isEmpty(parentItem)) {
          e.parentName = parentItem[0].name;
        }
      })
    }
    return items;
  }

  /**
   * 获得获取单个
   */
  async prjDocInfo(param: any) {
    try {
      const items = await this.nativeQuery(`SELECT * FROM ${this.getTabname(param.projectId)} WHERE id = ${param.id} LIMIT 1;`);
      if (_.isEmpty(items)) {
        return new CoolCommException('not find');
      }
      return items[0];
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }

  /**
   * 新增
   * @param param
   */
  async prjDocAdd(param: any): Promise<Object> {
    try {
      const sql = (args) => `INSERT INTO ${this.getTabname(param.projectId)} (
          id, createTime, updateTime,
          parentId, name, type, docId,
          data, remark, orderNum
        ) VALUES (
          DEFAULT, DEFAULT, DEFAULT,
          ${args?.parentId ?? 'DEFAULT'}, '${args.name}', ${args.type}, ${args?.docId ?? 'DEFAULT'},
          '${args?.data ?? ''}', '${args?.remark ?? ''}', ${args?.orderNum ?? 'DEFAULT'}
        );`
  
      if (param.type == 1) {
        const doc = await this.projectAppDocEntity.findOne({ where: { id: param.docId } });
        param.data = doc.data;
        param.count = doc.count;
      } else if (param.type == 2 && param.docNodes) {
        const docs = await this.projectAppDocEntity.find();
        let parents = [];

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

        for (const node of param.docNodes) {
          const docIdx = docs.findIndex((doc) => doc.id === node.docId);
          const doc = docs[docIdx];

          const obj = { ...node };
          if (doc) {
            obj.data = doc.data;
          }

          // 默认节点添加到param目标节点
          obj.parentId = param.parentId;

          // 具有子节点的父节点，否则都是子节点
          if (node.children) {
            // 属于父节点下的子目录
            if (node.parentId) {
              obj.parentId = node.parentId;

              setParentId(obj);
            }
            const res = await this.nativeQuery(sql(obj));
            // 记录新旧父节点id，并把node.id转string类型和node.parentId 作 === 比较
            parents.push({id: node.id+"", nowId: res.insertId });
          } else {
            // 子节点设置原来的父节点id
            obj.parentId = node.parentId;

            setParentId(obj);
            
            await this.nativeQuery(sql(obj));
          }
        }

        return
      }

      return await this.nativeQuery(sql(param));
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 更新
   * @param id
   * @param param
   */
  async prjDocUpdate(param: any) {
    try {
      const sql = (param) => `UPDATE ${this.getTabname(param.projectId)} SET
        updateTime = CURRENT_TIMESTAMP,
        parentId = ${param.parentId}, type = ${param.type}, docId = ${param?.docId ?? 'DEFAULT'},
        name = ${param.name ? `'${param.name}'` : 'DEFAULT'},
        data = ${param.data ? `'${param.data}'` : 'DEFAULT'},
        remark = ${param.remark ? `'${param.remark}'` : 'DEFAULT'}, orderNum = ${param.orderNum} WHERE id = ${param.id};`

      return await this.nativeQuery(sql(param));
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 删除
   * @param ids
   */
  async prjDocDelete(param: any, ids) {
    let idArr;
    if (ids instanceof Array) {
      idArr = ids;
    } else {
      idArr = ids.split(',');
    }
    for (const id of idArr) {
      await this.nativeQuery(`DELETE FROM ${this.getTabname(param.projectId)} WHERE id = ${id};`);
      await this.prjDocDelChildItem(param.projectId, id);
    }
  }

  /**
   * 删除子目录
   * @param id
   */
  private async prjDocDelChildItem(projectId, id) {
    try {
      const tableName = this.getTabname(projectId)
      const delItem = await this.nativeQuery(`SELECT * FROM ${tableName} WHERE parentId = ${id};`)
      if (_.isEmpty(delItem)) {
        return;
      }
      const delItemIds = delItem.map(e => {
        return e.id;
      })
      await this.nativeQuery(`DELETE FROM ${tableName} WHERE id IN(${delItemIds.join(',')});`);
      for (const itemId of delItemIds) {
        await this.prjDocDelChildItem(tableName, itemId)
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 部门排序
   * @param params
   */
  async prjDocOrder(projectId, params) {
    for (const e of params) {
      await this.nativeQuery(`
        UPDATE ${this.getTabname(projectId)} SET id = ${e.id},
          parentId = ${e.parentId},
          orderNum = ${e.orderNum},
          updateTime = CURRENT_TIMESTAMP WHERE id IN (${e.id});`);
    }
  }
}