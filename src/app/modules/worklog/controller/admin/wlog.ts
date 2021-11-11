import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { WorkLogAppEntity } from '../../entity/wlog'

/**
 * 日志贴文 控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogAppEntity,
})
export class WorkLogAdminController extends BaseController {}
