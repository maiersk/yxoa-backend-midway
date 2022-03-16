import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEquipmentEntity } from '../../entity/equipment';

/**
 * 项目设备原始清单
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppEquipmentEntity,
})
export class ProjectAppEquipmentController extends BaseController {}
