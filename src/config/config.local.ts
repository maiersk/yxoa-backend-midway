import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { CoolConfig } from 'midwayjs-cool-core';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'noa_db',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

    // cool-admin特有的配置
    config.cool = {
      // 文件上传
      file: {
        // 文件路径前缀 本地上传模式下 有效
        domain: 'http://127.0.0.1:8001',
      },
    } as CoolConfig;

  return config;
};
