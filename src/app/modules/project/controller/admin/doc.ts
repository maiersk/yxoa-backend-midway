import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { Body, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolCommException } from '@cool-midway/core';
import { ProjectAppDocEntity } from '../../entity/doc';
import { ProjectAppService } from '../../service/project';
import { ProjectAppDocService } from '../../service/doc';
import createReport from 'docx-templates';
import { getProjectDocFileUrl, getProjectWritePath, deleteProjectOldFile } from '../../../../comm/utils';
import { Context } from 'egg';
import { ProjectAppDocTreeService } from '../../service/doctree';

/**
 * 文档功能
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocEntity,
  service: ProjectAppDocService,
})
export class DocController extends BaseController {
  @Inject()
  docService: ProjectAppDocService;
  @Inject()
  projectService: ProjectAppService;

  @Inject()
  docTreeService: ProjectAppDocTreeService;

  @Inject()
  ctx: Context;

  @Post('/generate', { summary: '生成文档' })
  async generate(@Query() id: number, @Body() projectId: number, @Body() fields: any, @Body() node: any) {
    try {
      const { doc, project } = await this.docService.findEntitys({ id, projectId });

      const filePathTemplate = (item) => {
        return join(this.ctx.app.baseDir, '..', `public`, new URL(item).pathname);
      }
      let filepath = filePathTemplate(doc.templateFile);
      let file = await readFileSync(filepath);

      // 图片字段，字段使用_img才匹配
      const images = {};
      await Object.keys(fields).map((key) => {
        if (key.includes("_img")) {
          let keyfunc = key.replace('_img', '');
          keyfunc = keyfunc.replace(keyfunc.charAt(0), keyfunc.charAt(0).toUpperCase());

          const file = readFileSync(filePathTemplate(fields[key]));
          images[`get${keyfunc}`] = (w: number, h: number) => {
            return {
              width: w,
              height: h,
              data: file,
              extension: '.png'
            }
          }
        };
      });

      const filebuffer = await createReport({
        template: file,
        data: {
          project,
          ...fields
        },
        additionalJsContext: {
          getTxt() {
            return `ss_str`
          },
          ...images
        },
        cmdDelimiter: ['{', '}']
      });

      const name = node ? node.orderName : doc.name;
      const { fileName, writePath } = await getProjectWritePath(project, name, filepath);
      const resUrl = getProjectDocFileUrl(project, fileName);

      await writeFileSync(writePath, filebuffer);

      if (node) {
        await this.docTreeService.updateSQLFunc(projectId, `file = '${resUrl}', status = 'wait'`, `id = ${node.id}`);

        if (node.file) {
          await deleteProjectOldFile(node.file);
        }
      }

      return this.ok({
        fileName,
        file: resUrl
      });
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }

  /**
   * 移动分类
  */
  @Post('/move', { summary: '移动分类' })
  async move(@Body() category, @Body() docIds) {
    return await this.docService.move(category, docIds)
  }
}
