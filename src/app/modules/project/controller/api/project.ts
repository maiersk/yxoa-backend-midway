import { Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEntity } from '../../entity/project'
import { ProjectAppService } from '../../service/project';
import { ProjectAppUserService } from '../../service/project_user';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: [],
  entity: ProjectAppEntity,
  service: ProjectAppService
})
export class ProjectApiController extends BaseController {
  @Inject()
  projectAppService: ProjectAppService;

  @Inject()
  projectAppUserService: ProjectAppUserService;

}
