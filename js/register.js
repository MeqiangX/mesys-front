

// 注册 js

// 初始化
function init() {

    // 发送短信按钮 绑定click

    // 手机 绑定  失去焦点时候的 验证
    $(".phone-text").blur(function () {
        if (true == checkPhone()){
            //  正确
        }
    });
    // 短信验证码 绑定 失去焦点 验证
    $(".code-text").blur(function () {
        var tag = codeCheck($(".phone-text").val(),$(".code-text").val());
        if (tag){
            // 验证通过
        }
    });

    // 密码 绑定失去焦点验证
    $(".password-text").blur(function () {
        if (passwordCheck($(".password-text").val())){
            // 正确密码
        }
    });


    // 验证密码 绑定失去焦点验证
    $(".password-text-review").blur(function () {
        if (passwordReviewCheck($(".password-text").val(),$(".password-text-review").val())){
            // 正确验证
        }
    });



}


// 给input 节点添加 right class
function addRightClass(domName) {

}



// 给input 节点删除 right class
function removeRightClass(domName){

}


// 重置按钮
function reset(){

    $(".phone-text").val("");
    $(".code-text").val("");
    $(".password-text").val("");
    $(".password-text-review").val("");

}

// 提交按钮
function submitForm() {

    var tag = submitRegister();
    if (0 == tag){

        // 验证成功  发送注册请求

        $.ajax({
            type:"post",
            async:false,
            url:"http://localhost:8084/api/uc/user/register",
            data:{
                code: $(".code-text").val(),
                phone: $(".phone-text").val(),
                userName: $(".phone-text").val(),
                password: $(".password-text").val(),
                registerOption: 3
            },
            success:function (data,status) {
                if (data.success == true){
                    // 成功
                    alert("注冊成功");
                }else{
                    // 打印message的 失败信息
                    alert(data.message);
                }
            }
        });


    }else{
        if (1 == tag){
            alert("手机号非法");
        }
        if (2 == tag){
            alert("验证码错误");
        }
        if (3 == tag){
            alert("非法的密码格式");
        }
        if (4 == tag){
            alert("两次输入的密码不一样");
        }
    }
}


function submitRegister(){

    // 再重新验证一遍表单
    var phoneTag = checkPhone();
    var codeTag = codeCheck($(".phone-text").val(),$(".code-text").val());
    var passwordTag = passwordCheck($(".password-text").val());
    var passwordReviewTag = passwordReviewCheck($(".password-text").val(),$(".password-text-review").val());

    if (phoneTag && codeTag && passwordTag && passwordReviewTag){
        return 0;
    }else{
        if (!phoneTag){
            return 1;
        }
        if (!codeTag){
            return 2;
        }
        if (!passwordTag){
            return 3;
        }
        if (!passwordReviewTag){
            return 4;
        }
    }

}


// 手机号验证
function checkPhone() {

    var phone = $(".phone-text").val();

    if (phone == null || phone == ''){
        $(".phone-img").attr("src","../image/icon/info.svg");
        $(".phone-info").text("请输入您的手机号码");
        return false;
    }else{
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $(".phone-img").attr("src","../image/icon/wrong.svg");
            $(".phone-info").text("请输入正确的11位手机号码");
            return false;
        }else{
            $(".phone-img").attr("src","../image/icon/right.svg");
            $(".phone-info").text("");
            return true;
        }
    }


}

// 发送验证码
function sendMessage() {
    $.ajax({
        type:"post",
        async: false,
        url: "http://localhost:8084/api/uc/user/sendMessage",
        data:{
            receverPhone: $(".phone-text").val(),
            sendType: 3
        },
        success: function (data,status) {
            if (data.data == true){
                alert("发送验证码成功，请注意查看手机，三分钟内有效");
            }
        }
    });
}

// 短信验证码的验证
function codeCheck(phone,inputCode) {

    var result = false;
    // 如果没有输入
    if (inputCode == null || inputCode == ''){
        $(".code-img").attr("src","../image/icon/info.svg");
        $(".code-info").text("请输入验证码");
        result = false;
    }

    // 发送请求 得到 验证码
   $.ajax({
        type:"post",
        async:false,
        url:"http://localhost:8084/api/uc/user/getCode",
        data:{
            receverPhone: $(".phone-text").val(),
            sendType: 3
        },
        success:function (data,status) {


            if (true == data.success){

                // 请求成功
                var code = data.data;

                //比较
                if (code == inputCode){
                    alert("相同-- 返回 true");
                    // 相同
                    $(".code-img").attr("src","../image/icon/right.svg");
                    $(".code-info").text("");
                    result = true;
                }else{
                    // 不同
                    $(".code-img").attr("src","../image/icon/wrong.svg");
                    $(".code-info").text("验证码错误");
                    result = false;
                }

            }else{
                // 验证码已经过期
                alert(data.message);
                result = false;
            }

        }
    });

    return result;

}

// 密码 验证
function passwordCheck(password){

    if (password == null || password == ''){
        $(".password-img").attr("src","../image/icon/info.svg");
        $(".password-info").text("请填写密码");
        return false;
    }else{
        var   re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        var result=  re.test(password);
        if(result) {
            $(".password-img").attr("src","../image/icon/right.svg");
            $(".password-info").text("");
            return true;
        }else {
            $(".password-img").attr("src","../image/icon/wrong.svg");
            $(".password-info").text("密码至少包含大写字母，小写字母，数字，且不少于8位");
            return false;
        }
    }

}


// 两次密码是否相同的验证
function passwordReviewCheck(password,passwordReview) {

    if (passwordReview == null || passwordReview == '') {
        $(".password-review-img").attr("src","../image/icon/info.svg");
        $(".password-review-info").text("请再次输入密码");
        return false;
    }else{
        if (passwordReview == password){
            $(".password-review-img").attr("src","../image/icon/right.svg");
            $(".password-review-info").text("");
            return true;
        }else {
            $(".password-review-img").attr("src", "../image/icon/wrong.svg");
            $(".password-review-info").text("两次输入的密码不一致");
            return false;
        }
    }


    return false;
}