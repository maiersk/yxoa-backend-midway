import { Application } from 'egg';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块的配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: '工程管理',
    // 模块描述
    description: '工程项目管理模块',
    // 中间件
    middlewares: [],
    order: 0
  } as ModuleConfig;
};
