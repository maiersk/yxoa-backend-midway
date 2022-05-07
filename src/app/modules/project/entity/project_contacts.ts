import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { ManyToOne } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppContactEntity } from './contact';


/**
 * 项目关联联系方式中间表
 */
@EntityModel('project_app_prj_contacts')
export class ProjectAppPrjContactsEntity extends BaseEntity {
  @ManyToOne((type) => ProjectAppEntity, project => project.contacts, { onDelete: "CASCADE" })
  project: ProjectAppEntity;

  @ManyToOne(() => ProjectAppContactEntity, contact => contact.contacts, { onDelete: "CASCADE" })
  contact: ProjectAppContactEntity;
}
