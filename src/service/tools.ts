/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 00:46:12
 * @Description:
 */
import { provide, inject, Context } from 'midway';
import * as svgCaptcha from 'svg-captcha';
import * as crypto from 'crypto';

@provide('toolsService')
export class ToolsService {
  @inject()
  ctx: Context;

  async captcha() {
    // 生成算式
    // var captcha = svgCaptcha.createMathExpr({
    //   size: 4,
    //   fontSize: 40,
    //   width: 100,
    //   height: 40,
    //   background: '#76B1DE'
    // });
    // 生成4位验证码
    var captcha = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      width: 120,
      height: 32,
      background: '#76B1DE'
    });
    this.ctx.session.vercode = captcha.text;
    return captcha;
  }

  async md5(con: string | Buffer | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | DataView) {
    const md5 = crypto.createHash('md5');
    return md5.update(con).digest('hex');
  }
}
