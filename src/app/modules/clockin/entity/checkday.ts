import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('clockin_checkday')
export class CheckDayEntity extends BaseEntity {  
  @Column({ comment: '时段' })
  timeround: string;

}
