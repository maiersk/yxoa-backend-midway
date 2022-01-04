import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocTreeEntity } from '../../entity/docTree';
import { ProjectAppDocTreeService } from '../../service/docTree';

/**
 * 工程文档树形结构
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocTreeEntity,
  service: ProjectAppDocTreeService
})
export class ProjectAppDocTreeController extends BaseController {
  @Inject()
  projectAppDocTreeService: ProjectAppDocTreeService;
}
