$('#login #link_reg').click(function () {
    $('#login').hide()
    $('#register').show()
})
$('#register #link_reg').click(function () {
    $('#register').hide()
    $('#login').show()
})
// 1.编写自定义表单验证方法
var form = layui.form
var layer = layui.layer
form.verify({
    repeat: function () { //value：表单的值、item：表单的DOM对象
            if ($('#register [name=confirmpwd]').val() == $('#register [name=pwd]').val()) {} else {
                console.log($('#register [name=confirmpwd]').val());
                console.log($('#register [name=pwd]').val());
                return '两次密码不一致'
            }
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ]
});

// 第二步就是表单的提交，并获得数据
$('#register').submit(function (e) {
    e.preventDefault()
    // var data=$(this).serialize()
    // 获取数据的第一种方法
    var data = {
        username: $('#register [name=name]').val(),
        password: $('#register [name=confirmpwd]').val(),
    }
    $.post('/api/reguser', data, function (res) {
        layer.msg(res.message)
    })
    console.log(data);
    $('#register #link_reg').click()
})
$('#login').submit(function (e) {
    e.preventDefault()
    // 获取数据的第一种方法
    // var data = {
    //     username: $('#login [name=name]').val(),
    //     password: $('#login [name=confirmpwd]').val(),
    // }
    // 获取数据的第二种方法
    var data = $(this).serialize()
    $.post('/api/login', data, function (res) {
        if (res.status != 0) {
            layer.msg(res.message)
            return
        }
        layer.msg(res.message)
        console.log(res.token);
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
    })
    console.log(data);
})