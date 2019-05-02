
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



        str = str + "\n<div class=\"order-item\">\n" +
            "\n" +
            "                            <div class=\"top-info\">\n" +
            "                                <p class=\"order-date\">" + dateFormat(new Date(orderList[i].createTime)) + "</p>\n" +
            "                                <p class=\"order-id-label\">订单号: <span class=\"order-id\">"+ orderList[i].orderId +"</span></p>\n" +
            "                                <a href=\"javascript:void(0)\" class=\"del-order\" name=\"\">取消订单</a>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"bottom-info\">\n" +
            "\n" +
            "                                <img class=\"movie-img\" src=\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551172384.jpg\">\n" +
            "                                <p class=\"movie-name\">"+ orderList[i].movieName +"</p>\n" +
            "                                <p class=\"cinema-name\">"+ orderList[i].cinemaName +"</p>\n" +
            "                                <p class=\"screen-p\"><span class=\"screen-name\">" + orderList[i].screeningHallName + " </span><span class=\"seats\">" + "  " + orderList[i].seats.join(',') + "</span></p>\n" +
            "                                <p class=\"time-start\">"+ orderList[i].timeScopeStart +"</p>\n" +
            "\n" +
            "                                <p class=\"price-label\"><span class=\"symbol\">￥</span><span>"+orderList[i].price+"</span></p>\n" +
            "                                <p class=\"order-status\">" + status + "</p>\n" +
            "\n" +
            "                                <button type=\"button\" class=\"pay\">付款</button>\n" +
            "                                <a href=\"order_detail.html?orderId="+ orderList[i].orderId +"\" class=\"order-detail\">查看详情</a>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n";

    }

    $(".order-list").empty();
    $(".order-list").append(str);
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
            "                        <input type=\"text\" class=\"nico-name-input\"/>\n" +
            "\n" +
            "                        <p class=\"sex-label\">性别：</p>\n" +
            "                        <div class=\"sex-radio\">\n" +
            "                            <input type=\"radio\"  name=\"sex\" value=\"0\"/>男\n" +
            "                            <input type=\"radio\"  name=\"sex\" value=\"1\"/>女\n" +
            "                        </div>\n" +
            "\n" +
            "                        <p class=\"borthday-label\">生日：</p>\n" +
            "                        <input type=\"date\" class=\"date-tool\">\n" +
            "\n" +
            "                        <p class=\"hobbies-label\">兴趣爱好：</p>\n" +
            "                        <input type=\"text\" class=\"hobbies-input\">\n" +
            "\n" +
            "                        <p class=\"signature-label\">个性签名：</p>\n" +
            "                        <input type=\"text\" class=\"signature-input\">\n" +
            "                    </div>\n" +
            "                </div>";


        $(".content-right-body").append(str);

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

        orders(3,1,10);
    }

}