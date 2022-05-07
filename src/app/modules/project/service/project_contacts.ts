import { Config, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppContactEntity } from '../entity/contact';
import { ProjectAppPrjContactsEntity } from '../entity/project_contacts';
import * as _ from 'lodash';

/**
 * 项目关联设备列表
 */
@Provide()
export class ProjectAppPrjContactsService extends BaseService {
  @Config('cool')
  config: CoolConfig;

  @InjectEntityModel(ProjectAppEntity)
  projectEntity: Repository<ProjectAppEntity>;

  @InjectEntityModel(ProjectAppContactEntity)
  contactEntity: Repository<ProjectAppContactEntity>;

  @InjectEntityModel(ProjectAppPrjContactsEntity)
  contactsListEntity: Repository<ProjectAppPrjContactsEntity>;


  async page(query: any, option: any, connectionName?: any): Promise<any> {
    try {
      const { size = this.config.page.size, page = 1, projectId } = query;
      const skip = (page - 1) * size;
      
      const project = await this.projectEntity.findOne({ where: { id: projectId }, relations: ["contacts"] });
      if (!project) throw new CoolCommException('没有该项目');
      
      const contacts = await this.contactsListEntity.findAndCount({
        relations: ["project", "contact"],
        where: projectId ? { project: { id: projectId } } : {},
        skip,
        take: size
      });

      const result = contacts[0].map((item) => {
        const contact: any = item?.contact ?? {};
        if (contact) {
          delete item.contact;
          delete contact.id;
        }

        return {
          ...item,
          ...contact
        }
      })

      return {
        list: result,
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: contacts[1] ? contacts[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  async list(query: any, option: any, connectionName?: any): Promise<any> {
    const { projectId } = query;
    const project = await this.projectEntity.findOne(projectId)
    return await this.contactEntity.findAndCount({
      where: project ? { project } : {},
      relations: ["contact"]
    });
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    return await this.contactEntity.find({ id });
  }

  /**
   * 
   */
  async add(param: any): Promise<Object> {
    try {
      const { projectId, contactId } = param;

      const project = await this.projectEntity.findOne(projectId);
      if (!project) {
        throw new CoolCommException('没有该项目');
      }
      const contact = await this.contactEntity.findOne(contactId);
      if (!contact) {
        throw new CoolCommException('没有该设备');
      };

      const contactsObj: any = await new ProjectAppPrjContactsEntity();
      contactsObj.project = project;
      contactsObj.contact = contact;

      await this.contactsListEntity.save(contactsObj);
      return contactsObj;
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 删除项目设备
   * @param ids
   */
  async delete(ids): Promise<void> {
    return super.delete(ids);
  }
}
