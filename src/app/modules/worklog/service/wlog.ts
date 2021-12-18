import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { WorkLogAppEntity } from '../entity/wlog';

/**
 * 描述
 */
@Provide()
export class WorkLogService extends BaseService {
  @InjectEntityModel(WorkLogAppEntity)
  wlogEntity: Repository<WorkLogAppEntity>;

  /**
   * 描述
   */
  async add(param: any): Promise<Object> {
    
    return {}
  }
}
