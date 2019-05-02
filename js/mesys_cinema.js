
var cinema_tag = 0;

var PAGE_SIZE = 14;


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
            "                    <a class='cinema-name-a' href=\"cinema_choose_movie.html?cinemaId= "+ itemList[i].id + " &areaId=" + getSelectedAreaId() + "\"><p class=\"cinema-name\">"+ itemList[i].cinemaName +"</p></a>\n" +
            "                    <p class=\"cinema-address\">地址："+ itemList[i].cinemaFullAddress +"</p>\n" +
            "                </div>\n" +
            "\n" +
            "                <div class=\"order-seat-model\">\n" +
            "\n" +
            "                   <a class=\"order-button\" href=\"cinema_choose_movie.html?cinemaId= "+ itemList[i].id + " &areaId=" + getSelectedAreaId() + "\">选座购票</a>\n" +
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
