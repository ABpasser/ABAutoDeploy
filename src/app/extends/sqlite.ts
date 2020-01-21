/*
 * @Author: ABpasser
 * @Date: 2020-01-22 00:37:08
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 01:27:38
 * @Description:
 */
import * as sqlite3 from 'sqlite3';
var db: any;
export class sqliteTool {
  static db = db;
  static get(query: any, params: any) {
    return new Promise(function(resolve, reject) {
      db.get(query, params, function(err: { message: string }, row: unknown) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(row);
        }
      });
    });
  }
  static all(query: any, params: any[]) {
    return new Promise(function(resolve, reject) {
      if (params == undefined) params = [];

      db.all(query, params, function(err: { message: string }, rows: unknown) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(rows);
        }
      });
    });
  }
  static open(path: string) {
    return new Promise(function(resolve) {
      db = new sqlite3.Database(path, function(err: { message: string }) {
        if (err) console.log('Open error: ' + err.message);
        else resolve(path + ' opened');
      });
    });
  }
  static run(query: any) {
    return new Promise(function(resolve, reject) {
      db.run(query, function(err: { message: any }) {
        if (err) reject(err.message);
        else resolve(true);
      });
    });
  }
  static each(query: any, params: any, action: (arg0: any) => void) {
    return new Promise(function(resolve, reject) {
      var db = db;
      db.serialize(function() {
        db.each(query, params, function(err: { message: string }, row: any) {
          if (err) reject('Read error: ' + err.message);
          else {
            if (row) {
              action(row);
            }
          }
        });
        db.get('', function(err: any, row: any) {
          resolve(true);
        });
      });
    });
  }
  static close() {
    return new Promise(function(resolve, reject) {
      db.close();
      resolve(true);
    });
  }
}
