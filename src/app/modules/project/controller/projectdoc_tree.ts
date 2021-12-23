import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocTreeEntity } from '../entity/projectdoc_tree';

/**
 * 工程文档树形结构
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocTreeEntity,
})
export class ProjectAppDocTreeController extends BaseController {}
