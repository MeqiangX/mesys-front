

var orderId = getParamFromURI("orderId");

function init() {
    steps1 = steps({
        el: "#steps1",
        center: true,
        data: [
            { title: "步骤1", description: "1.选择影片场次"},
            { title: "步骤2", description: "2.选择座位"},
            { title: "步骤3", description: "3.15分钟内完成支付" },
            { title: "步骤4", description: "4.取票观影" }
        ],
        props:{
            title: "title",
            description: "description",
            status: "status",
            icon:"icon",
            customHtml:"customHtml"
        },
        active: 2
    });


    var orderInfo = initOrderInfo();
    putOrderInfo(orderInfo);

    var second = initCountDown();
    countdown(second);

}

// 初始化 订单信息
function initOrderInfo(){

    var result = {};
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/order-detail/"+orderId,
        success:function (data,status) {
            if (data.success == true){
                result = data.data;
            }
        }
    });

    return result;
}


function putOrderInfo(orderInfo){

    console.log(orderInfo);


    $(".movie-name").text(orderInfo.movieName);
    $(".time").text(orderInfo.timeScopeStart);
    $(".cinema-name").text(orderInfo.cinemaName);
    $(".screen-name").text(orderInfo.screeningHallName);

    $(".total-price").text(orderInfo.price);
    var seatArray = orderInfo.seats;

    var str = new String();
    for (var i = 0;i < seatArray.length;++i){

        str = str + "<p class=\"seat-item"+ (i+1) +"\">"+ seatArray[i] +"</p>\n";

    }

    $(".seat").empty();
    $(".seat").append(str);


}

// 得到未支付订单的是剩余支付时间
function initCountDown(){

    var result = 0;
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/unpay-order-rest-time/"+orderId,
        success:function (data,status) {
            if (data.success == true){
              result = data.data;
            }
        }
    });

    return result;
}


//页面 刷新 开始计时
function countdown(second) {

    var flushTime = setInterval(function () {
        if (second >= 0){
            putCountDown(second);
            second--;
        }
    },1000);

    if (second < 0 ){
       // 当前订单未在指定时间内完成 已经取消 请重新购买
       alert("当前订单未在指定时间内完成 已经取消 请重新购买");
       clearInterval(flushTime); // 停止定时任务

        // 清除订单
        if  (clearTimeoutOrder(orderId)){

            alert("订单已取消，请重新购买");
            // 跳转回上一页
            window.history.back(-1);
        }
    }
}

// 填充时间
function putCountDown(second) {

    $(".minu").empty();
    $(".minu").text(parseInt(second / 60));

    $(".second").empty();
    $(".second").text(second % 60);
}

// 清除过期未支付订单
function clearTimeoutOrder(orderId) {

    var result = false;
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/timeout-order-check/"+orderId,
        success:function (data,status) {

            if (data.success == true){
                result = data.data;
            }

        }
    });

    return result;
}