import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ProjectAppDocEntity } from '../entity/doc';
import { ProjectAppEntity } from '../entity/project';

/**
 * 描述
 */
@Provide()
export class ProjectAppDocService extends BaseService {
  @InjectEntityModel(ProjectAppDocEntity)
  projectAppDocEntity: Repository<ProjectAppDocEntity>;

  @InjectEntityModel(ProjectAppEntity)
  projectAppEntity: Repository<ProjectAppEntity>;

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
