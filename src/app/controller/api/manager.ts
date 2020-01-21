/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 01:42:42
 * @Description:
 */
import { Context, inject, controller, get, provide } from 'midway';

@provide('apiManager')
@controller('/api/manager', { middleware: ['generalMiddleware'] })
export class ApiManagerController {
  @inject()
  ctx: Context;

  @inject('managerService')
  managerService: { list: () => any };

  @get('/list')
  async list(): Promise<void> {
    var manager = await this.managerService.list();
    var data: any = {
      code: 0,
      msg: '',
      total: 180,
      data: manager
    };
    this.ctx.body = data;
  }
}
