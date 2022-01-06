import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WorkLogCategoryEntity } from '../entity/category';

/**
 * 描述
 */
@Provide()
export class WorkLogCategoryService extends BaseService {
  @InjectEntityModel(WorkLogCategoryEntity)
  wlogCategoryEntity: Repository<WorkLogCategoryEntity>;

  /**
   * 得到分类下所有日志
   */
  async getwlogs(params: any) {
    return this.wlogCategoryEntity.find({ relations: ["wlogs"] });
  }

  /**
   * 添加日志用户
   */
  async addUsers(params: any) {
    
  }

  /**
   * 删除日志用户
   */
  async delUser(params: any) {

  }

}
