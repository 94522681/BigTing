$(function () {
    // 1.直接申请ajax请求,在localStorage中获得数据,
    //渲染用户头像姓名
    checkUserMsg()

    //点击退出
    $('.getout').click(function() {
        layui.layer.confirm('确定退出',{icon: 3, title: '提示'},function() {
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index)
        })
    }) 


})
function checkUserMsg() {
    $.ajax({
        method: "get",
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                layui.layer.msg('获取用户信息失败&nbsp' + res.message)
                return
            }
            var name = res.data.nickname || res.data.username
            $('.personName').html(name)
            if (res.data.user_pic) {
                $('.img-avatar').show().attr('src', res.data.user_pic)
                console.log( $('.img-avatar').attr('src'));
                $('text-avatar').hide()
            } else {
                $('.img-avatar').hide()
                $('.text-avatar').show().html(name[0].toUpperCase())
            }
            // console.log(res);
        }
    })
}