/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 15:19:09
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('manager')
@controller('/manager', { middleware: ['generalMiddleware'] })
export class ManagerController {
  @inject()
  ctx: Context;

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
    await this.ctx.render('/manager/index.pug', {
      pname,
      roleList
    });
  }

  @get('/add')
  async pclass(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    await this.ctx.render('/manager/add.pug', {
      pname
    });
  }
}
