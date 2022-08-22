layui.use(['form', 'table', 'dropdown'], function () {
    let $ = layui.jquery;
    let form = layui.form;
    let table = layui.table;
    let dropdown = layui.dropdown;

    table.render({
        elem: '#table_timed_task',
        url: '../../api/table.json',
        toolbar: '#table_toolbar_timed_task',
        defaultToolbar: ['filter'],
        height: 'full-170',
        text: {
            none: '什么也没有~'
        },
        cols: [[
            {field: 'none1', type: "checkbox", width: 50},
            {field: 'none2', title: '序号', type: 'numbers'},
            {field: 'name', title: '名称', sort: true},
            {field: 'command', title: '命令'},
            {field: 'rule', title: '定时规则'},
            {field: 'lastRunTime', title: '最后运行时间', sort: true},
            {field: 'lastRunDuration', title: '最后运行时长', sort: true},
            {field: 'nextRunTime', title: '下次运行时间', sort: true},
            {field: 'status', title: '状态', sort: true, hide: true},
            {title: '状态', toolbar: '#table_bar_timed_task_status', align: "center"},
            {title: '操作', toolbar: '#table_bar_timed_task_operation', align: "center"}
        ]],
        page: {
            // 每页显示的条数
            limit: 10,
            // 可供选择的条数选项
            limits: [10, 15, 20, 25, 50, 100],
        }
    });

    // 监听搜索操作
    form.on('submit(data-search-btn)', function (data) {
        let result = JSON.stringify(data.field);
        // 执行搜索重载
        table.reload('table_timed_task', {

        });
        return false;
    });

    /**
     * 监听 toolbar 操作
     */
    table.on('toolbar(lay-filter-table-timed-task)', function (obj) {
        if (obj.event === 'add') {  // 监听添加操作
            var index = layer.open({
                title: '添加用户',
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ['50%', '80%'],
                content: '../../page/table/add.html',
            });
            $(window).on("resize", function () {
                layer.full(index);
            });
        } else if (obj.event === 'delete') {  // 监听删除操作
            var checkStatus = table.checkStatus('currentTableId'), data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
    });

    // 监听表格复选框选择
    table.on('checkbox(lay-filter-table-timed-task)', function (obj) {
        console.log(obj)
    });

    // 监听按钮操作
    table.on('tool(lay-filter-table-timed-task)', function (obj) {
        var data = obj.data;
        let fun = handler[obj.event];
        if (typeof fun === 'function') {
            fun()
        }
        if (obj.event === 'edit') {
            var index = layer.open({
                title: '编辑用户',
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ['50%', '80%'],
                content: '../../page/table/edit.html',
            });
            $(window).on("resize", function () {
                layer.full(index);
            });
            return false;
        } else if (obj.event === 'delete') {
            layer.confirm('真的删除行么', function (index) {
                obj.del();
                layer.close(index);
            });
        }
    });

    let handler = {
        start: () => {
            console.log('点击了启动...')
        },
        more: () => {
            console.log('点击了更多...')
            dropdown.render({
                elem: '#btn_more',
                show: true,
                data: [{
                    title: '编辑',
                    id: 'edit'
                }, {
                    title: '禁用',
                    id: 'disable'
                }, {
                    title: '删除',
                    id: 'delete'
                }, {
                    title: '置顶',
                    id: 'top'
                }],
                click: (menu) => {
                    if (menu.id === 'del') {
                        layer.confirm('真的删除行么', function (index) {
                            obj.del();
                            layer.close(index);
                        });
                    } else if (menu.id === 'edit') {
                        layer.msg('编辑操作，当前行 ID:' + data.id);
                    }
                },
                align: 'right'
            })
        }
    }

});
