
var search_type_geners = 0;
var search_type_area = 1;
var search_type_year = 2;

// 分页参数
var pageSize = 30;
var current = 1;

//  电影页 的 Js

// 初始化电影页
function initMovie() {

    var type = getParamFromURI("type");

    if (type == null){
        movieListResult(1,30);
    }else{
        reflushMovieList(0,$("#"+type));
    }

}


// 局部刷新 根据筛选项
function reflushMovieList(searchType,obj){

    var thisObj = $(obj); // 转成jQuery 对象

    var item = $(".choosed-type");

    if (search_type_geners == searchType){
        // find 函数 找到下面的所有子节点  直到class = choosed_geners  去除class

        console.log($("#type-items").find(item).removeClass("choosed-type"));

    }

    if (search_type_area == searchType){
        $("#area-items").find(item).removeClass("choosed-type");
    }

    if (search_type_year == searchType){
        $("#year-items").find(item).removeClass("choosed-type");
    }

    // 然后在当前节点 加上 class

   thisObj.addClass("choosed-type");
    //  清除 之前的 class  将当前的节点加上class

    // 将新的class 的 value  带入刷新列表

    // 刷新
    movieListResult(1,30);

}

//局部刷新 根据单选radio
function radioFlushMovies() {
    movieListResult(1,30);
}

// 填充页面的电影列表结果
function movieListResult(current,size){

    //alert("current =  " + current + "size = " + size);
    // 每次刷新的时候 都要清空 内容
    $("#movies-list-model").empty();

    // 三个筛选

    var genres = $("#type-items").find(".choosed-type").html();
    genres = genres == '全部' ? '' : genres;

    var countries = $("#area-items").find(".choosed-type").html();
    countries = countries == '全部' ? '' : countries;

    var year = $("#year-items").find(".choosed-type").html();
    if (year == '全部'){
        year = '';
    }
    else if (year == '2019以后'){
        year = '> 2019';
    }
    else if (year == '2000-2010'){
        year = 'between 2000 and 2010';
    }
    else if (year == '90年代'){
        year = 'between 1900 and 2000';
    }
    else if (year == '80年代'){
        year = 'between 1800 and 1900';
    }
    else if (year == '70年代'){
        year = 'between 1700 and 1800';
    }
    else if (year == '更早'){
        year = '< 1700';
    }else{
        year = '= ' + year;
    }


    // 排序
    var sortType = $("input[name=filter-type]:checked").val();

    if (sortType == 0){
        sortType = ''; // 热门  暂时没有 后续将看过的 和想看的人数 加上后在加上
    }
    if (sortType == 1){
        sortType = 'pubdates';
    }
    if (sortType == 2){
        sortType = 'rating';
    }

    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-page",
        data: {
            current: current,
            size: size,
            movieType: genres,
            area: countries,
            year: year,
            sortType: sortType
        },
        success: function (data,status) {
            var result = data.data;
            setMovie(result);
            pageComponent(result.current,result.size,result.total,result.pages);
        },
        error: function (status){
            alert("错误： " + status);
        }
    });

}



//  增加DOM
function setMovie(itemPage){

    var records = itemPage.records;

    var str = new String();

    for (var i = 0;i < records.length;++i){

        var rating = 0 == records[i].rating ? '暂无评分' : records[i].rating;


        if (i % 5 == 0){
            str = str + "<div class=\"movies-row\">\n";
        }

        str = str + "<div  class=\"movie\">\n" +
            "                    <a href=\""+ "movie_detail.html?movieId="+ records[i].movieId +"\"><img src='"+ records[i].image +"'></a>\n" +
            "                    <p class=\"movie-name\">"+ records[i].movieName +"</p>\n" +
            "                    <p class=\"movie-rating\">"+ rating +"</p>\n" +
            "                </div>\n";

        if (i % 5 == 4){
            str = str + "</div>\n";
        }

    }

    $("#movies-list-model").append(str);

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
                    "                <input type=\"button\" value=\""+ page +"\" name=\"\" onclick=\"movieListResult('"+ page +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }
        }

            // 当前只有一页的情况下 没有下一页
            if (currentPage != pages){
            var next = parseInt(currentPage)+1;
            str = str + "<div class=\"next-page\">\n" +
                "                <input  type=\"button\" value=\"下一页\" name=\"下一页\" onclick=\"movieListResult('"+ next +"','"+ pageSize +"')\">\n" +
                "            </div>\n"
        }

    }

    else if (currentPage == pages){
        // 是否最后一页（无下一页）

        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"上一页\" onclick=\"movieListResult('"+ pre +"','"+ pageSize +"')\">\n" +
            "            </div>\n";

        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\"" + i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"movieListResult('"+ i +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }

        }
    }

    else{
        // 中间页
        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"\" onclick=\"movieListResult('"+ pre +"','"+ pageSize +"')\">\n" +
            "            </div>\n";


        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"movieListResult('"+ i +"','"+ pageSize +"')\">\n" +
                    "            </div>\n";
            }

        }
             var next = parseInt(currentPage) + 1;
             str = str + "<div class=\"next-page\">\n" +
                 "                <input type=\"button\" value=\"下一页\" name=\"\" onclick=\"movieListResult('"+ next +"','"+ pageSize +"')\">\n" +
                 "            </div>\n";
    }

    $("#page-component").append(str);

}
