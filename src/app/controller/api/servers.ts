/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 14:21:11
 * @Description:
 */
import { Context, inject, controller, get, provide, post, del } from 'midway';

@provide('apiServers')
@controller('/api/servers', { middleware: ['generalMiddleware'] })
export class ApiServersController {
  @inject()
  ctx: Context;

  @inject('serversService')
  serversService: {
    list: () => any;
    addServer: (params: any) => any;
    editServer: (params: any) => any;
    delServer: (id: number) => any;
    batchDelServer: (id: any) => any;
  };

  @get('/list')
  async list(): Promise<void> {
    var servers = await this.serversService.list();
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: servers
    };
    this.ctx.body = data;
  }

  @post('/add')
  async add(): Promise<void> {
    var params: any = this.ctx.request.body;
    var servers = await this.serversService.addServer(params);
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
    var servers = await this.serversService.editServer(params);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: servers
    };
    this.ctx.body = data;
  }

  @del('/del')
  async del(): Promise<void> {
    var id: number = this.ctx.request.body.id;
    var servers = await this.serversService.delServer(id);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: servers
    };
    this.ctx.body = data;
  }

  @del('/batchDel')
  async batchDel(): Promise<void> {
    var query: any = this.ctx.request.body.data;
    var id = [];
    query.map((item: { id: number }) => id.push(item.id));
    var servers = await this.serversService.batchDelServer(id);
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: servers
    };
    this.ctx.body = data;
  }
}
