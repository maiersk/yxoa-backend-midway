import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { BaseAppSpaceInfoEntity } from '../entity/info';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Context } from 'egg';

/**
 * 描述
 */
@Provide()
export class BaseAppSpaceInfoService extends BaseService {
  @InjectEntityModel(BaseAppSpaceInfoEntity)
  baseAppSpaceInfoEntity: Repository<BaseAppSpaceInfoEntity>;

  @Inject()
  ctx: Context;

  /**
   * 重写添加
   * 
   * @returns 
   */
  async add(param: any): Promise<Object> {
    try {
      return await this.baseAppSpaceInfoEntity.save(param);
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 重写删除
   */
  async delete(ids: number[] | string): Promise<void> {
    const infos = await this.baseAppSpaceInfoEntity.findByIds([...ids]);
    infos.map(async (info) => {
      const file_path = join(this.ctx.app.baseDir, '..', `public`, new URL(info.url).pathname);
      const exist = existsSync(file_path);
      if (exist) {
        unlinkSync(file_path);
      }
    });
    return await super.delete(ids);
  }
}
