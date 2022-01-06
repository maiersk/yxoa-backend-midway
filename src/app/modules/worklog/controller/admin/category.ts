import { Body, Inject, Get, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { WorkLogCategoryEntity } from '../../entity/category'
import { WorkLogCategoryService } from '../../service/category';

/**
 * 日志模板/分类 控制器
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: WorkLogCategoryEntity,
})
export class WorkLogCategoryController extends BaseController {
  @Inject()
  wlogCategoryService : WorkLogCategoryService
  
  @Get('/wlogs')
  async categorywlogs(@Body() id: number) {
    return this.wlogCategoryService.getwlogs(id);
  }
}
