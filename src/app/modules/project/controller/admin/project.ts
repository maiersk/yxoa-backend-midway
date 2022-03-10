import { Body, Inject, Post, Get, Query, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEntity } from '../../entity/project'
import { ProjectAppService } from '../../service/project';
import { ProjectAppUserService } from '../../service/project_user';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppEntity,
  service: ProjectAppService
})
export class ProjectController extends BaseController {
  @Inject()
  projectAppService: ProjectAppService;

  @Inject()
  projectAppUserService: ProjectAppUserService;

  @Post('/adduser')
  async addUser(@Body() projectId: number, @Body() userId: number, @Body() workCtx: string) {
    return await this.projectAppUserService.addUser(projectId, userId, workCtx);
  }

  @Post('/deluser')
  async delUser(@Body() projectId: number, @Body() userId: number) {
    return await this.projectAppUserService.delUser(projectId, userId);
  }

  @Get('/getbyuser')
  async getByUser(@Query() userId: number) {
    return await this.projectAppUserService.getByUser(userId);
  }

  @Get('/getusers')
  async getUsers(@Query() projectId: number) {
    return await this.projectAppUserService.getUsers(projectId);
  }
}
