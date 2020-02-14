/*
 * @Author: ABpasser
 * @Date: 2020-01-23 11:28:44
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 20:40:09
 * @Description:
 */
import { provide, inject, Context, config } from 'midway';
import * as path from 'path';
import { sqliteTool } from '../app/extends/sqlite';
import { helper } from '../app/extends/helper';

@provide('pmanageService')
export class PmanageService {
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
    var serverlist = await sqliteTool.all('SELECT * FROM pmanage', []);
    var results = helper.toJson(serverlist);
    return results;
  }

  async getOne(id: number) {
    this.openDatabase();
    let sqlquery: string = 'SELECT * FROM pmanage WHERE id = ' + id;
    const result = await sqliteTool.all(sqlquery, []);
    return result[0];
  }

  async add(params: any) {
    this.openDatabase();
    const server = await sqliteTool.all('SELECT ip FROM servers WHERE id =' + params.serverId, []);

    // TODO: 中文输入不行
    let sqlquery: string =
      "INSERT INTO pmanage (name,pname,description,dir,targetDir,server,serverId,pclassId) VALUES ('" +
      params.name +
      "','" +
      params.name +
      "','" +
      params.description +
      "','" +
      params.dir +
      "','" +
      params.targetDir +
      "','" +
      server[0].ip +
      "'," +
      params.serverId +
      ',' +
      params.pclassId +
      ')';

    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async edit(params: any) {
    this.openDatabase();

    const server = await sqliteTool.all('SELECT ip FROM servers WHERE id =' + params.serverId, []);

    // TODO: 中文输入不行
    // var name = encodeURI(params.name); 转码后%符号不行
    let sqlquery: string =
      'UPDATE pmanage SET pclassId=' +
      params.pclassId +
      ',serverId=' +
      params.serverId +
      ",server='" +
      server[0].ip +
      "',name='" +
      params.name +
      "',pname='" +
      params.name +
      "',description='" +
      params.description +
      "',dir='" +
      params.dir +
      "',targetDir='" +
      params.targetDir +
      "' WHERE id = " +
      params.id;

    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async delProgram(id: number) {
    this.openDatabase();
    let sqlquery: string = 'DELETE FROM pmanage WHERE id = ' + id;
    const result = await sqliteTool.run(sqlquery);
    return result;
  }

  async batchDelServer(params: any) {
    this.openDatabase();
    let ids: string = '0';
    params.map((id: number) => {
      ids = ids + ',' + id;
    });
    let sqlquery: string = 'DELETE FROM pmanage WHERE id IN (' + ids + ')';

    const result = await sqliteTool.run(sqlquery);
    return result;
  }
}
