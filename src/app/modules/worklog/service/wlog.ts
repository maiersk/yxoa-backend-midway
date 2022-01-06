import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WorkLogAppEntity } from '../entity/wlog';
import { WorkLogCategoryEntity } from '../entity/category';

/**
 * 日志实体
 */
@Provide()
export class WorkLogService extends BaseService {
  @InjectEntityModel(WorkLogAppEntity)
  wlogEntity: Repository<WorkLogAppEntity>;

  @InjectEntityModel(WorkLogCategoryEntity)
  wlogCategory: Repository<WorkLogCategoryEntity>;

  /**
   * 分页查询
   * @param query
   */
  async page(query) {
    const sql = `
      SELECT
        a.id, a.title, a.context, a.categoryId, a.author, a.receive, a.pv,
        a.createTime, a.updateTime, b.name as categoryName
      FROM
        work_log a
        LEFT JOIN work_log_category b ON a.categoryId = b.id
    `
    return this.sqlRenderPage(sql, query)
  }

  /**
   * 添加日志
   * @param param
   */
  async add(param: any): Promise<Object> {
    const category = await this.wlogCategory.findOne({ where: { id: param.category } })
    if (category) {
      const wlog = await this.wlogEntity.save(param)
      await this.wlogEntity.update(wlog.id, { category })

      return wlog
    }
  }
}
