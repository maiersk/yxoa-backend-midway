import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToMany } from 'typeorm';
import { ProjectAppDocEntity } from '../entity/doc';

/**
 * 文档分类
 */
@EntityModel('project_app_doc_category')
export class ProjectAppDocCategoryEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @OneToMany(() => ProjectAppDocEntity, doc => doc.category, { cascade: true })
  docs: ProjectAppDocEntity;
}
