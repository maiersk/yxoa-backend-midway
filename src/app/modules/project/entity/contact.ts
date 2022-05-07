import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToMany } from 'typeorm';
import { ProjectAppPrjContactsEntity } from '../entity/project_contacts';

/**
 * 项目各方联系方式
 */
@EntityModel('project_app_contact')
export class ProjectAppContactEntity extends BaseEntity {
  @Column({ comment: '描述' })
  name: string;

  @Column({ comment: '代表设备/项目性质' })
  device: string;

  @Column({ comment: '生产商' })
  manufacturer: string;

  @Column({ comment: '职位' })
  jobs: string;

  @Column({ comment: '联系人' })
  person: string;

  @Column({ comment: '联系电话' })
  phone: string;

  @OneToMany(() => ProjectAppPrjContactsEntity, contacts => contacts.contact, { cascade: true })
  contacts: ProjectAppPrjContactsEntity[];

}
