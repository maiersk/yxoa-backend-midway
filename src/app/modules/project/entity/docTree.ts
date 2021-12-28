import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 文档树原表
 */
@EntityModel('project_app_tree')
export class ProjectAppDocTreeEntity extends BaseEntity {
  @Column({ comment: '文档Id' })
  docId: number;

  @Column({ comment: '父目录ID'})
  parentId: number

  // @Column({ comment: '' })
}
