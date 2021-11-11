import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { WorkLogAppEntity } from '../entity/wlog';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogAppEntity,
})
export class WorkLogAppController extends BaseController {}
