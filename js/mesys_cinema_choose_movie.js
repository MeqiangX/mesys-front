


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
    lodeMovieArranges(6);

    // 填充轮播图
    swipperDataPush();

    // 渲染轮播图
    swipperRender();


}

/* 填充影院信息 */
function putCinemaInfo(item) {
    $("#image-src").attr("src",item.image); // 图片
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


/* 填充排片列表 */
function movieArrangeListPush() {


    // 根据电影id 以及影院id 查找对应的排片情况记录

    // 填充时间标签


    //  选择第一个


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
                }

            }
        },


    });
}

