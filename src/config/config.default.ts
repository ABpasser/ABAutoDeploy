/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 23:10:25
 * @Description:
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';
import * as fs from 'fs';
import * as path from 'path';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = <DefaultConfig>{};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1579581699881_9020';

  // add your config here
  config.middleware = [];

  // add commone config
  config.programConfig = {
    name: 'ABAutoDeploy',
    rootPath: appInfo.baseDir
  };

  // set favicon
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.root, '/favicon.ico'))
  };

  // set viewEngine
  config.view = {
    mapping: {
      '.pug': 'pug'
    }
  };

  // session
  config.session = {
    key: 'autodeploy',
    maxAge: 2 * 3600 * 1000, //two hours
    httpOnly: true,
    renew: true,
    encrypt: true
  };

  return config;
};
