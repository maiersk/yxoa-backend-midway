import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppContactEntity } from '../../entity/contact';

/**
 * 各方联系方式控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppContactEntity,
})
export class ProjectAppContactController extends BaseController {}
