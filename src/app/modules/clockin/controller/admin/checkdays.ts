import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CheckDayEntity } from '../../entity/checkday';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CheckDayEntity,
})
export class CheckDaysController extends BaseController {}
