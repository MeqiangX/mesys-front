
var index_tag = 0; // 首页

var starOrScoreNum = 0; // 渲染的star or score class num


// 首页初始化
function index_init(){

    // index_li
    $("#index_li").addClass("active"); //  首页为选中状态

}

function hotRankData(){
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-rank",
        data: {
            rankType : "0", // 榜单表名类型 看后端的 MovieRankEnum
            current: 1,
            size: 10  //分页取轮播图的个数 10个
        },
        success: function (data,status) {
            // 将data.total 设置给 number
            $("#hotRankNumber").append("(" + data.data.total + "部)");
            // 将data.records 这个数组取出 的  movieId movieName image rating 赋值给对应的item

            // 动态添加节点
            var str = new String();
            for (var i = 0;i < data.data.records.length;i++,starOrScoreNum++){
                var item = data.data.records[i];
                str = str + "<div class=\"swiper-slide\">\n" +
                    "                    <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                    "                    <img class=\"movieImage\" src= " + "\"" + item.image + "\">\n" +
                    "                    </a>\n" +
                    "                    <p class=\"movie-name\">"+ item.movieName + "</p>\n" +
                    "                    <div class=\"rankAndStar\">\n" +
                    "                    <div class=\"star\" id=\"star"+ starOrScoreNum + "\">\n" +
                    "                    </div>\n" +
                    "                    <span id=\"score"+ starOrScoreNum + "\" class=\"score\">"+ item.rating +"</span>\n" +
                    "                    </div>\n" +
                    "                    <input type=\"button\" class=\"order\" value=\"购票\" name=\"购票\">\n" +
                    "                    </div>\n";
            }

            $("#swiper-warpper").append(str);
            //渲染轮播图
            swipperRender();
        }
    });
}


function commingRankData(){
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-rank",
        data: {
            rankType : "1", // 榜单表名类型 看后端的 MovieRankEnum
            current: 1,
            size: 8  //分页取轮播图的个数 10个
        },
        success: function (data,status) {
            // 将data.total 设置给 number
            $("#comingRankNumber").append("(" + data.data.total + "部)");
            // 将data.records 这个数组取出 的  movieId movieName image rating 赋值给对应的item

            // 动态添加节点 因为添加一个tr 会自动补全 所以只能在tr 中
            var str = new String();
            for (var i = 0;i < data.data.records.length;i++,starOrScoreNum++){
                var item = data.data.records[i];

                if (i == 0 || i == 4){
                    str = str + "<tr>\n" +
                        "                            <td>\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\"" + item.image + "\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+ item.movieName +"</p>\n" +
                        "                                <div class=\"rankAndStar\">\n" +
                        "                                    <div class=\"star\" id=\"star"+ starOrScoreNum +"\">\n" +
                        "                                    </div>\n" +
                        "                                    <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+item.rating+"</span>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"comming-list-button-group\">\n" +
                        "                                    <input type=\"button\" value=\"预告片\" name=\"预告片\" class=\"comming-list-button-preView\"/>\n" +
                        "                                    <input type=\"button\" value=\"预售\" name=\"预售\" class=\"comming-list-button-prePurchase\"/>\n" +
                        "                                </div>\n" +
                        "                            </td>\n";
                }else if (i == 3 || i == 7){
                    str = str + "<td>\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+item.movieName+"</p>\n" +
                        "                                <div class=\"rankAndStar\">\n" +
                        "                                    <div class=\"star\" id=\"star"+ starOrScoreNum +"\">\n" +
                        "                                    </div>\n" +
                        "                                    <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+item.rating+"</span>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"comming-list-button-group\">\n" +
                        "                                    <input type=\"button\" value=\"预告片\" name=\"预告片\" class=\"comming-list-button-preView\"/>\n" +
                        "                                    <input type=\"button\" value=\"预售\" name=\"预售\" class=\"comming-list-button-prePurchase\"/>\n" +
                        "                                </div>\n" +
                        "                            </td>\n" +
                        "                        </tr>\n";
                }else {
                    str = str + "<td>\n" +
                        "                                <a href=\"" + "movie_detail.html?movieId="+ item.movieId  +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+item.movieName+ "</p>\n" +
                        "                                <div class=\"rankAndStar\">\n" +
                        "                                    <div class=\"star\" id=\"star"+ starOrScoreNum +"\">\n" +
                        "                                    </div>\n" +
                        "                                    <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+item.rating+"</span>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"comming-list-button-group\">\n" +
                        "                                    <input type=\"button\" value=\"预告片\" name=\"预告片\" class=\"comming-list-button-preView\"/>\n" +
                        "                                    <input type=\"button\" value=\"预售\" name=\"预售\" class=\"comming-list-button-prePurchase\"/>\n" +
                        "                                </div>\n" +
                        "                            </td>\n";
                }
            }
            // append
            $("#comming-list").append(str);
        }
    });
};

