


/*初始化影院信息*/
function initCinemaInfo(cinemaId){

    $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8080/api/backend/cinema/search-cinema-by-id",
        data: {
            cinemaId: cinemaId
        },
        success : function (data,status) {
            putCinemaInfo(data.data);
        }
    });

    // 填充影院
    lodeMovieArranges(cinemaId);

    // 填充轮播图
    swipperDataPush();

    // 渲染轮播图
    swipperRender();


}

/* 填充影院信息 */
function putCinemaInfo(item) {
    document.title = (item.cinemaName) + " - 明凯影院";
    $("#image-src").attr("src",item.image); // 图片
    $(".cinema-id-hidden").attr("value",item.id);
    $(".cinema-name").append(item.cinemaName);
    $(".cinema-addr").append(item.cinemaFullAddress);
    $(".cinema-phone").append("电话："+item.phone);

}


/*一次性加载 排片信息*/
var movieArrange = [];
function lodeMovieArranges(cinemaId) {

    $.ajax({
        type:"get",
        async: false,
        url:"http://localhost:8080/api/backend/cinema/cinema-under-movies",
        data:{
            cinemaId:cinemaId
        },
        success: function (data,status) {
            movieArrange = data.data;
        }
    });

}

// 轮播图
function swipperDataPush() {

    $(".swiper-wrapper").empty();
    var str = new String();

    console.log(movieArrange);
    for (var i = 0; i < movieArrange.length;++i){
        str = str + "<div class=\"swiper-slide\">\n" +
            "                    <img class=\"movie-image\" src=\""+ movieArrange[i].image  +"\" name=\"" + movieArrange[i].movieId + "\">\n" +
            "                </div>\n";
    }
    $(".swiper-wrapper").append(str);
}

/*填充基本信息*/
function baseInfoPush(movieId) {

    // 先清除
    $("#movie-short-message-model").empty();

    for (var i = 0; i < movieArrange.length;++i){
        if (movieArrange[i].movieId == movieId){

            // 填充
            var str = new String();

            str = str + " <div class=\"message-model-1\">\n" +
                "            <p class=\"movie-name\">"+ movieArrange[i].movieName +"</p>\n" +
                "            <p class=\"movie-rating\"  style='color: #FFA81F;'>"+ movieArrange[i].rating +"分</p>\n" +
                "        </div>\n" +
                "\n" +
                "        <div class=\"message-model-2\">\n" +
                "            <p class=\"duration\">时长：<span class=\"duration-text\">"+ movieArrange[i].duration +"</span></p>\n" +
                "            <p class=\"type\">类型：<span class=\"type-text\">"+ movieArrange[i].genres +"</span></p>\n";

            var castList = movieArrange[i].castList;
            var castArr = [];
            for (var j = 0;j < castList.length;++j){
                var cast = new String();
                castArr[j] = castList[j].actorName;
            }
            str  = str + " <p class=\"casts\">主演：<span class=\"casts-text\">"+  castArr.join(',') +"</span></p>\n" +
                "        </div>\n";

            $("#movie-short-message-model").append(str);
            return;
        }
    }

}


/* 填充排片时间标签列表 */
function movieArrangeListPush(movieId,date) {

    // 根据电影id 以及影院id 查找对应的排片情况记录 (不需要cinemaId 只要movieId,以及日期)

    //当没有日期的时候 (初始化) 默认选中第一个日期

    // 否则渲染参数日期的 排片

    var item = new Object();

    for (var i = 0;i < movieArrange.length;++i){
        if (movieArrange[i].movieId == movieId){
            item = movieArrange[i];
            break;
        }
    }

    if (item == null){
        return 1;
    }

    if (undefined == date){

        // 渲染第一个
        var arrangeList = item.movieArrangeList;

        var str = new String();

        for (var j = 0;j < arrangeList.length;++j){
            if (j == 0 && arrangeList.length == 1){
                str = str + " <ul>\n" +
                    "                    <li class=\"choosed\"><a href=\"javascript:void(0)\" class=\"choosed\" name=\"" + arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">" +  arrangeList[j].arrangeDate +"</a></li>" +
                    "</ul>\n";
            }else if (j == 0){
                str = str + "  <ul>\n" +
                    "                    <li class=\"choosed\"><a href=\"javascript:void(0)\" class=\"choosed\" name=\"" +  arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">"+  arrangeList[j].arrangeDate +"</a></li>\n";
            }else if (j == arrangeList.length-1){
                str = str + " <li class=\"no-choose\"><a class='no-choose' href=\"javascript:void(0)\" name=\"" +  arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">"+  arrangeList[j].arrangeDate +"</a></li>\n" +
                    "                </ul>\n";
            }else{
                str = str + "  <li class=\"no-choose\"><a href=\"javascript:void(0)\" class=\"no-choose\" name=\"" +  arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">"+  arrangeList[j].arrangeDate +"</a></li>\n";
            }
        }
    }else{
        // 渲染所给的 时间
        str = str + "<ul>\n";
        for (var j = 0;j < arrangeList.length;++j){
            if (arrangeList[j].arrangeDate == date){
                str = str + "<li class=\"choosed\"><a href=\"javascript:void(0)\" class=\"choosed\" name=\"" + arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">"+ arrangeList[j].arrangeDate +"</a></li>\n";
            }else{
                str = str + "<li class=\"no-choose\"><a href=\"javascript:void(0)\" class=\"no-choose\" name=\"" + arrangeList[j].arrangeDate + "\" onclick=\"renderArrangeList('"+ movieId +"','"+ arrangeList[j].arrangeDate +"')\">"+ arrangeList[j].arrangeDate +"</a></li>\n";
            }
        }
        str = str + "</ul>\n";
    }

    // 填充时间标签

    //  选择第一个


    $(".time-list-model").empty();
    $(".time-list-model").append(str);

    // 渲染后 触发一次渲染排片列表事件  在每个的时间标签上也绑定事件

    // 得到当前选中的 a  得到 name time
    renderArrangeList(movieId,$("a[class$='choosed']").attr("name"));
}


