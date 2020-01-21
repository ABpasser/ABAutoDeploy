/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 23:44:57
 * @Description:
 */
import { Context, inject, provide, get } from 'midway';

@provide()
export class BaseController {
  @inject()
  ctx: Context;

  @inject('toolsService')
  tools: { captcha: () => any };

  @get('/vertify')
  async vertify() {
    var captcha = await this.tools.captcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
}
