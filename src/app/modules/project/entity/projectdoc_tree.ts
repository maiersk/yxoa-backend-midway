import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('project_app_tree')
export class ProjectAppDocTreeEntity extends BaseEntity {
  @Column({ comment: '项目Id' })
  projectId: number;

  @Column({ comment: '文档Id' })
  docId: number;
}
