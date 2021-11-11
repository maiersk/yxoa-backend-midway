import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column, OneToMany } from 'typeorm';
import { WorkLogAppEntity } from './wlog';
/**
 * 日志模板/分类
 */
@EntityModel('wlog_category')
export class WorkLogCategoryEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '模板', nullable: true })
  template: string;

  @OneToMany((type) => WorkLogAppEntity, (wlog) => wlog.category )
  wlogs: WorkLogAppEntity[];
}
