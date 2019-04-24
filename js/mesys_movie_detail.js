var movie_tag = 0;


// 获取 链接传来的 MovieId 来初始化界面 只是接受一个值
function init(){

    var movieId = getParamFromURI("movieId");

    if (movieId != null){
        // 发送 ajax 请求  得到数据 填充
       getMovieInfo(movieId);

       // 预告片
        getMovieTrailer(movieId);

        // 花絮
        getMovieBloopers(movieId);

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


// 得到  预告片
function getMovieTrailer(movieId) {

    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-trailers/"+movieId,
        success: function(data,status){
            // 得到 预告片数组  填充div

            var itemList = data.data;

            console.log(itemList);

            var str = new String();

            for (var i = 0; i < itemList.length;++i){

                if (i % 6 == 0){
                    str = str + "<div id=\"trailers\" class=\"trailers\">\n";
                }

                str = str +
                    "                                     <div class=\"trailer\">\n" +
                    "                                         <a href=\""+ itemList[i].trailerResourceUrl +"\" target='_blank'>\n" +
                    "                                             <img src=\""+ itemList[i].trailerImage +"\">\n" +
                    "                                         </a>\n" +
                    "                                         <p>"+ itemList[i].trailerTitle +"</p>\n" +
                    "                                     </div>\n"

                if (i % 6 == 5){
                    str = str + "</div>\n";
                }
            }


            $("#trailer-content").append(str);

        },
        error: function(status){

        }
    });

}

// 电影花絮
function getMovieBloopers(movieId) {

    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/movie-bloopers/"+movieId,
        success: function(data,status){
            // 得到 花絮数组  填充div

            var itemList = data.data;

            console.log(itemList);

            var str = new String();

            for (var i = 0; i < itemList.length;++i){

                if (i % 6 == 0){
                    str = str + "<div class=\"bloopers\">\n";
                }

                str = str +
                    "                                     <div class=\"blooper\">\n" +
                    "                                         <a href=\""+ itemList[i].blooperResourceUrl +"\" target='_blank'>\n" +
                    "                                             <img src=\""+ itemList[i].blooperImage +"\">\n" +
                    "                                         </a>\n" +
                    "                                         <p>"+ itemList[i].blooperTitle +"</p>\n" +
                    "                                     </div>\n"

                if (i % 6 == 5){
                    str = str + "</div>\n";
                }
            }

            $("#blooper-content").append(str);

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



/* 优惠购票 跳转*/
function dumpToPurchase(obj) {
    var thisObj = $(obj);
    thisObj.attr("href","movie_choose_cinema.html?movieId=" +  getParamFromURI("movieId") + "&areaId=" +   getSelectedAreaId());
}