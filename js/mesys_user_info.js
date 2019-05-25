
var pageSize = 6;
// 用户信息 + 订单信息

function init() {

    // 页面跳转会可能会携带参数  如果没有携带 则自动触发 个人信息

    // option = 0 默认 为个人信息

    // option = 1 为我的订单

    var option = getParamFromURI("option");

    if (null == option || option == 0){
        $(".nav-info").trigger("click");
    }else{
        $(".nav-order").trigger("click");
    }


    //orders(3,1,10);
}


// 用户所有订单 分页
function orders(userId,current,size) {

    $.ajax({
        type:"post",
        async:false,
        url:"http://localhost:8082/api/portal/order/user-orders",
        data:{
            current:current,
            size:size,
            userId:userId
        },
        success:function (data,status) {
            console
                .log(data);
            // 刷新列表
            putOrderList(data.data.records);
            // 刷新分页
            pageComponent(userId,current,size,data.data.total,data.data.pages);
        }
    });

}

// 填充订单列表
function putOrderList(orderList) {

    var str = new String();

    for (var i = 0;i < orderList.length;++i){

        var  status = 0 == orderList[i].status ? "未支付" : "已支付";

        if (orderList[i].status == 0){
            str = str + "\n<div class=\"order-item\">\n" +
                "\n" +
                "                            <div class=\"top-info\">\n" +
                "                                <p class=\"order-date\">" + dateFormat(new Date(orderList[i].createTime)) + "</p>\n" +
                "                                <p class=\"order-id-label\">订单号: <span class=\"order-id\">"+ orderList[i].orderId +"</span></p>\n" +
                "                                <a href=\"javascript:void(0)\" class=\"del-order\" name=\""+orderList[i].timeScopeStart+"\">取消订单</a>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div class=\"bottom-info\">\n" +
                "\n" +
                "                                <img class=\"movie-img\" src=\""+ orderList[i].movieImage +"\">\n" +
                "                                <p class=\"movie-name\">"+ orderList[i].movieName +"</p>\n" +
                "                                <p class=\"cinema-name\">"+ orderList[i].cinemaName +"</p>\n" +
                "                                <p class=\"screen-p\"><span class=\"screen-name\">" + orderList[i].screeningHallName + " </span><span class=\"seats\">" + "  " + orderList[i].seats.join(',') + "</span></p>\n" +
                "                                <p class=\"time-start\">"+ orderList[i].timeScopeStart +"</p>\n" +
                "\n" +
                "                                <p class=\"price-label\"><span class=\"symbol\">￥</span><span>"+orderList[i].price+"</span></p>\n" +
                "                                <p class=\"order-status\">" + status + "</p>\n" +
                "\n" +
                "                                <a  id='topay-a' name=\""+ orderList[i].orderId +"\"><button type=\"button\" class=\"pay\">付款</button></a>\n" +
                "                                <a href=\"order_detail.html?orderId="+ orderList[i].orderId +"\" class=\"order-detail\">查看详情</a>\n" +
                "                            </div>\n" +
                "\n" +
                "                        </div>\n";
        }else{
            str = str + "\n<div class=\"order-item\">\n" +
                "\n" +
                "                            <div class=\"top-info\">\n" +
                "                                <p class=\"order-date\">" + dateFormat(new Date(orderList[i].createTime)) + "</p>\n" +
                "                                <p class=\"order-id-label\">订单号: <span class=\"order-id\">"+ orderList[i].orderId +"</span></p>\n" +
                "                                <a href=\"javascript:void(0)\" class=\"del-order\" name=\""+ orderList[i].timeScopeStart +"\">取消订单</a>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div class=\"bottom-info\">\n" +
                "\n" +
                "                                <img class=\"movie-img\" src=\""+ orderList[i].movieImage +"\">\n" +
                "                                <p class=\"movie-name\">"+ orderList[i].movieName +"</p>\n" +
                "                                <p class=\"cinema-name\">"+ orderList[i].cinemaName +"</p>\n" +
                "                                <p class=\"screen-p\"><span class=\"screen-name\">" + orderList[i].screeningHallName + " </span><span class=\"seats\">" + "  " + orderList[i].seats.join(',') + "</span></p>\n" +
                "                                <p class=\"time-start\">"+ orderList[i].timeScopeStart +"</p>\n" +
                "\n" +
                "                                <p class=\"price-label\"><span class=\"symbol\">￥</span><span>"+orderList[i].price+"</span></p>\n" +
                "                                <p class=\"order-status\">" + status + "</p>\n" +
                "\n" +
                "                                <button type=\"button\" class=\"pay\" disabled>已支付</button>\n" +
                "                                <a href=\"order_detail.html?orderId="+ orderList[i].orderId +"\" class=\"order-detail\">查看详情</a>\n" +
                "                            </div>\n" +
                "\n" +
                "                        </div>\n";
        }

    }

    $(".order-list").empty();
    $(".order-list").append(str);

    // 渲染完后 绑定 去支付的 事件
    $("#del-order").on('click',function () {
        alert($(this).attr('name'));
        topay($(this).attr('name'));
    })


    // 渲染 取消订单的事件
    $(".del-order").on('click',function () {

        // 获得当前节点的前一个兄弟节点的第一个子节点 即订单号
        cancelOrder($(this).prev().find("span").text(),$(this).attr('name'));
    })
}

