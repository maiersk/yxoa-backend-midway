import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppArchiveDocTreeEntity } from '../../entity/archive_doc';
import { ProjectAppArchiveDocService } from '../../service/archive_doc';

/**
 * 历年项目存档-文件操作
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProjectAppArchiveDocTreeEntity,
  service: ProjectAppArchiveDocService
})
export class ProjectAppArchiveDocController extends BaseController {
  @Inject()
  archiveDocService: ProjectAppArchiveDocService;

  @Post('/list', { summary: '列表' })
  async list(@Body() archiveId: any) {
    return this.archiveDocService.list({ archiveId });
  }

  /**
   * 模板树复制节点
   */
  @Post('/copy', { summary: '复制' })
  async copy(@Body(ALL) params: any) {
    await this.archiveDocService.copy(params);
    return this.ok();
  }

  /**
   * 排序
   */
  @Post('/order', { summary: '排序' })
  async order(@Body(ALL) params: any) {
    await this.archiveDocService.order(params);
    return this.ok();
  }
}
