/*
 * @Author: ABpasser
 * @Date: 2020-01-23 11:28:44
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 20:01:40
 * @Description:
 */
import { provide, inject, Context, config } from 'midway';
import * as path from 'path';
import { sqliteTool } from '../app/extends/sqlite';
import { helper } from '../app/extends/helper';

@provide('serversService')
export class ServersService {
  @inject()
  ctx: Context;

  @config('programConfig')
  programConfig: { rootPath: string };

  private async openDatabase() {
    var file = path.join(this.programConfig.rootPath + '/data/database.db');
    await sqliteTool.open(file);
  }

  async list() {
    this.openDatabase();
    var serverlist = await sqliteTool.all('SELECT * FROM servers', []);
    var results = helper.toJson(serverlist);
    return results;
  }

  async getOne(id: number) {
    this.openDatabase();
    let sqlquery: string = 'SELECT * FROM servers WHERE id = ' + id;
    const result = await sqliteTool.all(sqlquery, []);
    return result[0];
  }

  async addServer(params: any) {
    this.openDatabase();
    let sqlquery: string =
      "INSERT INTO servers (ip,name,port,username,password) VALUES ('" + params.ip + "','" + params.name + "'," + params.port + ",'" + params.username + "','" + params.password + "')";
    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async editServer(params: any) {
    this.openDatabase();
    // TODO: 中文输入不行
    // var name = encodeURI(params.name); 转码后%符号不行
    let sqlquery: string =
      "UPDATE servers SET ip='" + params.ip + "',name='" + params.name + "',port=" + params.port + ",username='" + params.username + "',password='" + params.password + "' WHERE id = " + params.id;
    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async delServer(id: number) {
    this.openDatabase();
    let sqlquery: string = 'DELETE FROM servers WHERE id = ' + id;
    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async batchDelServer(params: any) {
    this.openDatabase();
    let ids: string = '0';
    params.map((id: number) => {
      ids = ids + ',' + id;
    });
    let sqlquery: string = 'DELETE FROM servers WHERE id IN (' + ids + ')';
    console.log(sqlquery);

    const result = await sqliteTool.run(sqlquery);
    return result;
  }
}
