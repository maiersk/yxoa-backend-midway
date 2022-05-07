import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';


/**
 * 设备清单
 */
@EntityModel('project_app_equipment')
export class ProjectAppEquipmentEntity extends BaseEntity {
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
}
