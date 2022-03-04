import { ALL, Body, Config, Get, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController, CoolCommException, CoolConfig } from '@cool-midway/core';
import { WxLoginAppService } from '../../service/login';

import axios from 'axios';
import { BaseSysUserService } from '../../../base/service/sys/user';
import { BaseSysRoleService } from '../../../base/service/sys/role';
import { ExtendConfig } from '../../../../comm/types';

/**
 * 微信登录接口
 */
@Provide()
@CoolController()
export class WxLoginAppController extends BaseController {
  @Inject()
  wxloginService: WxLoginAppService;

  @Inject()
  userService: BaseSysUserService;
  
  @Inject()
  roleService: BaseSysRoleService;

  @Config('module.wxlogin')
  wxlogincfg: ExtendConfig;
  
  @Get('/wxlogin', { summary: '微信登录' })
  async wxlogin(@Query() js_code: string) {
    try {
      if (!js_code) throw new CoolCommException('缺少js_code参数')
      const { appid, secret, grant_type } = this.wxlogincfg.wxapi;

      const wxres: any = await axios({
        url: "https://api.weixin.qq.com/sns/jscode2session",
        method: "GET",
        params: {
          js_code,
          appid,
          secret,
          grant_type
        }
      })

      if (wxres.data?.openid ?? false) {
        const user: any = await this.userService.baseSysUserEntity.findOne({ wx_openid: wxres.data.openid })

        // 存在已绑定用户，生成并返回token
        if (user) {
          const res = await this.wxloginService.wxlogin(user)

          return this.ok({
            openid: wxres.data.openid,
            ...res
          })
        }
      }
      
      return this.ok({
        openid: wxres.data.openid
      })
    } catch (err) {
      throw new CoolCommException(err.message)
    }
  }

  @Post('/wxbinduser')
  async wxbindUser(@Body() openid: any, @Body() userId: any) {
    await this.wxloginService.bindUser(openid, userId);
    return this.ok();
  }
}
