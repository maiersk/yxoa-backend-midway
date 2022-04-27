import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { ProjectAppEquipmentEntity } from './equipment';
import { ProjectAppEntity } from './project';

/**
 * 设备清单
 */
@EntityModel('project_app_equipment_list')
export class ProjectAppEquipmentListEntity extends BaseEntity {

  @ManyToOne((type) => ProjectAppEntity, project => project.equipments)
  project: ProjectAppEntity;

  @ManyToOne(() => ProjectAppEquipmentEntity)
  equipment: ProjectAppEquipmentEntity;
  
  @Column({ comment: '单位' })
  unit: string;

  @Column({ comment: '数量' })
  count: number;

  @Column({ comment: '含税单价' })
  price: number;

  @Column({ comment: '投标总价' })
  totalprice: number;

  @Column({ comment: '备注' })
  remark: string;

}
