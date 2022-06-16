import { existsSync, mkdirSync, renameSync } from 'fs';
import { join } from 'path';
import { Context } from 'egg';
import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolCommException } from '@cool-midway/core';
import { ProjectAppDocTreeEntity } from '../../entity/doctree';
import { ProjectAppDocTreeService } from '../../service/doctree';
import { ProjectAppDocService } from '../../service/doc';
import { ProjectAppService } from '../../service/project';
import { getProjectDocFileUrl, getProjectWritePath, deleteProjectOldFile } from '../../../../comm/utils';

/**
 * 工程文档树形结构
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppDocTreeEntity,
  service: ProjectAppDocTreeService
})
export class ProjectAppDocTreeController extends BaseController {
  @Inject()
  ctx: Context;
  
  @Inject()
  projectAppDocTreeService: ProjectAppDocTreeService;

  @Inject()
  docService: ProjectAppDocService;

  @Inject()
  projectService: ProjectAppService;

  /**
   * 确认文档状态已完成
   */
  @Post('/success', { summary: '文档完成' })
  async success(@Body() projectId, @Body() node) {
    await this.projectAppDocTreeService.updateSQLFunc(projectId, `status = 'success'`, `id = ${node.id}`);
    return this.ok();
  }

  /**
   * 文档归档，从临时文件中迁移到归档文件夹
   */
  @Post('/save', { summary: '文档归档' })
  async save(@Body() projectId, @Body() node, @Body() fileUrl) {
    try {
      const project = await this.projectService.projectAppEntity.findOne({where: { id : projectId }});
      let oldPath, pathname = new URL(fileUrl).pathname;
      oldPath = join(this.ctx.app.baseDir, '..', `public`, pathname)
  
      const { fileName, writePath } = await getProjectWritePath(project, node.orderName, pathname);
      await renameSync(oldPath, writePath);

      await deleteProjectOldFile(fileUrl);

      await this.projectAppDocTreeService.updateSQLFunc(projectId, `file = '${getProjectDocFileUrl(project, fileName)}', status = 'wait'`, `id = ${node.id}`)

      return this.ok();
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }
  
  /**
   * 模板树复制节点
   */
  @Post('/copy', { summary: '复制' })
  async copy(@Body(ALL) params: any) {
    await this.projectAppDocTreeService.copy(params);
    return this.ok();
  }
  
  /**
   * 部门排序
   */
  @Post('/order', { summary: '排序' })
  async order(@Body(ALL) params: any) {
    await this.projectAppDocTreeService.order(params);
    return this.ok();
  }

  /**
   * 获得所有目录
   */
  @Post('/prjdoclist', { summary: 'prjdoc列表' })
  async prjDocList(@Body() projectId: any) {
    const list = await this.projectAppDocTreeService.prjDocList({ projectId });
    return this.ok([...list]);
  }

  /**
   * 获得节点
   */
  @Post('/prjdocinfo', { summary: 'prjdoc信息' })
  async prjDocInfo(@Body() projectId: any, @Body() id: number) {
    const item = await this.projectAppDocTreeService.prjDocInfo({ projectId, id });

    if (item.docId) {
      const doc = await this.docService.projectAppDocEntity.findOne({ id: item.docId });
      item.templateFile = doc.templateFile;
    }
    return this.ok(item);
  }

  /**
   * 新增
   * @param param
   */
  @Post('/prjdocadd', { summary: 'prjdoc添加' })
  async prjDocAdd(@Body(ALL) params: any) {
    await this.projectAppDocTreeService.prjDocAdd(params);
    return this.ok();
  }
  
  /**
   * 复制
   * @param param
   */
  @Post('/prjdoccopy', { summary: 'prjdoc复制' })
  async prjDocCopy(@Body(ALL) params: any) {
    await this.projectAppDocTreeService.prjDocCopy(params);
    return this.ok();
  }

  /**
   * 更新
   * @param param
   */
  @Post('/prjdocupdate', { summary: 'prjdoc删除' })
  async prjDocUpdate(@Body(ALL) data: any) {
    await this.projectAppDocTreeService.prjDocUpdate(data);
    return this.ok();
  }

  /**
   * 删除
   * @param ids
   */
  @Post('/prjdocdelete', { summary: 'prjdoc删除' })
  async prjDocDelete(@Body(ALL) params: any, @Body() ids: any) {
    await this.projectAppDocTreeService.prjDocDelete(params, ids);
    return this.ok();
  }

  /**
   * 部门排序
   * @param params
   */
  @Post('/prjdocorder', { summary: 'prjdoc排序' })
  async prjDocOrder(@Body() projectId: any, @Body() ids: any) {
    await this.projectAppDocTreeService.prjDocOrder(projectId, ids);
    return this.ok();
  }
}
