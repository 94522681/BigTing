// 1.原始密码要相同
// 2.新的密码和原始密码要相同
// 3.当点击确定之后验证原始密码是否与新的密码相同
layui.form.verify({
    username: function (value) {
        if (value.length < 6) {
            return '密码长度不能小于6'
        }
        if(value.length>15){
            return '密码长度不能大于15'
        }
    },
    check: function (value) {
        if (value!=$('[name=newPassword]').val()){
            return '您输入的确认密码输入有误'
        }
    }
})

//点击提交修改，发出ajax请求
$('.update').click(function(e){
    e.preventDefault()
    x=$('#theform').serialize()
    console.log(x);
    $.ajax({
        method:'post',
        url:"/my/updatepwd",
        data:$('#theform').serialize(),
        success:function(res) {
            console.log(122);
            if(res.status!=0){
                layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            location.herf='../login.html'
        }
    })
})

console.log(11);