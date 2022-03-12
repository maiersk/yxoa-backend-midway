import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppContactsEntity } from '../../entity/contacts';

/**
 * 各方联系方式控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppContactsEntity,
})
export class ProjectAppContactsController extends BaseController {}
