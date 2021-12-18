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

  @Column({ comment: '格式' })
  format: string;

  @Column({ comment: '数据' })
  data: number;

  @Column({ comment: '文件' })
  templateFile: number;

  @Column({ comment: '数量' })
  count: number;

  @Column({ comment: '留言' })
  remark: string;
}
