import { Config, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Like, Repository } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppPrjEquipmentEntity } from '../entity/project_equipment';
import * as _ from 'lodash';

/**
 * 项目关联设备列表
 */
@Provide()
export class ProjectAppPrjEquipmentService extends BaseService {
  @Config('cool')
  config: CoolConfig;

  @InjectEntityModel(ProjectAppEntity)
  projectEntity: Repository<ProjectAppEntity>;

  @InjectEntityModel(ProjectAppPrjEquipmentEntity)
  equmipmentListEntity: Repository<ProjectAppPrjEquipmentEntity>;

  async page(query: any, option: any, connectionName?: any): Promise<any> {
    try {
      const { size = this.config.page.size, page = 1, projectId, name = null} = query;
      const skip = (page - 1) * size;

      const project = await this.projectEntity.findOne({ where: { id: projectId } });
      if (!project) throw new CoolCommException('没有该项目');

      let where = projectId ? { project: { id: projectId } } : {};
      if (name) where["name"] = Like(`%${name}%`);

      const equipments = await this.equmipmentListEntity.findAndCount({
        relations: ["project"],
        where,
        skip,
        take: size
      });

      const result = equipments[0].map((item) => {
        return {
          ...item
        }
      })

      return {
        list: result,
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: equipments[1] ? equipments[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  async list(query: any, option: any, connectionName?: any): Promise<any> {
    const { projectId } = query;
    const project = await this.projectEntity.findOne(projectId)
    return await this.equmipmentListEntity.findAndCount({
      where: project ? { project } : {}
    });
  }

  /**
   * 
   */
  async add(param: any): Promise<Object> {
    try {
      const { projectId, name, brand, model, norm,
        manufacturer, country, unit, count, price,
        totalprice, remark } = param;

      const project = await this.projectEntity.findOne(projectId);
      if (!project) {
        throw new CoolCommException('没有该项目');
      }

      const equipmentObj: any = await new ProjectAppPrjEquipmentEntity();
      equipmentObj.project = project;
      equipmentObj.name = name;
      equipmentObj.brand = brand;
      equipmentObj.model = model;
      equipmentObj.norm = norm;
      equipmentObj.manufacturer = manufacturer;
      equipmentObj.country = country;
      equipmentObj.unit = unit;
      equipmentObj.count = count;
      equipmentObj.price = price;
      equipmentObj.totalprice = totalprice;
      equipmentObj.remark = remark;

      await this.equmipmentListEntity.save(equipmentObj);
      return equipmentObj;
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 删除项目设备
   * @param userId
   */
  async delete(ids): Promise<void> {
    return super.delete(ids);
  }
}
