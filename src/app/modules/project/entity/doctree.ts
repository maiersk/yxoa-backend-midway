import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 文档树原表
 */
@EntityModel('project_app_tree')
export class ProjectAppDocTreeEntity extends BaseEntity {
  @Column({ comment: '父目录ID', type: 'bigint', nullable: true })
  parentId: number;

  @Column({ comment: '名称' })
  name: string;

  @Column({
    comment: '类型 0：目录 1：文档',
    default: 0,
    type: 'tinyint'
  })
  type: number;

  @Column({ comment: '文档Id', nullable: true })
  docId: number;

  @Column({ type: 'text', comment: '数据', nullable: true })
  data: string;

  @Column({ comment: '最终文件', nullable: true })
  file: string;

  @Column({ comment: '备注', default: '' })
  remark: string;

  @Column({ comment: '排序' })
  orderNum: number;

  // 父菜单名称
  parentName: string;

}
