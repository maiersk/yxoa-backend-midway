import { Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppEntity } from '../../entity/project'
import { ProjectAppService } from '../../service/project';
import { ProjectAppUserService } from '../../service/projectuser';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: [],
  entity: ProjectAppEntity,
  service: ProjectAppService
})
export class ProjectApiController extends BaseController {
  @Inject()
  projectAppService: ProjectAppService;

  @Inject()
  projectAppUserService: ProjectAppUserService;

  @Get('/getbyuser')
  async getByUser(@Query() userId: number) {
    return await this.projectAppUserService.getByUser(userId);
  }

  @Get('/getusers')
  async getUsers(@Query() projectId: number) {
    return await this.projectAppUserService.getUsers(projectId);
  }
}
