import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppArchiveEntity } from '../../entity/archive';
import { ProjectAppArchiveService } from '../../service/archive';
/**
 * 历年项目存档
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppArchiveEntity,
  service: ProjectAppArchiveService
})
export class ProjectAppArchiveController extends BaseController {

}
