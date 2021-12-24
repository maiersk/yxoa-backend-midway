import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocTreeEntity } from '../entity/projectdoc_tree';

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
