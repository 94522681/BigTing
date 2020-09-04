$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url)
    var data = localStorage.getItem('token')
    options.headers={
        'Authorization': data||''
    };
    console.log(options.headers);
    //complete意思是请求结束后都会调用这个函数;
    options.complete = function (res) {
        if (res.responseJSON.status !=0) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})