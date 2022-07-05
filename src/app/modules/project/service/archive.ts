import { Like, Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { Config, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig } from '@cool-midway/core';
import { ProjectAppArchiveEntity } from '../entity/archive';

/**
 * 描述
 */
@Provide()
export class ProjectAppArchiveService extends BaseService {
  @Config('cool')
  config: CoolConfig
  
  @InjectEntityModel(ProjectAppArchiveEntity)
  archiveEntity: Repository<ProjectAppArchiveEntity>;

  async page(query: any, option: any, connectionName?: any) {
    try {
      const { size = this.config.page.size, page = 1,
        name = null, builderName = null,
        undertookName = null, supervisionName = null, year = null, month = null,
      } = query;
      const skip = (page - 1) * size;

      let where = {};
      if (name) where["name"] = Like(`%${name}%`);
      if (builderName) where["builderName"] = Like(`%${builderName}%`);
      if (undertookName) where["undertookName"] = Like(`%${undertookName}%`);
      if (supervisionName) where["supervisionName"] = Like(`%${supervisionName}%`);
      if (year) where["archiveDate"] = Like(`${year}%`);
      if (month) where["archiveDate"] = Like(`%-${month}-%`);

      const archive = await this.archiveEntity.findAndCount({
        relations: ["archivedocs"],
        where,
        skip,
        take: size
      });

      return {
        list: archive[0],
        pagination: {
          page: parseInt(page),
          size: parseInt(size),
          total: archive[1] ? archive[1] : 0,
        }
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

}
