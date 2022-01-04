import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEntity } from '../../entity/project'
import { ProjectAppService } from '../../service/project';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppEntity,
  service: ProjectAppService
})
export class ProjectController extends BaseController {
  @Inject()
  projectAppService: ProjectAppService;
}
