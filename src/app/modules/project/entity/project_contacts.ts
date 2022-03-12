import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 项目关联联系方式中间表
 */
@EntityModel('project_app_prj_contacts')
export class ProjectAppPrjContactsEntity extends BaseEntity {
  @Column({ comment: '项目Id' })
  projectId: number;

  @Column({ comment: '联系Id' })
  contactsId: number;
}
