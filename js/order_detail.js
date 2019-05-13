

// 订单详情

var orderId = getParamFromURI("orderId");

function init() {
    var orderInfo = initOrderInfo();
    putOrderInfo(orderInfo);

    if (orderInfo.status == 1){
        return ;
    }
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


    // 如果是已经支付的订单  不展示倒计时 显示已经支付 并且没有支付按钮
    if (orderInfo.status == 1){
        $(".ready-pay-label").text("已支付");
        $(".count-down").empty();
        $(".pay-button").text("已支付");
        $(".pay-button").attr("disabled",true);
    }


    $("#order-id-text").attr('value',orderInfo.orderId);
    $(".movie-name").text(orderInfo.movieName);
    $(".time").text(orderInfo.timeScopeStart);
    $(".cinema-name").text(orderInfo.cinemaName);
    $(".screen-name").text(orderInfo.screeningHallName);

    $(".cinema-addr").text(orderInfo.cinemaAddr);
    $(".cinema-phone").text(orderInfo.cinemaPhone);

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

// 填充时间
function putCountDown(second) {

    $(".minu").empty();
    $(".minu").text(parseInt(second / 60));

    $(".second").empty();
    $(".second").text(second % 60);
}

//页面 刷新 开始计时
function countdown(second) {
  // setInterval 是异步的



    var flushTime = setInterval(function () {
        if (second >= 0){
            putCountDown(second);
            second--;
        }else{
            // 当前订单未在指定时间内完成 已经取消 请重新购买
            alert("当前订单未在指定时间内完成 已经取消 请重新购买");
            // 返回后 清除订单
            if  (clearTimeoutOrder(orderId)){

                alert("订单已取消，请重新购买");
                // 跳转回上一页
                window.history.back(-1);
                window.location.reload();
            }
            clearInterval(flushTime); // 停止定时任务

        }
    },1000);

}

// 清除过期未支付订单
function clearTimeoutOrder(orderId) {

    alert("进入");

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