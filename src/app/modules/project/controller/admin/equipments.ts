import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppPrjEquipmentEntity } from '../../entity/project_equipment';
import { ProjectAppPrjEquipmentService } from '../../service/project_equipments';

/**
 * 项目关联的设备列表
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppPrjEquipmentEntity,
  service: ProjectAppPrjEquipmentService,
})
export class ProjectAppEquipmentListController extends BaseController {}
