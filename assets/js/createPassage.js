console.log(2);
// 加载文章分类的方法
initEditor()
getclassdata()

function getclassdata() {
    console.log(12);
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.messsage)
            }
            console.log(res);
            console.log('ll');
            var htmlStr = template('classtemplate', res)
            $('.select').html(htmlStr)
            layui.form.render()
        }

    })
}
// 图片剪裁
var $image = $('#image')
var art_state = '已发布'
// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}
// 3. 初始化裁剪区域
$image.cropper(options)


//文件选择框
$('.choose').click(function () {
    $('#file').click()
})
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
$('.pause').click(function (e) {
    var art_state = '存为草稿'
})
$('#form').on('submit', function (e) {
    e.preventDefault()
    var content =  tinyMCE.get('content').getContent();
    var formdata = new FormData($('#form')[0])
    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
    }).toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
        // formdata.append('cover_img', blob) 
        // console.log(blob);
        formdata.append('state', art_state)
        formdata.append('cover_img', blob)
        formdata.append('content', content)
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:formdata,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!=0){
                   return  console.log(res.messsage);
                }
                console.log(res);
                $('#reset').click()
                window.parent.document.querySelector('#aa').click()
            }
        })
    })

})