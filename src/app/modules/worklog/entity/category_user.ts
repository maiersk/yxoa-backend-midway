import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 日志分组用户
 */
@EntityModel('work_log_category_user')
export class WorkLogCategoryUserEntity extends BaseEntity {
  @Column({ comment: '分组Id' })
  categoryId: number;

  @Column({ comment: '用户Id' })
  userId: number;
}
