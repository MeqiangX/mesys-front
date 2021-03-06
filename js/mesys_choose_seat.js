
// 选座  初始化界面

var sc; // seats 插件

function init() {

    // 检测用户是否登录 未登录返回到登录页面 登录 完成 回来 选座页面 记录下uri
    checkIsLoginToJump(window.location.href);

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
        active: 1
    });



    var arrangeId = getParamFromURI("arrangeId");
    console
        .log(arrangeId);
    var movieInfo = initMovie(arrangeId);
    var seatList = initSeats(arrangeId);


    // 填充数据 电影
    putMovieInfo(movieInfo);

    // 填充用户手机
    var user = usersStatus();
    $(".phone").text(user.phone);
    // 初始化座位
    initSeatData(seatList);

}


/* 初始化电影信息 */
function initMovie(arrangeId) {

    var movieInfo = null;

    $.ajax({
        type:"get",
        async: false,
        url:"http://localhost:8080/api/backend/cinema/arrange-details/"+arrangeId,
        success: function (data,status) {
            if (data.success == true){
                movieInfo = data.data;
            }
        }
    });

    return movieInfo;
}

// 填充电影数据
function putMovieInfo(movie){
    $(".movie-name").text(movie.movieName);
    $(".movie-img").attr("src",movie.image);
    $(".movie-type-val").text(movie.genres);
    $(".movie-duration-val").text(movie.duration);

    $(".cinema-info-val").text(movie.cinemaName);
    $(".screen-info-val").text(movie.screeningHallName);
    $(".language-info-val").text(movie.language);
    $(".arrange-info-val").text(movie.timeScopeStart);
    $(".price").text(movie.price);
}

// 初始化座位信息map
function initSeats(arrangeId){

    var seatList = [];

    $.ajax({
        type:"get",
        async: false,
        url:"http://localhost:8080/api/backend/cinema/saets-info/"+arrangeId,
        success: function (data,status) {
            if (data.success == true){
                seatList = data.data;
            }
        }
    });

    return seatList;
}


