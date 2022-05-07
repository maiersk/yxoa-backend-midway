import * as _ from 'lodash';
import { Provide, Config } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, In } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppContactEntity } from '../entity/contact';

/**
 * 描述
 */
@Provide()
export class ProjectAppService extends BaseService {
  @Config('cool')
  config: CoolConfig;

  @InjectEntityModel(ProjectAppEntity)
  projectAppEntity: Repository<ProjectAppEntity>;

  @InjectEntityModel(ProjectAppContactEntity)
  contactAppEntity: Repository<ProjectAppContactEntity>;

  async page(query: any, option: any, connectionName?: any) {
    try {
      const { size = this.config.page.size, page = 1 } = query;
      const skip = (page - 1) * size;

      const projects = await this.projectAppEntity.findAndCount({
        relations: ["equipments", "contacts"],
        skip,
        take: size
      });

      return {
        list: projects[0],
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: projects[1] ? projects[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    const project = await this.projectAppEntity.findOne({
      where: { id },
      relations: ["equipments", "contacts"]
    });

    let result: any = {};
    const contacts: any = project?.contacts;
    const ids = contacts.map((contact) => contact.id);
    delete project.contacts;

    let res: any = {};
    res.contacts = await this.contactAppEntity.find({
      where: { id: In(ids) }
    })

    result = {
      ...res,
      ...project
    }

    return result;
  }

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
}
