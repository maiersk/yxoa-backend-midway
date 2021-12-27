import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Body, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocEntity } from '../../entity/doc';
import { ProjectAppService } from '../../service/project';
import { ProjectAppDocService } from '../../service/doc';

/**
 * 文档对外功能 api
 */
@Provide()
@CoolController({
  api: [],
  entity: ProjectAppDocEntity,
})
export class DocApiController extends BaseController {
  @Inject()
  docService: ProjectAppDocService;
  @Inject()
  projectService: ProjectAppService;

  @Post('/generate', { summary: '生成文档' })
  async generate(@Query() id: number, @Body() fields: any) {
    try {
      const doc = await this.docService.find(id)

      if (!doc) { this.ok({ message: '找不到该id实例' }) }
      if (!doc.templateFile) { this.ok({ message: '找不到模板文件' }) }
      let filepath, file
      filepath = resolve(__dirname, '../files/temp', doc.templateFile)
      file = await readFileSync(filepath)

      return this.ok()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
