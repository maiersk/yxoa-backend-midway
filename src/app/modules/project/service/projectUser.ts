import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { In, Repository } from 'typeorm';
import { ProjectAppUserEntity } from '../entity/project_user';
import { BaseSysUserEntity } from '../../base/entity/sys/user';
import * as _ from 'lodash';

/**
 * 描述
 */
@Provide()
export class ProjectAppUserService extends BaseService {
  @InjectEntityModel(ProjectAppUserEntity)
  projectAppUserEntity: Repository<ProjectAppUserEntity>;

  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  /**
   * 添加项目参与用户
   * @param projectId
   * @param userId
   * @param workCtx
   */
   async addUser(projectId: number, userId: number, workCtx: string): Promise<void> {
    const exists = await this.projectAppUserEntity.findOne({
      projectId, userId
    })
    if (!_.isEmpty(exists)) {
      throw new CoolCommException('项目已添加该用户')
    }
    await this.projectAppUserEntity.save({
      projectId,
      userId,
      workCtx
    })
  }

  /**
   * 删除项目参与用户
   * @param userId
   */
  async delUser(projectId: number, userId: number): Promise<void> {
    await this.projectAppUserEntity.delete({
      projectId,
      userId
    })
  }

  /**
   * 根据用户ID获得所有用户项目
   * @param userId
   */
  async getByUser(userId: number): Promise<number[]> {
    const userProject = await this.projectAppUserEntity.find({ userId });
    if (!_.isEmpty(userProject)) {
      return userProject.map(e => {
        return e.projectId
      })
    }
    return [];
  }

  /**
   * 根据项目ID获得所有参与的用户
   * @param userId
   */
  async getUsers(projectId: number): Promise<BaseSysUserEntity[]> {
    const prjusers = await this.projectAppUserEntity.find({ projectId });

    if (!_.isEmpty(prjusers)) {
      const ids = prjusers.map(e => e.userId);
      const users = await this.baseSysUserEntity.find({ where: { id: In(ids) } });
      let workCtxs = [];
      prjusers.forEach(u => workCtxs[u.userId] = u.workCtx)
      return users.map((u) => {
        return { ...u, workCtx: workCtxs[u.id] }
      })
    }
    return [];
  }
}
