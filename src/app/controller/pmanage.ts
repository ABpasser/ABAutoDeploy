/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-23 19:24:11
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('pmanage')
@controller('/pmanage', { middleware: ['generalMiddleware'] })
export class PmanageController {
  @inject()
  ctx: Context;

  @inject('serversService')
  servers: any;

  @inject('pmanageService')
  pmanage: any;

  @get('/')
  async index(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    const serverList = await this.servers.list();
    const pClassList = [
      {
        id: 1,
        title: '网站'
      },
      {
        id: 2,
        title: '微信小程序'
      },
      {
        id: 3,
        title: 'App'
      }
    ];
    await this.ctx.render('/pmanage/index.pug', {
      pname,
      pClassList,
      serverList
    });
  }

  @get('/add')
  async add(): Promise<void> {
    let pname: string = this.ctx.programConfig.name;
    const serverList = await this.servers.list();
    const pclassList = [
      {
        id: 1,
        title: '网站'
      },
      {
        id: 2,
        title: '微信小程序'
      },
      {
        id: 3,
        title: 'App'
      }
    ];

    await this.ctx.render('/pmanage/add.pug', {
      pname,
      pclassList,
      serverList
    });
  }

  @get('/edit')
  async edit(): Promise<void> {
    let query = this.ctx.query;
    let pname: string = this.ctx.programConfig.name;
    let program: any = await this.pmanage.getOne(query.id);
    const serverList = await this.servers.list();
    const pclassList = [
      {
        id: 1,
        title: '网站'
      },
      {
        id: 2,
        title: '微信小程序'
      },
      {
        id: 3,
        title: 'App'
      }
    ];
    await this.ctx.render('/pmanage/edit.pug', {
      pname,
      serverList,
      pclassList,
      program
    });
  }

  @get('/pclass')
  async pclass(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    await this.ctx.render('/pmanage/pclass.pug', {
      pname
    });
  }
}
