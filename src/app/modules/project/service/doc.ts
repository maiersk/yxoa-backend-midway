import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocEntity } from '../entity/doc';

/**
 * 描述
 */
@Provide()
export class ProjectAppDocService extends BaseService {
  @InjectEntityModel(ProjectAppDocEntity)
  projectAppDocEntity: Repository<ProjectAppDocEntity>;
}
