import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocCategoryEntity } from '../entity/doc_category';

/**
 * 描述
 */
@Provide()
export class ProjectAppDocCategoryService extends BaseService {
  @InjectEntityModel(ProjectAppDocCategoryEntity)
  docCategoryEntity: Repository<ProjectAppDocCategoryEntity>;

  // /**
  //  * 描述
  //  */
  // async xxx() {}
}
