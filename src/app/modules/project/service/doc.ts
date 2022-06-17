import { Provide, Config } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like } from 'typeorm';
import { ProjectAppDocEntity } from '../entity/doc';
import { ProjectAppDocCategoryEntity } from '../entity/doc_category';
import { ProjectAppEntity } from '../entity/project';

/**
 * 描述
 */
@Provide()
export class ProjectAppDocService extends BaseService {
  @Config('cool')
  config: CoolConfig;
  
  @InjectEntityModel(ProjectAppDocEntity)
  projectAppDocEntity: Repository<ProjectAppDocEntity>;

  @InjectEntityModel(ProjectAppDocCategoryEntity)
  projectAppDocCategoryEntity: Repository<ProjectAppDocCategoryEntity>;

  @InjectEntityModel(ProjectAppEntity)
  projectAppEntity: Repository<ProjectAppEntity>;

  async page(query: any, option: any, connectionName?: any) {
    try {
      const { size = this.config.page.size, page = 1, name = null, category = null } = query;
      const skip = (page - 1) * size;

      let where = {};
      if (name) where["name"] = Like(`%${name}%`);
      if (category) where["category"] = { id: category };

      const docs = await this.projectAppDocEntity.findAndCount({
        relations: ["category"],
        where,
        skip,
        take: size
      });

      return {
        list: docs[0],
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: docs[1] ? docs[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  async info(id: any, infoIgnoreProperty?: string[]): Promise<any> {
    return await this.projectAppDocEntity.findOne({
      where: { id },
      relations: ["category"]
    })
  }

  /**
   * 移动部门
   * @param category categoryId
   * @param docIds
   */
  async move(category, docIds) {
    await this.projectAppDocEntity
      .createQueryBuilder()
      .update()
      .set({ category })
      .where('id in (:docIds)', { docIds })
      .execute();
  }

  async findEntitys(ids: any) {
    try {
      const doc = await this.projectAppDocEntity.findOne({ id: ids.id });
      const project = await this.projectAppEntity.findOne({ id: ids.projectId });

      if (!doc) { throw new CoolCommException('找不到该id的doc实例') }
      if (!project) { throw new CoolCommException('找不到该id的project实例') }
      if (!doc.templateFile) { throw new CoolCommException('找不到模板文件') }

      return { doc, project };
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }
}
