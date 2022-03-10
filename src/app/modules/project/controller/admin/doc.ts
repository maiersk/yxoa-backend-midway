import { join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { Body, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolCommException } from '@cool-midway/core';
import { ProjectAppDocEntity } from '../../entity/doc';
import { ProjectAppService } from '../../service/project';
import { ProjectAppDocService } from '../../service/doc';
import createReport from 'docx-templates';
import { getIpAddres } from '../../../../comm/utils';
import { Context } from 'egg';

/**
 * 文档功能
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocEntity,
})
export class DocController extends BaseController {
  @Inject()
  docService: ProjectAppDocService;
  @Inject()
  projectService: ProjectAppService;

  @Inject()
  ctx: Context;

  @Post('/generate', { summary: '生成文档' })
  async generate(@Query() id: number, @Body() projectId: number, @Body() fields: any) {
    try {
      console.log(id, projectId, fields)
      const { doc, project } = await this.docService.findEntitys({ id, projectId });

      console.log(doc, project);

      let filepath = join(this.ctx.app.baseDir, '..', `public`, new URL(doc.templateFile).pathname)
      let file = await readFileSync(filepath)

      const filebuffer = await createReport({
        template: file,
        data: {
          project,
          ...fields
        },
        cmdDelimiter: ['{', '}']
      })

      const prjFilePath = join(this.ctx.app.baseDir, '..', `public/uploads`);
      const existsPrjs = await existsSync(join(prjFilePath, 'projects')) 
      const existsPrjItem = await existsSync(join(prjFilePath, `projects/${project.name}`))
      if (!existsPrjs) {
        await mkdirSync(join(prjFilePath, 'projects'));
      }
      if (!existsPrjItem) {
        await mkdirSync(join(prjFilePath, `projects/${project.name}`))
      }

      const fileName = `${doc.name}.docx`;
      const writePath = join(prjFilePath, `projects/${project.name}`, fileName);

      await writeFileSync(writePath, filebuffer);

      return this.ok({
        fileName,
        file: `http://${getIpAddres()}:8001/uploads/projects/${project.name}/${fileName}`
      })
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }
}
