/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 21:41:42
 * @Description:
 */
import { Context, inject, controller, get, provide, post, del, config } from 'midway';
import { compressFile } from '../../extends/compressFile';

@provide('apiPmanage')
@controller('/api/pmanage', { middleware: ['generalMiddleware'] })
export class ApipmanageController {
  @inject()
  ctx: Context;

  @config('programConfig')
  programConfig;

  @inject('pmanageService')
  pmanageService: {
    list: () => any;
    add: (params: any) => any;
    edit: (params: any) => any;
    batchDelProgram: (params: any) => any;
    delProgram: (params: any) => any;
  };

  @get('/list')
  async list(): Promise<void> {
    var pmanage = await this.pmanageService.list();
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: pmanage
    };
    this.ctx.body = data;
  }

  @post('/add')
  async add(): Promise<void> {
    var params: any = this.ctx.request.body;
    var servers = await this.pmanageService.add(params);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: servers
    };
    this.ctx.body = data;
  }

  @post('/edit')
  async edit(): Promise<void> {
    var params: any = this.ctx.request.body;
    var program = await this.pmanageService.edit(params);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: program
    };
    this.ctx.body = data;
  }

  @del('/del')
  async del(): Promise<void> {
    var id: number = this.ctx.request.body.id;
    var pmanage = await this.pmanageService.delProgram(id);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: pmanage
    };
    this.ctx.body = data;
  }

  @del('/batchDel')
  async batchDel(): Promise<void> {
    var query: any = this.ctx.request.body.data;
    var id = [];
    query.map((item: { id: number }) => id.push(item.id));
    var pmanage = await this.pmanageService.batchDelProgram(id);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: pmanage
    };
    this.ctx.body = data;
  }

  @post('/deploy')
  async deploy(): Promise<void> {
    var query: any = this.ctx.request.body;
    let localFile = query.dir;
    let targetDir = this.programConfig.compressDir;
    await compressFile.compress(targetDir, localFile);
  }
}
