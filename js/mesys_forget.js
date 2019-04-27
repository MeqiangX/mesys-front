

// 步骤条

// step 为下一个要前往的步骤 str 为要渲染的HTML arg为其他参数 这里只有第一步到第二部需要带上参数


// 初始化
var steps1;
function init() {

    steps1 = steps({
        el: "#steps1",
        center: true,
        data: [
            { title: "步骤1", description: "1.确认账号"},
            { title: "步骤2", description: "2.安全校验"},
            { title: "步骤3", description: "3.设置密码" },
            { title: "步骤4", description: "4.完成" }
        ],
        props:{
            title: "title",
            description: "description",
            status: "status",
            icon:"icon",
            customHtml:"customHtml"
        },
        active: 0
    });

    initFirstSetp(); // 第一步

    // 绑定按钮
    $(".first-next-step").on("click",function () {
        alert("绑定第一个按钮");
        // 做手机格式验证
        var phone = $(".input-account").val();
        if (!phoneRegCheck(phone)){
            alert("请输入正确的手机号码");
        }else{
            // 下一步
            initSecondStep(phone);
        }

    })




    $(".fail-step-success").on("click",function () {
        alert("修改成功，跳转登录");
    })
}

function nextStep() {
    if (steps1.getActive() < 4){
        steps1.setActive(steps1.getActive()+1);
    }
}


function initFirstSetp(){

    $(".step-content-inner").empty();

    var str = new String();

    str = "<p class=\"account-re-p\">请填写你要找回的账号</p>\n" +
        "        <input type=\"text\" class=\"input-account\" placeholder=\"手机/账号\">\n" +
        "        <button class=\"next-step first-next-step\" disabled>下一步</button>\n";

    $(".step-content-inner").append(str);

    //做失去焦点后的 文本校验
    $(".input-account").on("input propertychange",function () {

        var text = $(".input-account").val();

        if (text != '' && text != null){
            // 只有是next-step-has 的才能点击
            $(".first-next-step").addClass("next-step-has");
            $(".first-next-step").attr("disabled",false);
        }else{
            $(".first-next-step").removeClass("next-step-has");
            $(".first-next-step").attr("disabled",true);
        }
    })

}

// 第二步
function initSecondStep(phone) {

    nextStep();

    $(".step-content-inner").empty();

    var str = new String();

    str = "<p class=\"verification-phone\">为了您的账户安全，请先验证手机</p>\n" +
        "        <p class=\"phone-label\">手机号</p>\n" +
        "        <input type=\"text\" disabled value=\""+ phone +"\" class=\"phone-input\">\n" +
        "        <p class=\"code-label\">验证码</p>\n" +
        "        <input type=\"text\" class=\"code-input\">\n" +
        "        <a href=\"javascript:void(0)\" class=\"code-get\">获取验证码</a>\n" +
        "        <button class=\"next-step code-next-step\" disabled>下一步</button>\n";

    $(".step-content-inner").append(str);

    $(".code-get").on("click",function () {
        codeCount();
    })


    // 监听验证码Input的输入 < 6位 不能点击
    $(".code-input").on("input propertychange",function () {

        var code = $(".code-input").val();

        if (code.length == 6){
            // 只有是next-step-has 的才能点击
            $(".code-next-step").addClass("next-step-has");
            $(".code-next-step").attr("disabled",false);
        }else{
            // 只有是next-step-has 的才能点击
            $(".code-next-step").removeClass("next-step-has");
            $(".code-next-step").attr("disabled",true);
        }

    });

    $(".code-next-step").on("click",function () {
        alert("绑定第二个按钮");

        // 验证验证码的正确性
        var code = getCode($(".phone-input").val(),5);
        var inputCode = $(".code-input").val();

        alert(code + "   " + inputCode);

        if (code == inputCode){
            alert("code == " + code + "   input = " + inputCode)
            // 去第三步
            initThreeStep($(".phone-input").val());
        }else{
            alert("验证码输入错误");
        }

    });

}


// 第三步
function initThreeStep(phone) {
    nextStep();
    $(".step-content-inner").empty();

    var str = new String();

    str = "<p class=\"new-password-p\">请为你的账号 <b>"+ phone +"</b> 设置一个新的密码</p>\n" +
        "        <input type=\"text\" placeholder=\"设置8-32位(大写，小写字母，数字组合)\" class=\"new-password\">\n" +
        "        <button class=\"next-step three-next-step\">下一步</button>\n";

    $(".step-content-inner").append(str);

    //绑定按钮的监听 不为空 具体的判断在 提交的时候判断
    $(".new-password").on("input propertychange",function () {

        var newPwd = $(".new-password").val();

        if (newPwd != '' && newPwd != null){
            // 只有是next-step-has 的才能点击
            $(".three-next-step").addClass("next-step-has");
            $(".three-next-step").attr("disabled",false);
        }else{
            // 只有是next-step-has 的才能点击
            $(".three-next-step").removeClass("next-step-has");
            $(".three-next-step").attr("disabled",true);
        }

    });


    $(".three-next-step").on("click",function () {

        var newPwd = $(".new-password").val();

        // 检验密码的合法性
        var   re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        var result =  re.test(newPwd);

        if (result){
            // 发送修改密码请求
           var updateResult = updatePwd(phone,newPwd);
           if (updateResult){
               initFourStep();
           }else{
               alert("修改失败");
           }
        }else{
            alert("请输入8-32位包含大写，小写，数字组合的密码");
        }


    })

}


// 第四步
function initFourStep() {

    nextStep();

    $(".step-content-inner").empty();

    var str = new String();

    str = "<p class=\"success-p-1\"><b>恭喜您已经成功修改了登录密码</b></p>\n" +
        "        <p class=\"success-p-2\">您的登录密码已经重新设置，请妥善保管</p>\n" +
        "        <button class=\"next-step fail-step-success\" onclick=\"javascript:window.location.href='login.html'\">立即登录</button>\n";

    $(".step-content-inner").append(str);


}



// 发送验证码
function codeCount(){

    alert("发送验证码");

    // 发送请求

    // 设置为不可点击

    // 倒计时

    // 结束后可以继续点击


    // 发送验证码
    sendCode($(".phone-input").val(),5);

    // 设置为不可点击
    $(".code-get").css("cursor","default"); // 鼠标为default
    $(".code-get").attr("href","#");
    $(".code-get").removeAttr("onclick");

    // setInterval js函数可以指定时间 来完成事件 ms单位
    var time = 360;


    var second = setInterval(function () {
        if (time > 0){
            $(".code-get").text("重新获取("+time+"秒)");
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


// 修改密码请求
function updatePwd(phone,newPwd) {

    var result = false;
    $.ajax({
        type:"post",
        async:false,
        url:"http://localhost:8084/api/uc/user/update-pwd",
        data:{
            phone:phone,
            newPwd:newPwd
        },
        success: function (data,status) {
            if (data.success == true){
                result = true;
            }
        }
    });

    return result;
}


