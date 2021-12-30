import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 项目参与人
 */
@EntityModel('project_app_users')
export class ProjectAppUserEntity extends BaseEntity {
  @Column({ comment: '项目Id' })
  projectId: number;

  @Column({ comment: '用户Id' })
  userId: number;
}
