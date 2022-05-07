import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppUserEntity } from '../../entity/project_user';
import { ProjectAppUserService } from '../../service/project_user';

/**
 * 项目用户控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppUserEntity,
  service: ProjectAppUserService
})
export class ProjectAppUserController extends BaseController {

}
