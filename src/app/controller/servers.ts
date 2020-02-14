/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 14:53:56
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('servers')
@controller('/servers', { middleware: ['generalMiddleware'] })
export class ServersController {
  @inject()
  ctx: Context;

  @inject('serversService')
  servers: any;

  @get('/')
  async index(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    const roleList = [
      {
        id: 1,
        title: '开发人员'
      },
      {
        id: 2,
        title: '管理人员'
      }
    ];
    await this.ctx.render('/servers/index.pug', {
      pname,
      roleList
    });
  }

  @get('/add')
  async add(): Promise<void> {
    let pname: string = this.ctx.programConfig.name;
    await this.ctx.render('/servers/add.pug', {
      pname
    });
  }

  @get('/edit')
  async edit(): Promise<void> {
    let query = this.ctx.query;
    let pname: string = this.ctx.programConfig.name;
    let server: any = await this.servers.getOne(query.id);
    await this.ctx.render('/servers/edit.pug', {
      pname,
      server
    });
  }
}
