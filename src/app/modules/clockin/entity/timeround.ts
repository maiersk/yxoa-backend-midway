import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('clockin_timeround')
export class XxxEntity extends BaseEntity {
  @Column({ comment: '打卡次数' })
  cincount: number;

  @Column({ comment: '打卡时间' })
  cintime: Date;
}
