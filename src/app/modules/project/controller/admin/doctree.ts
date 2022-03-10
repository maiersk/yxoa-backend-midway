import { ALL, Body, Get, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProjectAppDocTreeEntity } from '../../entity/doctree';
import { ProjectAppDocTreeService } from '../../service/doctree';

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
  projectAppDocTreeService: ProjectAppDocTreeService;

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
  @Post('/prjdoclist', { summary: 'prjdoc排序'})
  async prjDocList(@Body() tableName: any) {
    const list = await this.projectAppDocTreeService.prjDocList({ tableName });
    return this.ok([...list]);
  }

  /**
   * 新增
   * @param param
   */
  @Post('/prjdocadd', { summary: 'prjdoc添加'})
  async prjDocAdd(@Body(ALL) params: any) {
    await this.projectAppDocTreeService.prjDocAdd(params);
    return this.ok();
  }

  /**
   * 更新
   * @param param
   */
  @Post('/prjdocupdate', { summary: 'prjdoc删除'})
  async prjDocUpdate(@Body(ALL) data: any) {
    await this.projectAppDocTreeService.prjDocUpdate(data);
    return this.ok();
  }

  /**
   * 删除
   * @param ids
   */
  @Post('/prjdocdelete', { summary: 'prjdoc删除'})
  async prjDocDelete(@Body(ALL) params: any, @Body() ids: any) {
    await this.projectAppDocTreeService.prjDocDelete(params, ids);
    return this.ok();
  }

  /**
   * 部门排序
   * @param params
   */
  @Post('/prjdocorder', { summary: 'prjdoc排序'})
  async prjDocOrder(@Body() tableName: any, @Body() ids: any) {
    await this.projectAppDocTreeService.prjDocOrder(tableName, ids);
    return this.ok();
  }
}
