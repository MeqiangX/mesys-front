

// 千分位工具函数

function format(num) {
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}


// 手机号格式校验
function phoneRegCheck(phone) {
    if(!(/^1[34578]\d{9}$/.test(phone))){
        return false;
    }
    return true;
}

// 发送手机验证码
function sendCode(phone,sendType) {

    $.ajax({
        type: "post",
        async:false,
        url:"http://127.0.0.1:8084/api/uc/user/sendMessage",
        data:{
            receverPhone: phone,
            sendType: sendType
        },
        success: function (data,status) {
            if (data.success == true){
                alert("发送成功，请及时查看手机，验证码三分钟有效");
            }
        }
    });

}


//得到手机验证码
function getCode(phone,sendType) {
    // 发送请求 得到 验证码
    var result = null;
    $.ajax({
        type:"post",
        async:false,
        url:"http://localhost:8084/api/uc/user/getCode",
        data:{
            receverPhone:phone,
            sendType: sendType
        },
        success:function (data,status) {
            if (true == data.success) {

                // 请求成功
                result = data.data;
            }
        }
    });


    return result;
}

// 日期转换函数

function dateToStr(){

}


// 获得 xxxx-xx-xx 的日期格式str
function dateFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}