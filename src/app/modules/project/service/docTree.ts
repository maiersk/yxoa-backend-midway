import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocTreeEntity } from '../entity/docTree';
import { Context } from 'egg';
import { ProjectAppDocEntity } from '../entity/doc';
import * as _ from 'lodash';

/**
 * 工程树
 */
@Provide()
export class ProjectAppDocTreeService extends BaseService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(ProjectAppDocTreeEntity)
  projectAppDocTreeEntity: Repository<ProjectAppDocTreeEntity>;

  @Inject()
  projectAppDocEntity: ProjectAppDocEntity;

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
}