/*分页组件*/
function pageComponent(userId,currentPage,size,total,pages) {

    // 当前只够放下 10个page node   太多了会扩展 效果显示不好  应该控制

    // 每次刷新 都要清空内容
    $("#page-component").empty();

    var str = new String();

    if (currentPage == 1){
        // 是否是第一页（无上一页）
        for (var page = 1;page < pages+1;++page){
            if (page == currentPage){
                str = str + "<div  class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ page +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div  class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ page +"\" name=\"\" onclick=\"orders('"+ userId +"','"+ page +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }
        }

        // 当前只有一页的情况下 没有下一页
        if (currentPage != pages){
            var next = parseInt(currentPage)+1;
            str = str + "<div class=\"next-page\">\n" +
                "                <input  type=\"button\" value=\"下一页\" name=\"下一页\" onclick=\"orders('"+ userId +"','"+ next +"','"+ pageSize +"')\">\n" +
                "            </div>\n"
        }

    }

    else if (currentPage == pages){
        // 是否最后一页（无下一页）

        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"上一页\" onclick=\"orders('"+ userId +"','"+ pre +"','"+ pageSize +"')\">\n" +
            "            </div>\n";

        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\"" + i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"orders('"+ userId +"','"+ i +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }

        }
    }

    else{
        // 中间页
        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"\" onclick=\"orders('"+ userId +"','"+ pre +"','"+ pageSize +"')\">\n" +
            "            </div>\n";


        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"orders('"+ userId +"','"+ i +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }

        }
        var next = parseInt(currentPage) + 1;
        str = str + "<div class=\"next-page\">\n" +
            "                <input type=\"button\" value=\"下一页\" name=\"\" onclick=\"orders('"+ userId +"','"+ next +"','"+ pageSize +"')\">\n" +
            "            </div>\n";
    }

    $("#page-component").append(str);

}


