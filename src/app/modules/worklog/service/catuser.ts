import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WorkLogCategoryUserEntity } from '../entity/category_user';

/**
 * 描述
 */
@Provide()
export class WorkLogCategoryUserService extends BaseService {
  @InjectEntityModel(WorkLogCategoryUserEntity)
  wlogCategoryUser: Repository<WorkLogCategoryUserEntity>;

  /**
   * 描述
   */
  async xxx() {}
}
