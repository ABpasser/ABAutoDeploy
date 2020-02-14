import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

export class compressFile {
  private static async readFold(foldPath) {
    return new Promise((resolve, reject) => {
      //根据文件路径读取文件，返回文件列表
      // var filesPath = [];
      var files = fs.readdirSync(foldPath);

      if (!files) {
        console.log('err');
      } else {
        //遍历读取到的文件列表
        files.forEach(function(filename) {
          //获取当前文件的绝对路径
          var filedir = path.join(foldPath, filename);
          //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, function(eror, stats) {
            if (eror) {
              console.log('获取文件stats失败');
            } else {
              var isFile = stats.isFile(); //是文件
              var isDir = stats.isDirectory(); //是文件夹
              if (isFile) {
                resolve(filedir);
              }
              if (isDir) {
                compressFile.readFold(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          });
        });
      }
    });
  }

  static async compress(targetDir: any, localFile: any) {
    var results = await compressFile.readFold(localFile);
    console.log(results);

    // var filesList = compressFile.geFileList(localFile);

    return new Promise((resolve, reject) => {
      console.log('1-正在压缩文件...');

      let output = fs.createWriteStream('dist.zip'); // 创建文件写入流
      const archive = archiver('zip', {
        zlib: { level: 9 } // 设置压缩等级
      });
      output
        .on('close', () => {
          resolve(console.log('2-压缩完成！共计 ' + (archive.pointer() / 1024 / 1024).toFixed(3) + 'MB'));
        })
        .on('error', (err) => {
          reject(console.error('压缩失败', err));
        });
      archive.pipe(output); // 管道存档数据到文件

      // results.map((element) => {
      //   console.log(element);
      //将被打包文件的流添加进archiver对象中
      archiver.append(fs.createReadStream(results[0]), { name: results });
      // });
      archive.directory(targetDir, 'dist'); // 存储目标文件并重命名
      archive.finalize(); // 完成文件追加 确保写入流完成
    });
  }
}
