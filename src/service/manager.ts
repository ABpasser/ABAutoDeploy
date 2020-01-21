import { provide, inject, Context, config } from 'midway';
import * as path from 'path';
import { sqliteTool } from '../app/extends/sqlite';
import { helper } from '../app/extends/helper';

@provide('managerService')
export class ManagerService {
  @inject()
  ctx: Context;

  @config('programConfig')
  programConfig: { rootPath: string };

  async list() {
    var file = path.join(this.programConfig.rootPath + '/data/database.db');
    await sqliteTool.open(file);
    var managerlist = await sqliteTool.all('SELECT * FROM manager', []);
    // console.log('Read:' + managerlist.id + managerlist.username + managerlist.password);
    var results = helper.toJson(managerlist);
    return results;
  }
}
