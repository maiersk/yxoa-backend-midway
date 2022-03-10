import { Inject, Provide } from '@midwayjs/decorator';
import * as ipdb from 'ipip-ipdb';
import * as _ from 'lodash';
import { Context } from 'egg';

import { networkInterfaces } from 'os'

/**
 * 帮助类
 */
@Provide()
export class Utils {
  @Inject()
  baseDir;

  /**
   * 获得请求IP
   */
  async getReqIP(ctx: Context) {
    const req = ctx.req;
    return (
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress.replace('::ffff:', '')
    );
  }

  /**
   * 根据IP获得请求地址
   * @param ip 为空时则为当前请求的IP地址
   */
  async getIpAddr(ctx: Context, ip?: string | string[]) {
    try {
      if (!ip) {
        ip = await this.getReqIP(ctx);
      }
      const bst = new ipdb.BaseStation(
        `${this.baseDir}/app/comm/ipipfree.ipdb`
      );
      const result = bst.findInfo(ip, 'CN');
      const addArr: any = [];
      if (result) {
        addArr.push(result.countryName);
        addArr.push(result.regionName);
        addArr.push(result.cityName);
        return _.uniq(addArr).join('');
      }
    } catch (err) {
      return '无法获取地址信息';
    }
  }

  /**
   * 去除对象的空值属性
   * @param obj
   */
  async removeEmptyP(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
        delete obj[key];
      }
    });
  }

  /**
   * 线程阻塞毫秒数
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export function getIpAddres() {
  const interfaces = networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}