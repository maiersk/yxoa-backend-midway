import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocTreeEntity } from '../entity/docTree';

/**
 * 描述
 */
@Provide()
export class ProjectAppDocTreeService extends BaseService {
  @InjectEntityModel(ProjectAppDocTreeEntity)
  projectAppDocEntity: Repository<ProjectAppDocTreeEntity>;

  /**
   * 描述
   */
  // async xxx() {}
}
