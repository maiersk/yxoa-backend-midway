import { ALL, Body, Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { BaseAppSpaceInfoEntity } from '../../../base/entity/app/space/info';
import { BaseAppSpaceInfoService } from '../../service/info';
import { existsSync } from 'fs';

/**
 * 图片空间信息
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BaseAppSpaceInfoEntity,
  service: BaseAppSpaceInfoService,
  pageQueryOp: {
    fieldEq: ['type', 'classifyId'],
  },
})
export class BaseAppSpaceInfoController extends BaseController {
  @Inject()
  baseAppSpaceInfoService: BaseAppSpaceInfoService

  /**
   * 重写删除api
   */
  async delete(@Body() ids: number[] | string) {
    return this.baseAppSpaceInfoService.delete(ids);
  }
}
