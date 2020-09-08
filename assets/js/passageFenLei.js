getdata()
// 1.发出ajax请求得到数据
//用template渲染数据
var laypage = layui.laypage;
function getdata() {
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
                return
            }
            console.log(res.data);
            var htmlStr = template('thclassdata', res)
            $('tbody').html(htmlStr)
        }
    })
}
var x = null
//点击添加类别 然后出现弹出层
$('#addclass').click(function () {
    x = layer.open({
        type: 1,
        content: $('#open').html(),
        area: ['500px', '250px'],
        title: '添加文章分类'
    })
})
//新添文章分类 确认按钮要动态绑定事件
$('body').on('click', '#confirm', function (e) {
    console.log(12);
    e.preventDefault()
    var data = $('#openform').serialize()
    console.log(data);
    for (var i = 0; i < 20; i++) {
        setdata(data);
    }
    getdata()
    // layer.closeAll();
    layer.close(x)
})

function setdata(data) {
    $.ajax({
        url: "/my/article/addcates",
        method: "post",
        data: data,
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
                return
            }
            layui.layer.msg(res.message)
            console.log(res);
        }
    })
}
//处理编辑事件
$('body').on('click', '.change', function (e) {
    var id = $(this).attr('data-id')
    //发送ajax请求
    $.ajax({
        method: "get",
        url: "/my/article/cates/" + id,
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
                return
            }
            console.log(res.data);
            layui.form.val('changeone', res.data)
        }
    })
    //打开弹出层
    layer.open({
        type: 1,
        content: $('#openchange').html(),
        area: ['500px', '250px'],
        title: '添加文章分类'
    })
})
//删除的请求
$('body').on('click', '.cut', function (e) {
    var id = $(this).attr('data-id')
    console.log(id);
    // 发送ajax请求
    $.ajax({
        method: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
                return
            }
            layui.layer.msg(res.message)
            getdata()
        }
    })
    // 打开弹出层
})
$('body').on('click', '#confirmSure', function (e) {
    e.preventDefault()
    console.log(12);
    var data1 = layui.form.val("changeone")
    console.log(data1);
    $.ajax({
        method: "post",
        url: "/my/article/updatecate",
        data: data1,
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
                return
            }
            layui.layer.msg(res.message)
            layer.closeAll();
            getdata()
        }
    })
})