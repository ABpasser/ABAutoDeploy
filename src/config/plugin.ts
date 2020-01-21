/*
 * @Author: ABpasser
 * @Date: 1985-10-26 16:15:00
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-21 13:14:04
 * @Description:
 */
import { EggPlugin } from 'midway';
export default {
  static: true, // default is true
  pug: {
    enable: true,
    package: 'egg-view-pug'
  }
} as EggPlugin;
