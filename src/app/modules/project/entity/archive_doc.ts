import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('project_app_prj_archive_doctree')
export class ProjectAppPrjArchiveDocTreeEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '父目录ID', type: 'bigint', nullable: true })
  parentId: number;

  @Column({
    comment: '类型 0：目录 1：文档',
    default: 0,
    type: 'tinyint'
  })
  type: number;

  @Column({ comment: '文档地址', nullable: true })
  file: string;

  @Column({ comment: '备注', default: '' })
  remark: string;

  @Column({ comment: '排序' })
  orderNum: number;

  // 父菜单名称
  parentName: string;
}
