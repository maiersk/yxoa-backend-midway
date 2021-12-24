import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';

/**
 * 描述
 */
@Provide()
export class ProjectAppService extends BaseService {
  @InjectEntityModel(ProjectAppEntity)
  projectAppEntity: Repository<ProjectAppEntity>;

  /**
   * 描述
   */
  // async xxx() {}
}
