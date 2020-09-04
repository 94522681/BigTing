var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  $('.upload').click(function() {
    console.log(12);
    $('#file').click()
  })
  // 为文件选择框绑定change事件
  $('#file').on('change',function(e) {
    var filelist=e.target.files
    if(filelist.length==0){
      layui.layer.msg("请选择照片")
    }
    var file=filelist[0]
    console.log(file);
    var newImgURL=URL.createObjectURL(file)
    console.log(newImgURL);
    $image.cropper('destroy').attr("src",newImgURL).cropper(options)
    console.log($image.attr('src'));
  })
  $('.confirm').click(function(e) {
    e.preventDefault()
    console.log(12);
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      // console.log(dataURL);
      $.ajax({
        method:'post',
        url:"/my/update/avatar",
        data:{
          avatar:dataURL
        },
        success:function(res){
          if(res.status!=0){
            layui.layer.msg(res.message)
          }
          layui.layer.msg(res.message)
          window.parent.checkUserMsg()
        }
      })

  })
