import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { ProjectAppEntity } from './project';

/**
 * 设备清单
 */
@EntityModel('project_app_prj_equipment')
export class ProjectAppPrjEquipmentEntity extends BaseEntity {

  @ManyToOne((type) => ProjectAppEntity, project => project.equipments, { onDelete: "CASCADE" })
  project: ProjectAppEntity;

  @Column({ comment: '货物名称' })
  name: string;

  @Column({ comment: '品牌' })
  brand: string;

  @Column({ comment: '型号' })
  model: string;

  @Column({ comment: '规格' })
  norm: string;

  @Column({ comment: '制造商名称' })
  manufacturer: string;

  @Column({ comment: '国籍' })
  country: string;

  @Column({ comment: '数量单位' })
  unit: string;

  @Column({ comment: '数量' })
  count: number;

  @Column({ comment: '含税单价' })
  price: number;

  @Column({ comment: '投标总价' })
  totalprice: number;

  @Column({ comment: '备注', nullable: true})
  remark: string;

}
