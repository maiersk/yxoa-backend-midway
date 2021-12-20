import { Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { WorkLogCategoryUserEntity } from '../../entity/category_user';
import { WorkLogCategoryUserService } from '../../service/catuser';

/**
 * 日志分组 用户相关控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogCategoryUserEntity,
})
export class WorkLogCategoryUserController extends BaseController {
  @Inject()
  wlogCategoryUserSerive: WorkLogCategoryUserService

  // @Get()
  // async getCategoryUsers() {
    
  // }

  // @Post()
  // async addCategoryUser() {

  // }

  // @Post()
  // async delCategoryUser() {

  // }
}
