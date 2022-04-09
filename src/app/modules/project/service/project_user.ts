import { Config, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppUserEntity } from '../entity/project_user';
import { BaseSysUserEntity } from '../../base/entity/sys/user';
import { BaseSysDepartmentEntity } from '../../base/entity/sys/department';
import * as _ from 'lodash';

/**
 * 描述
 */
@Provide()
export class ProjectAppUserService extends BaseService {
  @Config('cool')
  config: CoolConfig;

  @InjectEntityModel(ProjectAppUserEntity)
  projectAppUserEntity: Repository<ProjectAppUserEntity>;

  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  @InjectEntityModel(BaseSysDepartmentEntity)
  baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;

  async page(query: any, option: any, connectionName?: any): Promise<any> {
    try {
      const { size = this.config.page.size, page = 1, projectId } = query;
      const users = await this.projectAppUserEntity.findAndCount({
        where: projectId ? { projectId } : {},
        relations: ["user"]
      });
      
      const result = users[0].map((item) => {
        const user = item.user;
        delete item.user;
        delete user.password;

        return {
          ...item,
          ...user
        }
      })

      return {
        list: result,
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: users[1] ? users[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  async list(query: any, option: any, connectionName?: any): Promise<any> {
    const { projectId } = query;
    return await this.projectAppUserEntity.findAndCount({
      where: projectId ? { projectId } : {},
      relations: ["user"]
    });
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    return await this.projectAppUserEntity.find({ id });
  }

  /**
   * 添加项目参与用户
   * @param projectId
   * @param userId
   * @param workCtx
   */
  async add(param: any): Promise<Object> {
    try {
      const { projectId, userId, workCtx } = param;

      const user = await this.baseSysUserEntity.findOne({ id: userId });
      if (!user) {
        throw new CoolCommException('没有该用户');
      }
      const exists = await this.projectAppUserEntity.findOne({
        projectId, user
      });
      if (!_.isEmpty(exists)) {
        throw new CoolCommException('项目已添加该用户');
      };
      return await this.projectAppUserEntity.save({
        projectId,
        user,
        workCtx
      });
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 删除项目参与用户
   * @param userId
   */
  async delete(ids): Promise<void> {
    return super.delete(ids);
  }
}
