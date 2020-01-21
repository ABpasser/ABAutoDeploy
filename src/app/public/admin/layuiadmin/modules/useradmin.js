/*
 * @Author: ABpasser
 * @Date: 2018-09-03 09:49:33
 * @LastEditors  : ABpasser
 * @LastEditTime : 2020-01-22 01:35:48
 * @Description:
 */
/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */

layui.define(['table', 'form'], function(exports) {
  var $ = layui.$,
    table = layui.table,
    admin = layui.admin,
    form = layui.form;

  //用户管理
  table.render({
    elem: '#LAY-user-manage',
    url: layui.setter.base + 'json/useradmin/webuser.js', //模拟接口
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        { field: 'id', width: 100, title: 'ID', sort: true },
        { field: 'username', title: '用户名', minWidth: 100 },
        { field: 'avatar', title: '头像', width: 100, templet: '#imgTpl' },
        { field: 'phone', title: '手机' },
        { field: 'email', title: '邮箱' },
        { field: 'sex', width: 80, title: '性别' },
        { field: 'ip', title: 'IP' },
        { field: 'jointime', title: '加入时间', sort: true },
        { title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-webuser' }
      ]
    ],
    page: true,
    limit: 30,
    height: 'full-220',
    text: '对不起，加载出现异常！'
  });

  //监听工具条
  table.on('tool(LAY-user-manage)', function(obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.prompt(
        {
          formType: 1,
          title: '敏感操作，请验证口令'
        },
        function(value, index) {
          layer.close(index);

          layer.confirm('真的删除行么', function(index) {
            obj.del();
            layer.close(index);
          });
        }
      );
    } else if (obj.event === 'edit') {
      var tr = $(obj.tr);

      layer.open({
        type: 2,
        title: '编辑用户',
        content: '../../../views/user/user/userform.html',
        maxmin: true,
        area: ['500px', '450px'],
        btn: ['确定', '取消'],
        yes: function(index, layero) {
          var iframeWindow = window['layui-layer-iframe' + index],
            submitID = 'LAY-user-front-submit',
            submit = layero
              .find('iframe')
              .contents()
              .find('#' + submitID);

          //监听提交
          iframeWindow.layui.form.on('submit(' + submitID + ')', function(data) {
            var field = data.field; //获取提交的字段

            //提交 Ajax 成功后，静态更新表格中的数据
            //$.ajax({});
            table.reload('LAY-user-front-submit'); //数据刷新
            layer.close(index); //关闭弹层
          });

          submit.trigger('click');
        },
        success: function(layero, index) {}
      });
    }
  });

  //管理员管理
  table.render({
    elem: '#LAY-user-back-manage',
    url: '/api/manager/list?_csrf=' + csrf, //模拟接口
    method: 'GET',
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        { field: 'id', width: 80, title: 'ID', sort: true },
        { field: 'username', title: '登录名' },
        { field: 'phone', title: '手机' },
        { field: 'email', title: '邮箱' },
        { field: 'roleid', title: '角色' },
        // { field: 'jointime', title: '加入时间', sort: true },
        // { field: 'check', title: '审核状态', templet: '#buttonTpl', minWidth: 80, align: 'center' },
        { title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin' }
      ]
    ],
    defaultToolbar: ['filter', 'print', 'exports'], // 无工具栏
    text: {
      none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
    }
  });

  //监听工具条
  table.on('tool(LAY-user-back-manage)', function(obj) {
    var data = obj.data;

    if (obj.event === 'del') {
      // layer.prompt({
      //   formType: 1
      //   ,title: '敏感操作，请验证口令'
      // }, function(value, index){

      //   layer.close(index);
      layer.confirm('确定删除此管理员？', function(index) {
        if (data.id === userId) {
          layer.msg('不能删除您当前登录的帐号', {
            offset: '15px',
            icon: 1,
            time: 1000
          });
        } else {
          admin.req({
            url: '/api/admin/manager/del?_csrf=' + csrf, //实际使用请改成服务端真实接口
            method: 'delete',
            data: data,
            done: function(res) {
              layer.msg('成功删除', {
                offset: '15px',
                icon: 1,
                time: 1000
              });
              obj.del();
              layer.close(index);
            }
          });
        }
      });
      // });
    } else if (obj.event === 'edit') {
      var tr = $(obj.tr);
      var userId = data.id;
      layer.open({
        type: 2,
        title: '编辑管理员',
        content: '/admin/manager/edit?userId=' + userId,
        area: ['420px', '420px'],
        btn: ['确定', '取消'],
        yes: function(index, layero) {
          var iframeWindow = window['layui-layer-iframe' + index],
            submitID = 'LAY-user-back-submit',
            submit = layero
              .find('iframe')
              .contents()
              .find('#' + submitID);

          //监听提交
          iframeWindow.layui.form.on('submit(' + submitID + ')', function(data) {
            var field = data.field; //获取提交的字段
            //提交 Ajax 成功后，静态更新表格中的数据
            admin.req({
              url: '/api/admin/manager/edit?_csrf=' + csrf, //实际使用请改成服务端真实接口
              method: 'post',
              data: field,
              done: function(res) {
                if (res) {
                  layer.msg('修改成功', {
                    offset: '15px',
                    icon: 1,
                    time: 1000
                  });
                  layer.close(index);
                } else {
                  layer.msg('修改失败', {
                    offset: '15px',
                    icon: 1,
                    time: 1000
                  });
                  layer.close(index);
                }
              }
            });

            table.reload('LAY-user-back-manage'); //数据刷新
            layer.close(index); //关闭弹层
          });

          submit.trigger('click');
        },
        success: function(layero, index) {}
      });
    }
  });

  //角色管理
  table.render({
    elem: '#LAY-user-back-role',
    url: '/api/admin/role/list?_csrf' + csrf, //模拟接口
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        { field: 'id', width: 80, title: 'ID', sort: true },
        { field: 'title', title: '角色名' },
        { field: 'description', title: '拥有权限' },
        { field: 'info', title: '具体描述' },
        { title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin' }
      ]
    ],
    defaultToolbar: ['filter', 'print', 'exports'],
    text: {
      none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
    }
  });

  //监听工具条
  table.on('tool(LAY-user-back-role)', function(obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.confirm('确定删除此角色？', function(index) {
        console.log(data.id);
        if (data.id === 1) {
          layer.msg('不能删除您当前登录的帐号', {
            offset: '15px',
            icon: 1,
            time: 1000
          });
        } else {
          admin.req({
            url: '/api/admin/role/del?_csrf=' + csrf, //实际使用请改成服务端真实接口
            method: 'delete',
            data: data,
            done: function(res) {
              layer.msg('成功删除', {
                offset: '15px',
                icon: 1,
                time: 1000
              });
              obj.del();
              layer.close(index);
            }
          });
        }
        layer.close(index);
      });
    } else if (obj.event === 'edit') {
      var tr = $(obj.tr);
      layer.open({
        type: 2,
        title: '编辑角色',
        content: '/admin/role/edit?roleId=' + obj.data.id,
        area: ['500px', '480px'],
        btn: ['确定', '取消'],
        yes: function(index, layero) {
          var iframeWindow = window['layui-layer-iframe' + index],
            submit = layero
              .find('iframe')
              .contents()
              .find('#LAY-user-role-submit');

          //监听提交
          iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function(data) {
            var field = data.field; //获取提交的字段

            //提交 Ajax 成功后，静态更新表格中的数据
            admin.req({
              url: '/api/admin/role/edit?_csrf=' + csrf, //实际使用请改成服务端真实接口
              method: 'post',
              data: field,
              done: function(res) {
                if (res) {
                  layer.msg('修改成功', {
                    offset: '15px',
                    icon: 1,
                    time: 1000
                  });
                  layer.close(index);
                } else {
                  layer.msg('修改失败', {
                    offset: '15px',
                    icon: 1,
                    time: 1000
                  });
                  layer.close(index);
                }
              }
            });
            table.reload('LAY-user-back-role'); //数据刷新
            layer.close(index); //关闭弹层
          });

          submit.trigger('click');
        },
        success: function(layero, index) {}
      });
    }
  });

  exports('useradmin', {});
});
