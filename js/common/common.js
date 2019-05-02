/*引入Header Footer部分公共代码*/

/**
 *  从cookies 中拿到 userId  从后端session 中 拿到登录用户 填充个人信息
 */

function getUserIdFromCookies() {
    var userId = $.cookie("userId");
    return userId;
}


//查看用户登录状态
function usersStatus() {

    var result;

    var userId = getUserIdFromCookies();

    console.log("当前userid -> " + userId);
    if (userId == null){
        result = null;
    }else{

        $.ajax({
            type:"get",
            async:false,
            url:"http://127.0.0.1:8084/api/uc/user/getloginUser-fromSession",
            xhrFields:{
                withCredentials: true
            },
            crossDomain: true,
            data:{
                userId:userId
            },
            success:function (data,status) {
                console
                    .log(data);
                if (data.success == true)
                    result = data.data;
            }
        });

    }

    return result;
}


// 个人中悬停下拉框的初始化
function initUserInfoCenter() {

    strNoLogin = new String();

    strLogin = new String();

    strNoLogin = "<a href=\"login.html\">登录</a>";

    strLogin = "<a href=\"mesys_user_info.html?option="+ 0 +"\">基本信息</a>\n" +
        "                        <a href=\"mesys_user_info.html?option="+ 1 +"\">我的订单</a>\n" +
        "                        <a href=\"javascript:void(0)\" onclick='logout()'>登出</a>\n";

    $(".drop-content").empty();

    // 去后端拿到登录状态  未登录 也设置为 登录

    //  已经登录了 --> 设置成三项 基本信息 我的订单 登出
    var user = usersStatus();



    if (user == null){
        $(".drop-content").append(strNoLogin);
    }else{
        $(".drop-content").append(strLogin);
    }

}

/*得到当前选中的地域id*/
function getSelectedAreaId() {
   return $("#area-select option:selected").val();
}

/*得到URI 中的 参数列表 */
function getAllParamsFromURI(){

    var url = window.location.search; // 获取url  .html 之后的string
    var result = []; // 返回对象数组
    if (url.indexOf("?") != -1){

        // 切割参数 为对象
       var paramList =  url.substr(url.indexOf("?") + 1);

       // 用&来切割
        var paramArr = paramList.split("&");

        for (var i = 0;i < paramArr.length;++i){
            var paramNameAndVal = paramArr[i].split("=");
            var param = new Object();
            param.paramName = paramNameAndVal[0];
            param.paramVal = paramNameAndVal[1];
            result.push(param);
        }

    }else{
        // 未携带参数
    }
    return result;
}


/*得到uri 中的 areaId*/
function getParamFromURI(paramname){
    var params = getAllParamsFromURI();

    if (params.length == 0){
        // 没有参数
        return null;
    }else{

        // 找到
        for (var i = 0; i < params.length;++i){
            if (paramname == params[i].paramName){
                return decodeURI(params[i].paramVal); // 中文乱码解决
            }
        }
        // 有参数 没找到
        return null;
    }

}

var oneReq = new Array; // 得到地区数组 只执行一次

function initSelectOption() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8081/api/common/init-select-area",
        success: function (data,status) {
            var itemList = data.data;
            var returnArray = new Array();
            for (var i = 0;i < itemList.length;++i) {
                var areaArray = itemList[i].areas;
                var childArray = new Array();
                if (null == areaArray){
                    continue;
                }
                /* console.log(areaArray);*/
                for (var j = 0; j < areaArray.length; ++j) {
                    var child = {
                        "id": areaArray[j].areaId,
                        "text": areaArray[j].area
                    }
                    childArray.push(child);
                }

                var item = {
                    "text": itemList[i].initials,
                    "children": childArray
                }

                returnArray.push(item);
            }
            /*console.log(returnArray);登录*/
            oneReq = returnArray;
        }
    });
}

/*初始化导航*/
function initNavi(pageTypeCode){
    //  设置 当前在哪个页面的navi - class - css   // 在页面跳转的时候 会带上这个区域id 如果没有则不考虑

    if (oneReq.length == 0){
        initSelectOption();
    }

    // header 加载
    $.ajax({
        type:"get",
        url:"./common/header.html",
        async:false,
        success:function(data){
            $("#header").html(data);
            $("#"+ pageTypeCode).addClass("active");

            var select2 = $('.singleSelect').select2({
                data: oneReq,

            });

            // 渲染完成之后 选择 之前选择的 areaId
            if (null != getParamFromURI("areaId")){
                console.log("当前uri中有上个页面带来的areaid : "+getParamFromURI("areaId"));
                select2.val(getParamFromURI("areaId")).trigger("change");
            }
        }
    });

    // footer 加载
    $.ajax({
        type:"get",
        url:"./common/footer.html",
        async:false,
        success:function(data){
            $("#footer").html(data);
        }
    });


    // 个人中心的 初始化
    initUserInfoCenter();

  /*  $(document).ready(function() {
        $('.singleSelect').select2();
    });*/
}



/*页面跳转锚*/
function pageAnchor(pageName,obj) {
    var thisObj = $(obj);
    thisObj.attr("href",pageName+"?areaId=" + getSelectedAreaId());
}

// 登出
function logout() {

    // 拿到userId
    var userId = getUserIdFromCookies();

    // 从cookie 中清除
    $.cookie("userId",null);
    // 后端session 中清除

    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8084/api/uc/user/logout",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        data:{
            userId:userId
        },
        success:function (data,status) {
            if (data.success == true){
                // 登出成功
                //window.location.reload(); // 相当于F5

                //返回到首页

                window.location.href="index.html";

            }
        }
    });

}


function commonSearchButton() {
    window.location.href = "movie_search.html?search="+$("#searchInput").val();
}