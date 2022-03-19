import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('project_app_prj_doc')
export class ProjectAppPrjDocEntity extends BaseEntity {
  @Column({ comment: '项目Id' })
  projectId: number;

  @Column({ comment: '文档Id' })
  docId: number;
}
