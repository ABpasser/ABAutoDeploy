/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 15:28:53
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('setting')
@controller('/setting', { middleware: ['generalMiddleware'] })
export class SettingController {
  @inject()
  ctx: Context;

  @get('/website')
  async index(): Promise<void> {
    // 验证码
    // var vercode = this.ctx.session.vercode;
    let pname: string = this.ctx.programConfig.name;
    let website = {
      webname: '自动部署',
      weburl: '',
      webtitle: '',
      webkeyword: '',
      webdescription: '',
      webcopyright: ''
    };
    await this.ctx.render('/setting/website.pug', {
      pname,
      website
    });
  }

  @get('/mydata')
  async mydata(): Promise<void> {
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
    let manager = {
      id: '',
      username: '',
      nickname: '',
      phone: '',
      email: '',
      remark: ''
    };
    let pname: string = this.ctx.programConfig.name;
    await this.ctx.render('/setting/mydata.pug', {
      pname,
      roleList,
      manager
    });
  }

  @get('/password')
  async password(): Promise<void> {
    let manager = {
      id: '',
      username: '',
      nickname: '',
      phone: '',
      email: '',
      remark: ''
    };
    let pname: string = this.ctx.programConfig.name;
    await this.ctx.render('/setting/password.pug', {
      pname,
      manager
    });
  }
}
