import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEquipmentListEntity } from '../../entity/equipment_list';
import { ProjectAppEquipmentListService } from '../../service/equipments';

/**
 * 项目关联的设备列表
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppEquipmentListEntity,
  service: ProjectAppEquipmentListService,
})
export class ProjectAppEquipmentListController extends BaseController {}