// 渲染排片列表
function renderArrangeList(movieId,date) {

    //渲染当天的时间排片列表
    var str = new String();

    var item = new Object();

    for (var i = 0;i < movieArrange.length;++i){
        if (movieArrange[i].movieId == movieId){
            item = movieArrange[i];
            break;
        }
    }

    if (item == null){
        return 1;
    }

    // 时间不可能传空的
    var arrangeList = item.movieArrangeList;

    console.log(arrangeList);

    for (var j = 0; j < arrangeList.length;++j){

        if (arrangeList[j].arrangeDate == date){

            if (j % 2 == 0){
                // 无背景色
                str = str + " <div class=\"table-body-row table-body-row-no-back\">\n" +
                    "\n" +
                    "                        <div class=\"body-col body-time-col\">\n" +
                    "\n" +
                    "                                <p class=\"start\">"+ arrangeList[j].timeScopeStart +"</p>\n" +
                    "                                <p class=\"end\">"+ arrangeList[j].timeScopeEnd +" 散场</p>\n" +
                    "\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-language-col\">" + arrangeList[j].language +"</div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-screen-col\">" + arrangeList[j].screeningHallName + "</div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-price-col\">\n" +
                    "                            <span>￥</span><span class=\"price-num\">"+ arrangeList[j].price +"</span>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-button-col\">\n" +
                    "                            <button type=\"button\" onclick=\"dumpToPurchase('"+ arrangeList[j].id +"')\">选座购票</button>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                    </div>\n";
            }else{

                // 背景色
                str = str + "<div class=\"table-body-row table-body-row-back\">\n" +
                    "\n" +
                    "                        <div class=\"body-col body-time-col\">\n" +
                    "\n" +
                    "                            <p class=\"start\">"+ arrangeList[j].timeScopeStart +"</p>\n" +
                    "                            <p class=\"end\">"+ arrangeList[j].timeScopeEnd +" 散场</p>\n" +
                    "\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-language-col\">" + arrangeList[j].language +"</div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-screen-col\">" + arrangeList[j].screeningHallName + "</div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-price-col\">\n" +
                    "                            <span>￥</span><span class=\"price-num\">"+ arrangeList[j].price +"</span>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"body-col body-button-col\">\n" +
                    "                            <button type=\"button\" onclick=\"dumpToPurchase('"+ arrangeList[j].id +"')\">选座购票</button>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                    </div>\n";
            }
        }
    }

    $(".table-body").empty();
    $(".table-body").append(str);

}

// 轮播图渲染
function swipperRender(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 水平切换选项

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: 8, // 设置成可同时展示多个
        spaceBetween: 10, // 设置图片之间的隔间
        slidesOffsetBefore: 10, // 设定和左边框的预设偏移量 单位px
        slidesOffsetBefore: 10, // 有边框偏移量
        on:{
            init:function () {

                // 初始化 给当前的第一块 加上点击事件
                    // 初始化 使得轮播图第一个的为选中状态  模拟点击事件 给第一个slider 加上swiper-slide-active
               var firstSlider =  $(".swiper-wrapper").find("div:first-child");
                firstSlider.addClass("chooseMovie");

                // 获取第一块的 movieId
                var movieId = firstSlider.find(".movie-image").attr("name");

                baseInfoPush(movieId);

                var cinemaId = $(".cinema-id-hidden").attr("value");

                // 但其实 初始化的时候已经 将当前影院的 排片记录 保存了 ，所有并不需要cinemaId

                movieArrangeListPush(movieId);

            },
            click: function (obj) {

                var parentDom = $(obj.toElement.parentElement); // 拿到当前点击的节点的 父节点 转化成jquery 对象

                var jqDom = $(obj.toElement); //  拿到当前点击的节点   转化成jquery 对象


                // 如果当前点击的不是 nect 或者 pre  就动态查询
                var className = jqDom.attr("class");
                if (className != "swiper-button-prev" && className != "swiper-button-next"){

                    // 先清除之前的 .choosedMovie class 的 class
                    $(".chooseMovie").removeClass("chooseMovie");

                    // 给父节点加上 class
                    parentDom.addClass("chooseMovie");

                    //拿到 img 的 name --> movieId  -->  刷新基本信息
                    var movieId = jqDom.attr("name");

                    baseInfoPush(movieId);

                    // 点击的时候 刷新时间tag ul

                    movieArrangeListPush(movieId);
                }

            }
        },


    });
}


//  选座购票 按钮 跳转到选座页面 带上排片id
function dumpToPurchase(id) {

    window.location.href = "mesys_choose_seat.html?arrangeId=" + id;

}