// 热播  7
function newRankData(){
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-rank",
        data: {
            rankType : "0", // 榜单表名类型 看后端的 MovieRankEnum
            orderColumn: "rating", // 排序字段
            orderType: "DESC",
            current: 1,
            size: 7  // top10 10个
        },
        success: function (data,status) {
            // 动态添加节点 因为添加一个tr 会自动补全 所以只能在tr 中
            var str = new String();
            for (var i = 0;i < data.data.records.length;i++,starOrScoreNum++){
                var item = data.data.records[i];
                if (i == 0){
                    str = str + " <tr>\n" +
                        "                            <td  class=\"hotRank-td-1\" colspan=\"2\">\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+ item.movieName +"</p>\n" +
                        "                                <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+ item.rating + "</span>\n" +
                        "                            </td>\n";

                }else if (i == 2 || i == 6){
                    str = str + "<td>\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+ item.movieName +"</p>\n" +
                        "                                <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+ item.rating +"</span>\n" +
                        "                            </td>\n" +
                        "                        </tr>\n";
                }else if (i == 3){
                    str = str + " <tr>\n" +
                        "                            <td>\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+ item.movieName +"</p>\n" +
                        "                                <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+ item.rating +"</span>\n" +
                        "                            </td>\n";
                }else{
                    str = str + " <td>\n" +
                        "                                <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                    <img class=\"movieImage\" src=\""+ item.image +"\" />\n" +
                        "                                </a>\n" +
                        "                                <p class=\"movie-name\">"+ item.movieName +"</p>\n" +
                        "                                <span id=\"score"+ starOrScoreNum +"\" class=\"score\">"+ item.rating +"</span>\n" +
                        "                            </td>\n";
                }
            }
            // append
            $("#hotRank-list-table").append(str);
        }
    });
}

// TOP 100 数据  取前10
function top100RankData(){
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-rank",
        data: {
            rankType : "4", // 榜单表名类型 看后端的 MovieRankEnum
            orderColumn: "rating", // 排序字段
            orderType: "DESC",
            current: 1,
            size: 10  // top10 10个
        },
        success: function (data,status) {
            // 动态添加节点 因为添加一个tr 会自动补全 所以只能在tr 中
            var str = new String();
            for (var i = 0;i < data.data.records.length;i++){
                var item = data.data.records[i];

                if (i == 0){
                    str = str + " <tr>\n" +
                        "                                    <td>\n" +
                        "                                        <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                            <div class=\"rank-item-1\" id=\"rank-item-1\">\n" +
                        "                                                <img src=\""+ item.image +"\">\n" +
                        "                                                <div id=\"rank-item-descrip-1\">\n" +
                        "                                                    <p class=\"rank-item-movie\">"+ item.movieName +"</p>\n" +
                        "                                                    <p class=\"rank-item-point\">"+ item.rating +"</p>\n" +
                        "                                                </div>\n" +
                        "                                            </div>\n" +
                        "                                        </a>\n" +
                        "                                    </td>\n" +
                        "                                </tr>\n";

                }else if (i == 1 || i == 2){
                    str = str + "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                            <div class=\"rank-item-2\">\n" +
                        "                                                <div class=\"rank-item-descrip\">\n" +
                        "                                                    <p class=\"rank-no-pre3\">"+ (i+1) +"</p>\n" +
                        "                                                    <p class=\"rank-item-movie\">"+ item.movieName +"</p>\n" +
                        "                                                    <p class=\"rank-item-point\">"+ item.rating +"</p>\n" +
                        "                                                </div>\n" +
                        "                                            </div>\n" +
                        "                                        </a>\n" +
                        "                                    </td>\n" +
                        "                                </tr>\n";
                }else {
                    str = str + "<tr>\n" +
                        "                                    <td>\n" +
                        "                                        <a href=\""+ "movie_detail.html?movieId="+ item.movieId +"\">\n" +
                        "                                            <div class=\"rank-item-2\">\n" +
                        "                                                <div class=\"rank-item-descrip\">\n" +
                        "                                                    <p class=\"rank-no-affer3\">"+ (i+1) +"</p>\n" +
                        "                                                    <p class=\"rank-item-movie\">"+ item.movieName +"</p>\n" +
                        "                                                    <p class=\"rank-item-point\">"+ item.rating +"</p>\n" +
                        "                                                </div>\n" +
                        "                                            </div>\n" +
                        "                                        </a>\n" +
                        "                                    </td>\n" +
                        "                                </tr>\n";
                }
            }
            // append
            $("#top100-rank-table").append(str);
        }
    });
}

function render(){
    starRender();
}

// star 渲染
function starRender(){
    var star = $(".star");
    for (var i = 0;i < star.length;i++){
        // 批量渲染
        // 评分star
        var scoreNum = document.getElementById("score"+i).innerText;
        $("#star"+i).raty({
            path: "../image/star",
            size: 18,
            number: 5, // 设置星星的数量
            // 评分赋初值
            // 如果 halfShow = true ，赋值支持小数点
            // score <= x.25 则忽略小数点
            // x.26 <= score <= x.75 则计为半颗星
            // score >= x.76 则计为一颗星
            score: scoreNum / 2, // 用js 得到当前的data 属性来渲染;

            // 只读
            cancel: true,
            readOnly : true,

            halfShow: true, // 半颗星允许
            round: {
                // 规则
                down: .26,
                full: .6,
                up: .76
            }
        });
    };
}


// 轮播图渲染
function swipperRender(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项
        autoplay: true, // 自动播放

        autoplay: {
            delay: 2000,//1秒切换一次
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },


        /*  effect: 'coverflow', // 开启3D旋转
          centeredSlides: true,
         /!* coverflowEffect: {
              rotate: 30,
              stretch: 10,
              depth: 60,
              modifier: 2,
              slideShadows : true
          },*!/*/

        slidesPerView: 5, // 设置成可同时展示多个
        spaceBetween: 10, // 设置图片之间的隔间
        slidesOffsetBefore: 10, // 设定和左边框的预设偏移量 单位px
        slidesOffsetBefore: 10, // 有边框偏移量
        centerInsufficientSlides: true, // 当轮播的图片小于 slidesPerView 时 居中显示
        on: {
            touchMove:  starRender()// 在滑动或者是自动播放下一帧的时候 重新渲染星星  因为swiper 的slider 触发时候 会添加节点
        }
    });
}