// 导航点击 切换右侧内容 参数为option 0 基本信息 1 订单
function navTransform(option,obj) {

    // 首先要将obj 转换成 jquery对象 然后清除active 最后将obj 加上active

    // active 加上之后 将右侧内容切换


    $(".active").removeClass("active");

    var jqueryObj = $(obj);

    jqueryObj.addClass("active");


    if (0 == option) {

        //基本信息

        // 发送异步请求 得到用户信息
        var userInfo = getUserInfo();
        userInfo.nicoName = null == userInfo.nicoName ? "" : userInfo.nicoName;
        userInfo.hobbies = null == userInfo.hobbies ? "" : userInfo.hobbies;
        userInfo.signature = null == userInfo.signature ? "" : userInfo.signature;
        console.log(userInfo);

        $(".navi-title").text("基本信息");

        $(".content-right-body").empty();

        var str = new String();

        str = str + "  <div class=\"content-basic-info\">\n" +
            "\n" +
            "                    <!-- 头像 -->\n" +
            "                    <div class=\"left-image\">\n" +
            "\n" +
            "                    </div>\n" +
            "\n" +
            "                    <!-- 右边基本信息 -->\n" +
            "                    <div class=\"right-message\">\n" +
            "\n" +
            "                        <p class=\"nico-name-label\">昵称：</p>\n" +
            "                        <input type=\"text\" class=\"nico-name-input\" value=\"" + userInfo.nicoName + "\"/>\n" +
            "\n" +
            "                        <p class=\"sex-label\">性别：</p>\n" +
            "                        <div class=\"sex-radio\">\n" +
            "                            <input id=\"man\" type=\"radio\"  name=\"sex\" value=\"0\"/>男\n" +
            "                            <input id=\"women\"type=\"radio\"  name=\"sex\" value=\"1\"/>女\n" +
            "                        </div>\n" +
            "\n" +
            "                        <p class=\"borthday-label\">生日：</p>\n" +
            "                        <input type=\"date\" class=\"date-tool\" value=\"" + userInfo.birthday +"\">\n" +
            "\n" +
            "                        <p class=\"hobbies-label\">兴趣爱好：</p>\n" +
            "                        <input type=\"text\" class=\"hobbies-input\" value=\""+ userInfo.hobbies +"\">\n" +
            "\n" +
            "                        <p class=\"signature-label\">个性签名：</p>\n" +
            "                        <input type=\"text\" class=\"signature-input\" value=\"" + userInfo.signature + "\">\n" +
            "                    </div>\n" +
            "<div class=\"update-button\">\n" +
            "\n" +
            "                        <input type=\"button\" class=\"submit-update-button\" value='提交' onclick='updateInfo()'>\n" +
            "\n" +
            "                    </div>\n"+
            "                </div>";


        $(".content-right-body").append(str);

        // sex
        var sexId = 0 == userInfo.sex ? "man" : "women";
        $("#"+sexId).attr("checked", true);

    }else{

        // 订单
        $(".navi-title").text("我的订单");

        $(".content-right-body").empty();

        var str = new String();

        str = str + " <div class=\"content-order\">\n" +
            "\n" +
            "                    <div class=\"order-list\">\n" +
            "\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"order-page-model\">\n" +
            "                        <div id=\"page-component\" class=\"page-component\">\n" +
            "\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "\n" +
            "                </div>";

        $(".content-right-body").append(str);

        // 添加节点之后 触发一次 查询

        orders($.cookie('userId'),1,10);
    }

}

// 得到用户个人信息
function getUserInfo() {

    var userId = $.cookie('userId');

    console.log(userId);

    var result;
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8084/api/uc/user/userinfo-by-id",
        data:{
            userId:userId
        },
        success:function (data,status) {
            if (data.success == true){
                result = data.data;
            }
        }
    });

    return result;
}


// 跟新个人信息
function updateInfo() {

    var result = updateUserInfo();

    if (result == true){
        // 修改成功 刷新
        alert("修改成功");
        window.location.reload();
    }else{
        // 修改失败
        alert(result);
    }

}

function updateUserInfo() {
    var userInfoPo = new Object();
    userInfoPo.userId = $.cookie('userId');;
    userInfoPo.nicoName = $(".nico-name-input").val();
    userInfoPo.birthday = $(".date-tool").val();
    userInfoPo.sex = $("input[type='radio']:checked").val();;
    userInfoPo.hobbies = $(".hobbies-input").val();
    userInfoPo.signature = $(".signature-input").val();

    console.log(userInfoPo);

    var result;
    $.ajax({
        type:"post",
        async:false,
        url:"http://localhost:8084/api/uc/user/userinfo-update",
        dataType:"json",
        contentType:"application/json",
        data: JSON.stringify(userInfoPo),
        success:function (data,status) {
            if (data.success == true){
                result = true;
            }else{
                result = data.message;
            }
        }
    });


    return result;
}


// 取消订单 在放映前15分钟(2019年5月23日11:01:00 更改 只能去取消未开场的场次) 和当前时间比较 如果当前时间在放映15分钟前  可以执行
function cancelOrder(orderId,startTimeScope) {

    if (is15MinueBefore(startTimeScope,new Date())){
        alert("执行取消订单操作");
        var result = cancelRequest(orderId);
        if (result){
            // 成功 刷新页面
            alert("取消成功");
            window.location.reload();
        }else{
             // 失败
            alert(result);
        }
    }else{
        alert("该场次已经开始，无法取消");
    }

}


// 取消订单 发送请求
function cancelRequest(orderId) {
    var result;
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/cancel-order",
        data: {
            orderId:orderId
        },
        success:function (data,status) {
            if (data.success == true){
                result = data.data;
            }else{
                result = data.message;
            }
        }
    });
    return result;
}