import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppPrjArchiveEntity } from '../../entity/archive';

/**
 * 历年项目存档
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppPrjArchiveEntity,
})
export class ProjectAppPrjArchiveController extends BaseController {

}
