import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('project_app_prj')
export class ProjectAppEntity extends BaseEntity {
  @Column({ comment: '工程名' })
  name: string;
}
