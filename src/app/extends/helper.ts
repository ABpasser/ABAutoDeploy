/*
 * @Author: ABpasser
 * @Date: 2020-01-22 01:30:09
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 01:32:28
 * @Description:
 */
import * as dayjs from 'dayjs';

export class helper {
  static formatDate(param: dayjs.ConfigType) {
    return dayjs(param).format('YYYY-MM-DD');
  }

  static formatTime(param: dayjs.ConfigType) {
    return dayjs(param).format('YYYY-MM-DD HH:mm:ss');
  }

  static toJson(param: any) {
    var results = JSON.stringify(param);
    return JSON.parse(results);
  }
}
