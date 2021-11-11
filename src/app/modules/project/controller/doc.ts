import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { ProjectAppDocEntity } from '../entity/doc'

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
