/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 00:52:08
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';
import { BaseController } from './base';

@provide('home')
@controller('/', { middleware: ['generalMiddleware'] })
export class HomeController extends BaseController {
  @inject()
  ctx: Context;

  @get('/')
  async index(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    let username = 'admin';
    await this.ctx.render('/index.pug', {
      pname,
      username
    });
  }
}
