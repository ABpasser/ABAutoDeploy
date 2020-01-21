/*
 * @Author: ABpasser
 * @Date: 2018-09-03 09:49:33
 * @LastEditors: ABpasser
 * @LastEditTime: 2019-10-04 03:06:04
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
    form = layui.form,
    treeTable = layui.treeTable;

  var re = {};
  admin.req({
    url: '/api/admin/access/list?_csrf=' + csrf, //实际使用请改成服务端真实接口
    method: 'get',
    done: function(res) {
      re = treeTable.render({
        elem: '#tree-table',
        data: res.data,
        icon_key: 'title',
        is_checkbox: false,
        end: function(e) {
          form.render();
        },
        cols: [
          {
            key: 'id',
            title: 'ID',
            width: '40px',
            align: 'center'
          },
          {
            key: 'title',
            title: '名称',
            width: '100px',
            template: function(item) {
              if (item.level == 0) {
                return '<span style="color:#333;">' + item.title + '</span>';
              } else if (item.level == 1) {
                return '<span style="color:#666;">' + item.title + '</span>';
              } else if (item.level == 2) {
                return '<span style="color:#999;">' + item.title + '</span>';
              } else {
                return '<span style="color:red;">' + item.title + '</span>';
              }
            }
          },
          {
            key: 'typename',
            title: '类型',
            width: '80px'
          },
          {
            key: 'pid',
            title: 'PID',
            width: '40px',
            align: 'center'
          },
          {
            key: 'url',
            title: '菜单地址',
            width: '200px',
            align: 'left'
          },
          {
            key: 'description',
            title: '描述',
            align: 'left'
          },
          // {   权限排序
          //   key: 'sort',
          //   title: '排序',
          //   width: '80px',
          //   align: 'center',
          //   fixed: 'right'
          // },
          {
            title: '操作',
            width: '200px',
            align: 'center',
            fixed: 'right',
            template: function(item) {
              return '<a class="layui-btn layui-btn-normal layui-btn-xs" lay-filter="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a><a class="layui-btn layui-btn-danger layui-btn-xs" lay-filter="del"><i class="layui-icon layui-icon-delete"></i>删除</a>';
            }
          }
        ]
      });
    }
  });
  treeTable.on('tree(edit)', function(data) {
    layer.open({
      type: 2,
      title: '编辑权限',
      content: '/admin/access/edit?id=' + data.item.id,
      area: ['500px', '500px'],
      btn: ['确定', '取消'],
      yes: function(index, layero) {
        var iframeWindow = window['layui-layer-iframe' + index],
          submit = layero
            .find('iframe')
            .contents()
            .find('#LAY-access-submit');

        //监听提交
        iframeWindow.layui.form.on('submit(LAY-access-submit)', function(data) {
          var field = data.field; //获取提交的字段
          //提交 Ajax 成功后，静态更新表格中的数据
          admin.req({
            url: '/api/admin/access/edit?_csrf=' + csrf, //实际使用请改成服务端真实接口
            method: 'post',
            data: field,
            done: function(res) {
              if (res.data) {
                layer.msg('修改成功', {
                  offset: '15px',
                  icon: 1,
                  time: 1000
                });
                refreshList();
                layer.close(index);
              } else {
                layer.msg('添加失败', {
                  offset: '15px',
                  icon: 1,
                  time: 1000
                });
                layer.close(index);
              }
            }
          });
          //- treeTable.render(access);
          //- table.reload('#tree-table');
          layer.close(index); //关闭弹层
        });

        submit.trigger('click');
      }
    });
  });
  treeTable.on('tree(del)', function(data) {
    data.item.userId = userId;
    layer.confirm('确定删除此权限？', function(index) {
      admin.req({
        url: '/api/admin/access/del?_csrf=' + csrf, //实际使用请改成服务端真实接口
        method: 'delete',
        data: data.item,
        done: function(res) {
          if (res.data) {
            layer.msg('成功删除', {
              offset: '15px',
              icon: 1,
              time: 1000
            });
            refreshList();
          } else {
            layer.msg(res.msg, {
              offset: '15px',
              icon: 2,
              time: 1000
            });
          }
        }
      });
    });
  });

  function refreshList() {
    admin.req({
      url: '/api/admin/access/list?_csrf=' + csrf, //实际使用请改成服务端真实接口
      method: 'get',
      done: function(res) {
        re.data = res.data;
        console.log(re);
        treeTable.render(re);
      }
    });
  }
  exports('access', {});
});
