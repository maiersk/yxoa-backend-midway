import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 文档
 */
@EntityModel('project_app_doc')
export class ProjectAppDocEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '类型 0：模板文档 1：补充文档', default: 0 })
  type: number;

  @Column({ type: 'text', comment: '数据', nullable: true })
  data: string;

  @Column({ comment: '文件', nullable: true })
  templateFile: string;

  @Column({ comment: '备注', default: '' })
  remark: string;
}
