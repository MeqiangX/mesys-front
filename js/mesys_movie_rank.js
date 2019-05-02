
var rank_tag = 0;

var HOT_RANK = "0"; // 热播榜
var COMING_RANK = "1"; // 即将上映
var NEW_RANK = "2";  // 新片榜
var NORTH_RANK = "3";  // 北美票房榜
var TOP_100_RANK = "4"; // TOP100
var WEEK_RANK = "5";  // 周榜

var PAGE_SIZE = 7;
/*当前榜单*/

// 初始化榜单页面
function initRank() {

    //从路径上获取 rankType

    var rankType = getParamFromURI("rankType");

    // 没有就默认第一个 //这里一个问题 是 要模拟按键事件，但是如果是trigger 触发之后 它没有去执行href的跳转 所以看不见
    if (null == rankType){
        $("#week").trigger("click");
    }else{
        if (rankType == HOT_RANK){
            $("#hot").trigger("click");
        }else if (rankType == COMING_RANK){
            $("#comming").trigger("click");
        }else if (rankType == NEW_RANK){
            $("#new").trigger("click");
        }else if (rankType == NORTH_RANK){
            $("#north").trigger("click");
        }else if (rankType == TOP_100_RANK){
            $("#top").trigger("click");
        }else{
            $("#week").trigger("click");
        }
    }
    // 触发

}


function currentNavi(rankType,obj){
    // 得到 之前被选中的 导航
    var thisObj = $(obj); // 包装成Jq 对象

    var item = $(".choosed-rank");

    item.removeClass("choosed-rank");

    // 找到 id = tab_nav 下面被选中的导航  即 是class = choosed-rank
    //$("#tab-nav").find(item).removeClass("choosed-rank");
    // remove class

    // 当前的obj 加上class
   thisObj.addClass("choosed-rank");

   //  所以这个分页组件的初始化 应该是在点击了导航栏的时候   然后再点击下一页的话 再清空 创建

    // 所以点击了 导航栏的话 要去重新加载 数据

    return rankList(rankType,1,PAGE_SIZE);

    // 渲染完成后 跳转


}


/*榜单列表 */
function rankList(rankType,current,pageSize){

    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-rank",
        data: {
            current: current,
            size: pageSize,
            rankType: rankType,
            orderColumn: "rating",
            orderType: "DESC"
        },
        success: function (data,status) {
            console.log(data);
            if (rankType == WEEK_RANK){
                weekRank(data.data.current,data.data.records);
            }

            if (rankType == NORTH_RANK){
                norRank(data.data.current,data.data.records);
            }

            if (rankType == NEW_RANK){
                newRank(data.data.current,data.data.records);
            }

            if (rankType == HOT_RANK){
                hotRank(data.data.current,data.data.records);
            }

            if (rankType == TOP_100_RANK){
                top100Rank(data.data.current,data.data.records);
            }

            if (rankType == COMING_RANK){
                commingRank(data.data.current,data.data.records);
            }

            pageComponent(rankType,current,pageSize,data.data.pages);
        }
    });

    return true;

}


/*  周榜 */
function weekRank(currentPage,itemList) {



    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
            for (var j = 0; j < actorList.length;j++){
                actNames = actNames = actorList[j].actorName;
            }

            str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }
    // 先清除
    $("#week-rank-list").empty();
    $("#week-rank-list").append(str);

}


/*北美票房榜*/
function norRank(currentPage,itemList){
    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
        for (var j = 0; j < actorList.length;j++){
            actNames = actNames = actorList[j].actorName;
        }

        str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }
    $("#north-rank-list").empty();
    $("#north-rank-list").append(str);

}

/*新片榜*/
function newRank(currentPage,itemList){

    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
        for (var j = 0; j < actorList.length;j++){
            actNames = actNames = actorList[j].actorName;
        }

        str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }

    $("#new-rank-list").empty();
    $("#new-rank-list").append(str);

}


/*热映榜*/
function hotRank(currentPage,itemList){


    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
        for (var j = 0; j < actorList.length;j++){
            actNames = actNames = actorList[j].actorName;
        }

        str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }

    $("#hot-rank-list").empty();
    $("#hot-rank-list").append(str);

}


/*即将上映榜*/
function commingRank(currentPage,itemList){

    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
        for (var j = 0; j < actorList.length;j++){
            actNames = actNames = actorList[j].actorName;
        }

        str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }
    $("#comming-rank-list").empty();
    $("#comming-rank-list").append(str);

}


/*top100榜*/
function top100Rank(currentPage,itemList){

    var str = new String()

    for (var i = 0;i < itemList.length;++i){

        str = str + "<div class=\"week-rank-item\">\n" +
            "\n" +
            "                        <div class=\"rank-item-no\">\n" +
            "                            <p>"+ (PAGE_SIZE * (parseInt(currentPage) - 1) + parseInt(i) + 1) +"</p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"rank-item-img\">\n" +
            "                            <a href=\"" + "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><img src=\""+ itemList[i].image +"\"></a>\n" +
            "                        </div>\n";

        var actorList = itemList[i].castList;
        var actNames = new String();
        for (var j = 0; j < actorList.length;j++){
            actNames = actNames = actorList[j].actorName;
        }

        str = str +
            "                        <div class=\"rank-item-info\">\n" +
            "\n" +
            "                            <div class=\"rank-movie-info\">\n" +
            "                                <a href=\""+  "movie_detail.html?movieId=" + itemList[i].movieId + "\" target='_blank'><p class=\"rank-movie-name\">"+ itemList[i].movieName +"</p></a>\n" +
            "                                <p class=\"rank-movie-casts\">主演:" + actNames +"</p>\n" +
            "                                <p class=\"rank-movie-pubdate\">上映时间:" + itemList[i].pubdates +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"rank-movie-rating\">\n" +
            "                                <p class=\"rank-movie-rant\">"+ itemList[i].rating +"</p>\n" +
            "                            </div>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>";
    }
    $("#top100-rank-list").empty();
    $("#top100-rank-list").append(str);

}


/*分页组件*/
function pageComponent(rankType,currentPage,size,pages) {

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
                    "                <input type=\"button\" value=\""+ page +"\" name=\"\" onclick=\"rankList('"+ rankType +"','"+ page +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }
        }

        // 当前只有一页的情况下 没有下一页
        if (currentPage != pages){
            var next = parseInt(currentPage)+1;
            str = str + "<div class=\"next-page\">\n" +
                "                <input  type=\"button\" value=\"下一页\" name=\"下一页\" onclick=\"rankList('"+ rankType +"','"+ next +"','"+ PAGE_SIZE +"')\">\n" +
                "            </div>\n"
        }

    }

    else if (currentPage == pages){
        // 是否最后一页（无下一页）

        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"上一页\" onclick=\"rankList('"+ rankType +"','"+ pre +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";

        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\"" + i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"rankList('"+ rankType +"','"+ i +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }

        }
    }

    else{
        // 中间页
        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"\" onclick=\"rankList('"+ rankType +"','"+ pre +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";


        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"rankList('"+ rankType +"', '"+ i +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }

        }
        var next = parseInt(currentPage) + 1;
        str = str + "<div class=\"next-page\">\n" +
            "                <input type=\"button\" value=\"下一页\" name=\"\" onclick=\"rankList('"+ rankType +"','"+ next +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";
    }

    $("#page-component").append(str);

}
