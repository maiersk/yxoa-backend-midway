import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseSysUserEntity } from '../../base/entity/sys/user';

/**
 * 项目参与人
 */
@EntityModel('project_app_users')
export class ProjectAppUserEntity extends BaseEntity {
  @Column({ comment: '项目Id' })
  projectId: number;

  @ManyToOne(() => BaseSysUserEntity)
  user: BaseSysUserEntity;

  @Column({ comment: '项目工作内容' })
  workCtx: string
}
