var r = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
}

//文本域
initEditor()

//图片的剪裁
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
// $image.cropper(options)

getpasageData()
getdata()

function addzero(x) {
    return x > 9 ? x : '0' + x;
}
var laypage = layui.laypage;
//时间过滤函数
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    var y = addzero(dt.getFullYear())
    var m = addzero(dt.getMonth())
    var d = addzero(dt.getDate())
    var hh = addzero(dt.getHours())
    var mm = addzero(dt.getMinutes())
    var ss = addzero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

function getpasageData() {
    $.ajax({
        method: "get",
        url: "/my/article/list",
        data: r,
        success: function (res) {
            if (res.status != 0) {
                layui.layer.msg(res.message)
            }
            var htmlStr = template('listtemplate', res)
            $('tbody').html(htmlStr)
            pagecount(res.total)
        }
    })
}
//下拉框渲染
function getdata() {
    $.ajax({
        method: 'get',
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                console.log(res.message);
                return layui.layer.msg(res.message)
            }
            var htmlStr = template('classifly', res)
            $('[name=cate_id]').html(htmlStr)
            layui.form.render()
        }
    })
}
//实现筛选的功能
$('.shaixuan').click(function (e) {
    e.preventDefault()
    r.cate_id = $('[name=cate_id]').val()
    r.state = $('[name=state]').val()
    console.log(r);
    getpasageData()
})
//分页的盒子
function pagecount(total) {
    // 只要调用了laypage.render()方法jump就会触发
    laypage.render({
        elem: 'pageBox',
        count: total,
        limit: r.pagesize,
        curr: r.pagenum,
        limits: [2, 3, 5, 7, 10],
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        //first用来判定jump触发方式 是render触发时true
        jump: function (obj, first) {
            console.log(obj.curr);
            r.pagenum = obj.curr
            r.pagesize = obj.limit
            console.log(r);
            if (!first) {
                getpasageData()
            }
        }
    });
}
//实现删除事件
$('body').on('click', '.cut', function () {
    var id = $(this).attr('data-Id')
    var len = $('.cut').length
    console.log(id);
    layui.layer.confirm("确认删除", {
        icon: 3,
        title: '提示'
    }, function (index) {
        $.ajax({
            method: 'get',
            url: "/my/article/delete/" + id,
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                if (len == 1) {
                    r.pagenum--
                }
                getpasageData()
            }
        })
        layer.close(index)
    })

})
// $('.thechange').hide()
//实现文章修改的功能
var id = null
$('body').on('click', '.change', function () {
    id = $(this).attr('data-Id')
    $('.thechange').show()
    $('.thelist').hide()

    console.log(id);
    //首先发送ajax拿到类别
    $.ajax({
        method: "get",
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                console.log(res.message);
            }
            console.log(res.message);
            var htmlStr = template("classtemplate", res)
            $('.select').html(htmlStr)
        }
    })
    //将单个文章数据拿到
    $.ajax({
        method: "get",
        url: '/my/article/' + id,
        success: function (res) {
            if (res.status != 0) {
                console.log(res.message);
            }
            console.log(res.message);
            layui.form.val('updataForm', res.data)
            tinyMCE.activeEditor.setContent(res.data.content)
            // $image
            //     .cropper('destroy') // 销毁旧的裁剪区域
            //     .attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img) // 重新设置图片路径
            //     .cropper(options) // 重新初始化裁剪区域
            $image.attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img)
            $image.cropper(options)
            layui.form.render()
        }
    })
})
$('.choose').click(function () {
    $('#file').click()
})
//当表单换图片的触发事件
$('#file').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0) {
        return
    }
    var newImage = URL.createObjectURL(files[0]) //根据文件创建对应的URL
    console.log(newImage);
    $image.cropper('destroy').attr("src", newImage).cropper(options)
    console.log($image.attr('src'));
})
var art_state = '已发布'
//发送更新的ajax请求
$('.update').click(function (e) {
    e.preventDefault()
    var x = tinyMCE.activeEditor.getContent()
    var formdata = new FormData($('#form')[0])
    formdata.append('Id', id)
    formdata.append('state', art_state)
    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
    }).toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
        formdata.append('cover_img', blob)
        formdata.forEach((v,k)=>console.log(v+k))
        $.ajax({
            method:'post',
            url:'/my/article/edit',
            data:formdata,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!=0){
                   return  console.log(res.messsage);
                }
                console.log(res);
                // $('#reset').click()
                window.parent.document.querySelector('#aa').click()
            }
        })
    })
})
$('#reset').click(function (e) {
    e.preventDefault()
    var art_state = '草稿' //巧妙的利用了闭包
    $('.update').click()
})