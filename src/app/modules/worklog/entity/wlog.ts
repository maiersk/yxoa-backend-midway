import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { WorkLogCategoryEntity } from './category';

/**
 * 日志
 */
@EntityModel('work_log')
export class WorkLogAppEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '内容' })
  context: string;

  @ManyToOne((type) => WorkLogCategoryEntity, (category) => category.wlogs)
  category: WorkLogCategoryEntity;

  @Column({ comment: '发布人' })
  author: string;

  @Column({ comment: '接收人' })
  receive: string;

  @Column({ comment: '阅读数', nullable: true, default: 0 })
  pv: number
}
