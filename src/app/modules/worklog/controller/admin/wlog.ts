import { Inject, Post, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CoolController, BaseController } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { WorkLogCategoryEntity } from '../../entity/category';
import { WorkLogAppEntity } from '../../entity/wlog';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { WorkLogService } from '../../service/wlog';

/**
 * 日志贴文 控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogAppEntity,
  service: WorkLogService
})
export class WorkLogAdminController extends BaseController {
  @InjectEntityModel(WorkLogAppEntity)
  wlogEntity: Repository<WorkLogAppEntity>;
  @InjectEntityModel(WorkLogCategoryEntity)
  wlogCategory: Repository<WorkLogCategoryEntity>;
  @InjectEntityModel(BaseSysUserEntity)
  baseUser: Repository<BaseSysUserEntity>;

  @Inject()
  wlogService: WorkLogService;

  async daySummay(params: any) {

  }
}
