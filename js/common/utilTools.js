

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


// 传入时间 是否是  如果是 则 可以操作 否则 不允许退票 购票 操作
function is15MinueBefore(arrangeTime,now) {

    var arrange = new Date(arrangeTime);
    arrange.setMinutes (arrange.getMinutes () - 15);  // 看放映时间前15 分钟和 当前时间的比较 arrange > now 才能操作

    var time = diffTime(now,arrange);
    console
        .log(arrange);
    console
        .log(time);
    if (time > 0){
        return true;
    }

    return false;

}




function diffTime(startDate,endDate) {
    startDate= new Date(startDate);
    endDate = new Date(endDate);
    console
        .log(endDate);
    var diff=endDate.getTime() - startDate.getTime();//时间差的毫秒数

    return diff / 1000 / 60;

   /* //计算出相差天数
    var days=Math.floor(diff/(24*3600*1000));

    console.log(days);
    //计算出小时数
    var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000));
    console.log(hours);
    //计算相差分钟数
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000));
    console.log(minutes);

    return minutes;
    //计算相差秒数
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000);

    var returnStr = seconds + "秒";
    if(minutes>0) {
        returnStr = minutes + "分" + returnStr;
    }
    if(hours>0) {
        returnStr = hours + "小时" + returnStr;
    }
    if(days>0) {
        returnStr = days + "天" + returnStr;
    }
    return minutes;*/
}