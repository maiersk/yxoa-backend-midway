import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppService } from '../../service/project';
import { ProjectAppDocService } from '../../service/doc';

/**
 * 文档对外功能 api
 */
@Provide()
@CoolController()
export class DocApiController extends BaseController {
  @Inject()
  docService: ProjectAppDocService;
  @Inject()
  projectService: ProjectAppService;

}
