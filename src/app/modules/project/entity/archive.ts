import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToMany } from 'typeorm';
import { ProjectAppArchiveDocTreeEntity } from './archive_doc';

/**
 * 描述
 */
@EntityModel('project_app_archive')
export class ProjectAppArchiveEntity extends BaseEntity {
  @Column({ comment: '项目全称' })
  fullName: string;

  @Column({ comment: '建设项目名称' })
  name: string;

  @Column({ comment: '建设单位名称' })
  builderName: string;
  
  @Column({ comment: '承建单位名称' })
  undertookName: string;
  
  @Column({ comment: '监理单位名称', nullable: true })
  supervisionName: string;

  @Column({ comment: '设计单位名称', nullable: true })
  designName: string;

  @Column({ comment: '进度', nullable: true })
  process: string;

  @Column({ comment: '采购人' })
  purchaser: string; 

  @Column({ comment: '采购人联系电话' })
  pur_phone: string;

  @Column({ comment: '总价' })
  totalPrice: number;

  @Column({ type: 'timestamp', comment: '归档日期' })
  archiveDate: Date;

  @OneToMany(() => ProjectAppArchiveDocTreeEntity, archivedocs => archivedocs.archive, { cascade: true })
  archivedocs: ProjectAppArchiveDocTreeEntity[];
}
