import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocEntity } from '../../entity/doc'

/**
 * 项目文档
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocEntity,
})
export class ProjectAppDocController extends BaseController {

}
