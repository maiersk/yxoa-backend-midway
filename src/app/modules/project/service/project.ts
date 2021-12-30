import * as _ from 'lodash';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppUserEntity } from '../entity/project_user';

/**
 * 描述
 */
@Provide()
export class ProjectAppService extends BaseService {
  @InjectEntityModel(ProjectAppEntity)
  projectAppEntity: Repository<ProjectAppEntity>;

  @InjectEntityModel(ProjectAppUserEntity)
  projectAppUserEntity: Repository<ProjectAppUserEntity>;

  /**
   * 根据用户ID获得所有用户项目
   * @param userId
   */
  async getByUser(userId: number): Promise<number[]> {
    const userProject = await this.projectAppUserEntity.find({ userId });
    if (!_.isEmply(userProject)) {
      return userProject.map(e => {
        return e.projectId
      })
    }
    return [];
  }
}
