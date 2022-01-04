import * as _ from 'lodash';
import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
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

  async add(param: any): Promise<Object> {
    const project = await this.projectAppEntity.save(param);
    await this.createTreeTable(project)
    return project
  }

  /**
   * 创建项目文档树的数据库表
   * @param project 
   */
  async createTreeTable(project: ProjectAppEntity): Promise<void> {
    await this.nativeQuery(
      'create table project_app_tree_? like project_app_tree;',
      [project.id]
    )
    project.tableName = `project_app_tree_${project.id}`
    await this.projectAppEntity.update(project.id, project)
  }

  /**
   * 重写删除项目，把文档树数据库表也删除
   * @param ids 
   */
  async delete(ids: string | number[]): Promise<void> {
    try {
      await this.projectAppEntity.delete(ids);
      if (ids instanceof Object) {
        ids.map(async (id) => {
          await this.nativeQuery(
            'drop table project_app_tree_?;',
            [id]
          )
        })
      } else {
        await this.nativeQuery(
          'drop table project_app_tree_?;',
          [ids]
        )
      }
    } catch (err) {
      throw new CoolCommException(err)
    }
  }

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
