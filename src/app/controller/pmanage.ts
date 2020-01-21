/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 15:14:51
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('pmanage')
@controller('/pmanage', { middleware: ['generalMiddleware'] })
export class PmanageController {
  @inject()
  ctx: Context;

  @get('/')
  async index(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
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
      pClassList
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
