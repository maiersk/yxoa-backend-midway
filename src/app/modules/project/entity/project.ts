import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 描述
 */
@EntityModel('project_app_prj')
export class ProjectAppEntity extends BaseEntity {
  @Column({ comment: '建设项目名称' })
  name: string;

  @Column({ comment: '建设单位名称' })
  builderName: string;

  @Column({ comment: '监理单位名称' })
  supervisionName: string;

  @Column({ comment: '承建单位名称' })
  undertookName: string;

  @Column({ comment: '进度' })
  process: string;

  @Column({ comment: '采购人' })
  purchaser: string;

  @Column({ comment: '采购人联系电话' })
  pur_phone: string;

  @Column({ comment: '总价' })
  totalPrice: number;

  @Column({ comment: '文档树表名', nullable: true })
  tableName: string;

  @Column({ type: 'timestamp', comment: '目标竣工日' })
  tcDate: Date;

  @Column({ type: 'timestamp', comment: '收款日' })
  payDate: Date;
}
