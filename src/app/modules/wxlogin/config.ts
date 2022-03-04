import { Application } from 'egg';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: '微信登录',
    // 模块描述
    description: '添加支持微信登录',
    // 中间件，只对本模块有效
    middlewares: [],
    // 中间件，全局有效
    globalMiddlewares: [],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
    wxapi: {
      appid: 'wxf9665666536ea306',
      secret: '4b38bebae04a0a26b929168f426af84f',
      grant_type: 'authorization_code'
    }
  } as ModuleConfig;
};