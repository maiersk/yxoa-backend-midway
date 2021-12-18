import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CoolController, BaseController } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { WorkLogCategoryEntity } from '../../entity/category';
import { WorkLogAppEntity } from '../../entity/wlog'

/**
 * 日志贴文 控制器
 */
@Provide()
@CoolController({
  api: ['delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogAppEntity,
})
export class WorkLogAdminController extends BaseController {
  @InjectEntityModel(WorkLogAppEntity)
  wlogEntity: Repository<WorkLogAppEntity>;
  @InjectEntityModel(WorkLogCategoryEntity)
  wlogCategory: Repository<WorkLogCategoryEntity>;

  async add(params: any) {
    let category
    if (params.categoryId) {
      category = this.wlogCategory.findOne(params.categoryId)
    }
    const wlog: any = this.wlogEntity.create(params)
    wlog.category = category
    category.wlogs = [...category.wlogs, wlog]
    category.save()

    return this.ok(wlog)
  }
}
