import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToMany } from 'typeorm';
import { WorkLogAppEntity } from './wlog';
import { BaseSysUserEntity } from '../../base/entity/sys/user';

/**
 * 日志分组
 */
@EntityModel('work_log_category')
export class WorkLogCategoryEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '模板', nullable: true })
  template: string;

  @OneToMany((type) => BaseSysUserEntity, (user) => user.id )
  users: BaseSysUserEntity[];

  @OneToMany((type) => WorkLogAppEntity, (wlog) => wlog.category )
  wlogs: WorkLogAppEntity[];
}
