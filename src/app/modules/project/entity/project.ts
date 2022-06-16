import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToMany } from 'typeorm';
import { ProjectAppPrjEquipmentEntity } from './project_equipment';
import { ProjectAppPrjContactsEntity } from './project_contacts';

/**
 * 项目实体
 */
@EntityModel('project_app_prj')
export class ProjectAppEntity extends BaseEntity {
  @Column({ comment: '项目全称' })
  fullName: string;

  @Column({ comment: '建设项目名称' })
  name: string;

  @Column({ comment: '建设单位名称' })
  builderName: string;
  
  @Column({ comment: '承建单位名称' })
  undertookName: string;
  
  @Column({ comment: '监理单位名称', nullable: true })
  supervisionName: string;

  @Column({ comment: '设计单位名称', nullable: true })
  designName: string;

  @Column({ comment: '进度', nullable: true })
  process: string;

  @Column({ comment: '采购人' })
  purchaser: string;

  @Column({ comment: '采购人联系电话' })
  pur_phone: string;

  @Column({ type: 'bigint', comment: '总价' })
  totalPrice: BigInteger;

  @Column({ type: 'timestamp', comment: '计划开工日期' })
  startDate: Date;
  
  @Column({ type: 'timestamp', comment: '计划竣工日期' })
  planDate: Date;

  @Column({ comment: '工期' })
  dateCount: number;

  @Column({ type: 'timestamp', comment: '收款日', nullable: true})
  payDate: Date;

  @OneToMany(() => ProjectAppPrjEquipmentEntity, equipment => equipment.project, { cascade: true })
  equipments: ProjectAppPrjEquipmentEntity[];

  @OneToMany(() => ProjectAppPrjContactsEntity, contacts => contacts.project, { cascade: true })
  contacts: ProjectAppPrjContactsEntity[];

}