// 选座区域 初始化座位信息
function initSeatData(seatList) {

    // 填充座位信息


    // 已经出售了的座位数组1_2 1_4 这种字符数组
    var saledArray = new Array();

    // 所有座位的 字符数组
    var seatMap = new Array();


    // 遍历seatlist 因为已经排过序了， 所以直接遍历就行
    for (var i = 0; i < seatList.length;++i){

        var index = seatList[i].screeningHallX; // row num
        var list = seatList[i].seatRowList;
        var str = new  String();
        for (var j = 0; j < list.length;++j){

            str = str + "c";

            if (1 == list[j].isPurchased){
                // 已经被购买 unavailbel 不可购买
                saledArray.push(list[j].screeningHallX + "_" + list[j].screeningHallY);
            }
        }
        seatMap[index-1] = str;
    }

    console.log(saledArray);
    console
        .log(seatMap);


    var price = parseInt($(".price").text());

    var $cart = $('#seats_chose'), //座位区
        $tickects_num = $('#tickects_num'), //票数
        $total_price = $('#total_price'); //票价总额

    sc = $('#seat_area').seatCharts({
        /*map: [//座位结构图 a 代表座位; 下划线 "_" 代表过道
            'cccccccccc',
            'cccccccccc',
            '__________',
            'cccccccc__',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cc__cc__cc'
        ],*/
        map: seatMap,
        naming: {//设置行列等信息
            top: false, //不显示顶部横坐标（行）
            getLabel: function(character, row, column) { //返回座位信息
                return column;
            }
        },
        legend: {//定义图例
            node: $('#legend'),
            items: [
                ['c', 'available', '可选座'],
                ['c', 'unavailable', '已售出'],
            ]
        },
        click: function() {

            // 点击要做限制 如果没有选中 则要显示提示信息

            // 如果超过5个 则给出警告
            var selectdLength = sc.find('selected').length;

                if (this.status() == 'available') { //若为可选座状态，添加座位
                    //同时 购买按钮不可选
                    $(".btn").addClass("choose-btm");
                    $(".btn").attr("disabled",false);
                    if (selectdLength <  5){
                        //如果当前选中的数 小于5 则 可以加
                        $(".check-info").text("");
                        $(".prompt-info").text("");
                        $('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);

                        $tickects_num.text(sc.find('selected').length + 1); //统计选票数量
                        $total_price.text(getTotalPrice(sc,price) + price);//计算票价总金额

                        return 'selected';
                    }else{
                        alert("最多选择5个座位");
                        return "available";
                    }
                } else if (this.status() == 'selected') { //若为选中状态

                    $tickects_num.text(sc.find('selected').length - 1);//更新票数量
                    $total_price.text(getTotalPrice(sc,price) - price);//更新票价总金额
                    $('#cart-item-' + this.settings.id).remove();//删除已预订座位

                    // 如果当前只有一个selected 那么 删了这个 就没有了
                    if (selectdLength == 1){
                        $(".check-info").text("一次最多选五个座位");
                        $(".prompt-info").text("请点击左侧座位图选择座位");

                        //同时 购买按钮不可选
                        $(".btn").removeClass("choose-btm");
                        $(".btn").attr("disabled",true);
                    }

                    return 'available';
                } else if (this.status() == 'unavailable') { //若为已售出状态
                    return 'unavailable';
                } else {
                    return this.style();
                }

        }
    });
    //设置已售出的座位  saledArray
   /* sc.get(['1_3', '1_4', '4_4', '4_5', '4_6', '4_7', '4_8']).status('unavailable');*/
    sc.get(saledArray).status('unavailable');



}


// 计算总票价
function getTotalPrice(sc,price) { //计算票价总额
    var total = 0;
    sc.find('selected').each(function() {
        total += price;
    });
    return total;
}


/* 提交订单 */
function addOrder() {

    var result;

    var arrangeId = getParamFromURI("arrangeId");
    // 拿到userId
    var userId = getUserIdFromCookies();

    // 首先要查找当前要购买的数量 是否大于可买数量(5) 查找用户订单(当前arrangeId的)，包括支付和未支付的，看他们的 seatIds 的arrangeId

    // 如果超过 则弹框
    var purchasedNum = purchasedSeatNum(userId,arrangeId);

    // 正常


    //得到选中的座位号

    // class = selected 的 元素  得到id  row_col
    var choosedList = $(".selected");

    // 遍历 取得 id 用_分割 row col
    var seatObjList = new Array();
    for (var i = 0; i < choosedList.length;++i){

        var rowAndCol = choosedList[i].id.split("_");

        var seat = new Object();

        seat.row = rowAndCol[0];//row
        seat.col = rowAndCol[1];//col
        seatObjList.push(seat);
    }

    console.log(seatObjList);

    if (purchasedNum + seatObjList.length > 5){
        alert("同一场次下最多只能购买五张坐席");
        result = -1;
        return result;
    }

    //得到uri 中的 arrangeId  --> 根据arrangeId 找到对应的 screenseat 中的 座位号 对应的 座位ids

    // 看是否已经被购买了  如果被购买了 弹框
    var seatIds = seatToSeatId(seatObjList,arrangeId);



    var purchasedList = isAllowPurchase(seatIds);

    if (purchasedList == null){
        alert("请求失败");
        result = -2;
        return result;
    }
    if (purchasedList.length != 0){

        alert("存在被预定的坐席："+ purchasedList.split(","));
        result = -3;
        return result;
    }

    var orderId;

    //正常购买
    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/seat-book",
        data:{
            seatIds:seatIds,
            userId:userId
        },
        success:function (data,status) {
            if (data.success == true){
                orderId = data.data;
                result = orderId;
                alert("订购成功 订单号：" + orderId);

                //刷新页面  --> 跳转到支付页面
                window.location.reload();
                window.location.href = "pay_page.html?orderId="+result;
            }
        }
    });

    //  传入坐席的idList 以及userId 即可 返回订单id  跳转至支付页面
    return result;

}


// 查看当前用户在当前场次已购买的坐席数
function purchasedSeatNum(userId,arrangeId) {

    var result;

    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/bought-counts-arrangeId",
        data:{
            userId:userId,
            arrangeId:arrangeId
        },
        success:function (data,status) {
            if (data.success == true){
                result = data.data;
            }
        }
    });

    return result;

}

// 得到坐席对应的ids
function seatToSeatId(seatObjList,arrangeId) {

    var result;

    var coordinatePo = new Object();

    coordinatePo.seats = seatObjList;
    coordinatePo.arrangeId = arrangeId;
    $.ajax({
        type:"post",  // 用ajax + @requestBody 组合 用json 数据格式传送 要指定 数据格式 和传输格式
        async:false,
        dataType:"json",
        contentType:"application/json",
        url:"http://localhost:8082/api/portal/order/seatId-by-coordinate",
        data: JSON.stringify(coordinatePo),
        success:function (data,status) {
            if (data.success = true){
                result = data.data;
            }
        }
    });

    return result;
}


//当前要预定的坐席ids 是否可预订
function isAllowPurchase(seatIds){

    var result;
    console.log(seatIds);
    console.log(JSON.stringify(seatIds));
    $.ajax({
        type:"post",
        async:false,
        dataType:"json",
        contentType:"application/json",
        url:"http://localhost:8082/api/portal/order/allow-purchased",
        data:JSON.stringify(seatIds),
        success:function (data,status) {
            // 返回的是被预定的坐席id 如果都没有 则正常都可预订
            if (data.success == true){
                result = data.data;
            }
        }
    });

    return result;
}
