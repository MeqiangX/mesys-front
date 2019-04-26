

// login-option  绑定切换 登录方式 事件
function initLoginPage() {


    // 动态生成的节点 不会再次绑定  要在渲染完成后 再次进行节点绑定事件
    $(".input-phone").on('focus',function () {
        phoneFocus();
    });//手机获得焦点


    $(".input-phone").on('blur',function () {
        $(".check-model").empty();
        if (1 == phoneBlur()){
            checkInfo("../image/icon/info.svg","请输入正确的手机号");
        }
    });//手机失去焦点




    // 密码框 得到焦点
    $(".input-password").focus(function () {
        pwdFocus();
    });

    //  密码框 失去焦点
    $(".input-password").blur(function () {
        pwdBlur();
    });

    // 验证码 得到焦点
    $(".input-code").focus(function () {
        codeFocus();
    });

    //  验证码 失去焦点
    $(".input-code").blur(function () {
        codeBlur();
    });
}


// 警告信息 div 填充
function checkInfo(imgSrc,message) {

    var str = new String();

    str = str + " <div  class=\"phone-check\">\n" +
        "                <img src=\""+ imgSrc +"\">\n" +
        "                <p>"+ message +"</p>\n" +
        "            </div>";

    $(".check-model").empty();
    $(".check-model").append(str);

}

// 切换登录方式
function changeLoginOption() {

    var option = $(".login-option").text();

    var str = new String();
    if (option == "普通方式登录"){

        $(".login-option").text("手机动态码登录");


        str = str + "         <input type=\"text\" class=\"input-phone\" placeholder=\"手机\">\n" +
            "                <input type=\"password\" class=\"input-password\" placeholder=\"密码\">\n" +
            "                <a href=\"javascript:void(0)\" class=\"forget-pwd\">忘记密码</a>\n" +
            "                <input type=\"button\" class=\"login-button\" value=\"登录\" onclick='login(0)'>\n" +
            "                <p class=\"no-account-label\">还没有账号?</p><a href=\"javascript:void(0)\" class=\"register\">免费注册</a>\n" +
            "           ";
    }else{

        $(".login-option").text("普通方式登录");

        str = str + "     <input type=\"text\" class=\"input-phone\" placeholder=\"手机\">\n" +
            "            <input type=\"code\" class=\"input-code\" placeholder=\"动态码\">\n" +
            "            <a href=\"javascript:void(0)\" class=\"code-get\" onclick='codeCount()'>获取手机动态码</a>\n" +
            "            <a href=\"javascript:void(0)\" class=\"dynamic-forget-pwd forget-pwd\">忘记密码</a>\n" +
            "            <input type=\"button\" class=\"login-button\" value=\"登录\" onclick='login(1)'>\n";

    }

    $(".login-model").empty();
    $(".login-model").append(str);


    $(".input-phone").on('focus',function () {
        phoneFocus();
    });//手机获得焦点


    $(".input-phone").on('blur',function () {
        $(".check-model").empty();
        if (1 == phoneBlur()){
            checkInfo("../image/icon/info.svg","请输入正确的手机号");
        }
    });//手机失去焦点

    // 因为只会初始化一次 js 动态添加的节点  无法监听  blur 和 focus 事件 所以在这里重新绑定上

    // 密码框 得到焦点
    $(".input-password").focus(function () {
        pwdFocus();
    });

    //  密码框 失去焦点
    $(".input-password").blur(function () {
        pwdBlur();
    });


    // 验证码 得到焦点
    $(".input-code").focus(function () {
        codeFocus();
    });

    //  验证码 失去焦点
    $(".input-code").blur(function () {
        codeBlur();
    });

}



// 失去焦点的  手机号格式判断
function phoneBlur() {

    // 失去焦点 判断输入框 是否有值 没有 则不去进行格式校验 只改变class
    $(".input-phone").removeClass("input-phone-blur");

    var phone = $(".input-phone").val();
    if (phone != '' && phone != null) {
        // 校验手机号是格式
        if (phoneRegCheck(phone)){
            return 0;
        }else{
            return 1;
        }
    }else{
        return 2;
    }
}


// 得到焦点的 手机框 样式改变
function phoneFocus() {
    $(".input-phone").addClass("input-phone-blur");
}


// 得到焦点的 密码框 样式改变
function pwdFocus() {
    $(".input-password").addClass("input-password-blur");
}

// 失去焦点的 密码框 样式改变
function pwdBlur() {
    $(".input-password").removeClass("input-password-blur");
}


// 得到焦点的 验证码 样式改变
function codeFocus() {
    $(".input-code").addClass("input-code-blur");
}

// 失去焦点的 验证码 样式改变
function codeBlur() {
    $(".input-code").removeClass("input-code-blur");
}


// 手机验证码 / 普通 登录
function login(loginOption) {

    var phone = $(".input-phone").val();
    var code = $(".input-code").val();
    var pwd = $(".input-password").val();

    $.ajax({
        type: "post",
        async:false,
        url:"http://127.0.0.1:8084/api/uc/user/login",
        data:{
            loginOption: loginOption ,
            account: $(".input-phone").val(),
            password: pwd,
            code: code
        },
        success:function (data,status) {

            if (true == data.success){
                // 登录成功
                alert("登录成功");
                return true;
            }else{
                alert(data.message)
                return false;
            }
        }
    });

    return result;

}

// 发送手机验证码
function sendCode() {

    $.ajax({
        type: "post",
        async:false,
        url:"http://127.0.0.1:8084/api/uc/user/sendMessage",
        data:{
            receverPhone: $(".input-phone").val(),
            sendType: 1
        },
        success: function (data,status) {
            if (data.success == true){
                alert("发送成功，请及时查看手机，验证码三分钟有效");
            }
        }
    });

}


/* 点击发送验证码之后的计时  */
function codeCount() {

    if (0 != phoneBlur()){
        checkInfo("../image/icon/info.svg","请输入正确的手机号");
        return ;
    }

    // 发送验证码
    sendCode();

    // 设置为不可点击
    $(".code-get").css("cursor","default"); // 鼠标为default
    $(".code-get").attr("href","#");
    $(".code-get").removeAttr("onclick");

    // setInterval js函数可以指定时间 来完成事件 ms单位
    var time = 360;


        var second = setInterval(function () {
            if (time > 0){
                $(".code-get").text("重新获取("+time+"S)");
                --time;
            }else{
                //文本换
                $(".code-get").text("重新获取");
                // 去除不可点击的效果
                $(".code-get").css("cursor","point");
                $(".code-get").attr("href","javascript:void(0)");
                $(".code-get").attr("onclick","codeCount()");
            }
        },1000);


}