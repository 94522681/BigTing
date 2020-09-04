// 1.表单中赋值
// --获取数据--
// 2.进行表单验证

getUserData()
$('.reset').click(function (e) {
    e.preventDefault()
    getUserData()
})
layui.form.verify({
    username: function (value) {
        if (value.length > 8) {
            return '姓名不能超过8'
        }
    }
})
// form.verify({
//     nickname: function(value) {
//       if (value.length > 6) {
//         return '昵称长度必须在 1 ~ 6 个字符之间！'
//       }
//     }
//   })
// 提交表单
$('.update').click(function (e) {
    e.preventDefault()
    updatUserData()
})

function getUserData() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return
            }
            layui.form.val('userfilter', res.data)
        }
    });
}

function updatUserData() {
    var x=$('#theform').serialize()
    console.log(x);
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data:x,
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return
            }
            layui.layer.msg(res.message)
            window.parent.checkUserMsg()
        }
    })
    console.log(window.parent);
}