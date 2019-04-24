var PAGE_SIZE = 14;


/*初始化 电影信息*/
function init(){

    var movieId = getParamFromURI("movieId");

    if (movieId != null){
        // 发送 ajax 请求  得到数据 填充
        getMovieInfo(movieId);

    }else{
        // 否则 跳往错误页面
    }

}

// 得到电影基本信息
function getMovieInfo(movieId){
    $.ajax({
        type:"get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-details/"+movieId,
        success: function(data,status){
            pushData(data.data);
            star();
        },
        error: function(status){

        }
    });
}

// 填充页面数据
function pushData(item){
    $(".movie-name").append(item.movieName);
    $(".movie-ori-name").append(item.originalName);
    $(".movie-genres").append(item.genres);
    $(".countries-duration").append(item.countries + "/" + item.duration);
    $(".pubdates").append(item.pubdates);
    $("#image-src").attr("src",item.image);
    $(".score").append(item.rating);
    $(".movie-rating-count").append(format(item.ratingsCount));
    $(".scription").append(item.summary);



    // 填充 table  演员 导演 编剧

    var directorList = item.directorList;

    var writerList = item.writerList;

    var castList = item.castList;


    // 填充  导演表格
    var dirStr = new String();
    for (var dirNum = 0; dirNum < directorList.length;++dirNum){
        dirStr = dirStr + "<div id=\"director\" class=\"director\">\n" +
            "                                    <img src=\""+ directorList[dirNum].directorImage +"\">\n" +
            "                                    <p>"+directorList[dirNum].directorName+ "(" + directorList[dirNum].directorNameEn+")</p>\n" +
            "                                </div>\n";
    }
    $("#director-table-up").append(dirStr);

    // 填充 编剧表格
    var wriStr = new String();
    for (var wriNum = 0; wriNum < writerList.length;++wriNum){
        wriStr = wriStr + "<div id=\"writer\" class=\"writer\">\n" +
            "                                    <img src=\""+ writerList[wriNum].writerImage +"\">\n" +
            "                                    <p>"+ writerList[wriNum].writerName + "(" + writerList[wriNum].writerNameEn + ")</p>\n" +
            "                                </div>\n";
    }
    $("#writer-table-up").append(wriStr);

    // 填充 演员表格
    var actStr = new String();
    for (var actNum = 0; actNum < castList.length; ++actNum){

        // 每6个为一行
        if (actNum % 6 == 0){
            actStr = actStr + "<div class=\"actor-table-up\">\n";
        }

        actStr = actStr +
            "                                <div class=\"actor\">\n" +
            "                                    <img src=\""+ castList[actNum].actorImage +"\">\n" +
            "                                    <p>" + castList[actNum].actorName + "(" + castList[actNum].actorNameEn + ")</p>\n" +
            "                                </div>\n";

        if (actNum % 6 == 5){
            actStr = actStr + "</div>\n";
        }
    }
    actStr = actStr + "</tr>\n";
    $("#actor-content").append(actStr);
}

// 渲染星星
function star(){
    var scoreNum =$(".score").text();
    $(".star").raty({
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
}




function initCinema(current,pageSize){

    //  初始化过程  header 中被之前跳转的页面选择的areaId 被选中的状态 所以 直接在当前被选中的areaId 去查询电影
    var areaId = getSelectedAreaId();

    // 而且每次 观察到变化 都要去重新请求

    // 发送请求 根据地域id 查找影院

    $.ajax({
        type:"get",
        async: false,
        url: "http://127.0.0.1:8080/api/backend/cinema/find-cinema-by-areaId",
        data: {
            areaId: "110108",
            current: current,
            size: pageSize
        },
        success: function(data,status){
            // 填充 div
            pushCinemaList(data.data.records);
            pageComponent(current,pageSize,data.data.total,data.data.pages);
        }
    });

}


function pushCinemaList(itemList) {

    var str = new String();

    for (var i = 0; i < itemList.length;++i){

        str = str + "  <div class=\"cinema-item\">\n" +
            "\n" +
            "                <div class=\"cinema-info\">\n" +
            "                    <a class='cinema-name-a' href=\"javascript:void(0)\"><p class=\"cinema-name\">"+ itemList[i].cinemaName +"</p></a>\n" +
            "                    <p class=\"cinema-address\">地址："+ itemList[i].cinemaFullAddress +"</p>\n" +
            "                </div>\n" +
            "\n" +
            "                <div class=\"order-seat-model\">\n" +
            "\n" +
            "                   <a class=\"order-button\" href=\"javascript:void(0)\">选座购票</a>\n" +
            "\n" +
            "                </div>\n" +
            "\n" +
            "            </div>\n"

    }

    // 先清除
    $("#cinema-list").empty();
    $("#cinema-list").append(str);
}


/*分页组件*/
function pageComponent(currentPage,size,total,pages) {

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
                    "                <input type=\"button\" value=\""+ page +"\" name=\"\" onclick=\"initCinema('"+ page +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }
        }

        // 当前只有一页的情况下 没有下一页
        if (currentPage != pages){
            var next = parseInt(currentPage)+1;
            str = str + "<div class=\"next-page\">\n" +
                "                <input  type=\"button\" value=\"下一页\" name=\"下一页\" onclick=\"initCinema('"+ next +"','"+ PAGE_SIZE +"')\">\n" +
                "            </div>\n"
        }

    }

    else if (currentPage == pages){
        // 是否最后一页（无下一页）

        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"上一页\" onclick=\"initCinema('"+ pre +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";

        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\"" + i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"initCinema('"+ i +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }

        }
    }

    else{
        // 中间页
        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"\" onclick=\"initCinema('"+ pre +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";


        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"initCinema('"+ i +"','"+ PAGE_SIZE +"')\">\n" +
                    "            </div>\n";
            }

        }
        var next = parseInt(currentPage) + 1;
        str = str + "<div class=\"next-page\">\n" +
            "                <input type=\"button\" value=\"下一页\" name=\"\" onclick=\"initCinema('"+ next +"','"+ PAGE_SIZE +"')\">\n" +
            "            </div>\n";
    }

    $("#page-component").append(str);

}