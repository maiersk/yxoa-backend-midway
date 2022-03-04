import { Config, Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException, CoolConfig, ICoolCache } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../../base/entity/sys/user';
import { BaseSysMenuService } from '../../base/service/sys/menu';
import { BaseSysDepartmentService } from '../../base/service/sys/department';
import { BaseSysRoleService } from '../../base/service/sys/role';
import { BaseSysLoginService } from '../../base/service/sys/login';
import { BaseSysUserService } from '../../base/service/sys/user';
import * as _ from 'lodash';

/**
 * 用户微信登录
 */
@Provide()
export class WxLoginAppService extends BaseService {
  @Inject('cool:cache')
  coolCache: ICoolCache;

  @InjectEntityModel(BaseSysUserEntity)
  userEntity: Repository<BaseSysUserEntity>;
  
  @Inject()
  roleService: BaseSysRoleService;

  @Inject()
  loginService: BaseSysLoginService;

  @Inject()
  userService: BaseSysUserService;

  @Inject()
  baseSysMenuService: BaseSysMenuService;


  @Inject()
  baseSysDepartmentService: BaseSysDepartmentService;

  @Config('module.base')
  coolConfig: CoolConfig;

  /**
   * 微信登录绑定账号
   */
  async wxlogin(user: any) {
    try {
      const { expire, refreshExpire } = this.coolConfig.jwt.token;

      // 校验角色
      const roleIds = await this.roleService.getByUser(user.id);
      if (_.isEmpty(roleIds)) {
        throw new CoolCommException('该用户未设置任何角色，无法登录~');
      }

      const result = {
        expire,
        token: await this.loginService.generateToken(user, roleIds, expire),
        refreshExpire,
        refreshToken: await this.loginService.generateToken(
          user,
          roleIds,
          refreshExpire,
          true
        )
      }
      
      // 将用户相关信息保存到缓存
      const perms = await this.baseSysMenuService.getPerms(roleIds);
      const departments = await this.baseSysDepartmentService.getByRoleIds(
        roleIds,
        user.username === 'admin'
      );
      await this.coolCache.set(
        `admin:department:${user.id}`,
        JSON.stringify(departments)
      );
      await this.coolCache.set(`admin:perms:${user.id}`, JSON.stringify(perms));
      await this.coolCache.set(`admin:token:${user.id}`, result.token);
      await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);
  
      return result;
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }

  /**
   * 微信登录绑定账号
   */
  async bindUser(openid, userId) {
    try {
      const user = await this.userService.baseSysUserEntity.findOne({ id: userId });
      if (user) {
        await this.userService.baseSysUserEntity.update(user.id, { wx_openid: openid })
      }
    } catch (err) {
      throw new CoolCommException(err.message);
    }
  }
}
