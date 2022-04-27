import { Config, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppEntity } from '../entity/project';
import { ProjectAppEquipmentEntity } from '../entity/equipment';
import { ProjectAppEquipmentListEntity} from '../entity/equipment_list';
import * as _ from 'lodash';

/**
 * 项目关联设备列表
 */
@Provide()
export class ProjectAppEquipmentListService extends BaseService {
  @Config('cool')
  config: CoolConfig;

  @InjectEntityModel(ProjectAppEntity)
  projectEntity: Repository<ProjectAppEntity>;

  @InjectEntityModel(ProjectAppEquipmentEntity)
  equmipmentEntity: Repository<ProjectAppEquipmentEntity>;
  
  @InjectEntityModel(ProjectAppEquipmentListEntity)
  equmipmentListEntity: Repository<ProjectAppEquipmentListEntity>;


  async page(query: any, option: any, connectionName?: any): Promise<any> {
    try {
      const { size = this.config.page.size, page = 1, projectId } = query;

      const equipments = await this.equmipmentListEntity.findAndCount({
        where: projectId ? { projectId } : {},
        relations: ["equipment"]
      });

      const result = equipments[0].map((item) => {
        const equipment = item.equipment;
        delete item.equipment;

        return {
          ...item,
          ...equipment
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
    return await this.equmipmentEntity.findAndCount({
      where: project ? { project } : {},
      relations: ["equipment"]
    });
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    return await this.equmipmentEntity.find({ id });
  }

  /**
   * 
   */
  async add(param: any): Promise<Object> {
    try {
      const { projectId, equipmentId, unit, count, price, totalprice, remark } = param;

      const project = this.projectEntity.findOne({ id: projectId });
      if (!project) {
        throw new CoolCommException('没有该项目');
      }
      const equipment = await this.equmipmentEntity.findOne({
        where: { id: equipmentId }
      });
      if (!equipment) {
        throw new CoolCommException('没有该设备');
      };
      const equipmentObj: any = await new ProjectAppEquipmentListEntity();
      equipmentObj.project = project;
      equipmentObj.equipment = equipment;
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
   * 删除项目参与用户
   * @param userId
   */
  async delete(ids): Promise<void> {
    return super.delete(ids);
  }
}
