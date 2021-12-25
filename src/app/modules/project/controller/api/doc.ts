import { Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocEntity } from '../../entity/doc';

/**
 * 文档对外功能 api
 */
@Provide()
@CoolController({
  api: [],
  entity: ProjectAppDocEntity,
})
export class DocApiController extends BaseController {
  @Post('/generate')
  async generate() {
    try {
      
      return this.ok()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
