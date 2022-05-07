import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppPrjContactsEntity } from '../../entity/project_contacts';
import { ProjectAppPrjContactsService } from '../../service/project_contacts';

/**
 * 项目用户控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppPrjContactsEntity,
  service: ProjectAppPrjContactsService
})
export class ProjectAppPrjContactsController extends BaseController {

}
