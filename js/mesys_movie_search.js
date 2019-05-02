
// 电影搜索页 js

var PAGE_SIZE = 18; // 搜索页一页的页容：

function initSearch() {


    var searchVal = getParamFromURI("search");


    if (searchVal == null){
        search(1,PAGE_SIZE,'');
    }else{
        search(1,PAGE_SIZE,searchVal);
    }

}

// 绑定搜索事件 
function bindKeyPress() {
    
}


$(function () {
    $("#search-input").bind('keypress',function (event) {
        if (event.keyCode == "13"){
            // 当前是enter 事件
            // 得到当前的值 发送搜索请求
            search(1,PAGE_SIZE,$("#search-input").val());
        }
    })
})

// 搜索
function search(current,pageSize,search){

    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8082/api/portal/movie/search-movies",
        data: {
            current: current,
            size: pageSize,
            search: search
        },
        success: function (data,status) {
            alert("data :  " + data + "status : " + status);
            setResult(data.data.records);

            pageComponent(search,data.data.current,data.data.size,data.data.pages);

        }
    });

}


function setResult(itemList) {

    var str = new String();
    var length = itemList.length;

    if (length % 2 == 0){
        // 不出现一行中只有一个的情况

        for (var i = 0; i < length;++i){

            if (i % 2 == 0){
                str = str + " <div class=\"result-row\">\n" +
                    "\n" +
                    "            <div class=\"result-col\">\n" +
                    "\n" +
                    "                <div class=\"result-img\">\n" +
                    "                    <img src=\""+ itemList[i].image +"\">\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"result-movie-info\">\n" +
                    "                    <p class=\"result-name\">"+ itemList[i].movieName +"</p>\n" +
                    "                    <p class=\"result-original-name\">"+ itemList[i].originalName +"</p>\n" +
                    "                    <p class=\"result-rating\">"+ itemList[i].rating +"</p>\n" +
                    "                    <p class=\"result-genres\">"+ itemList[i].genres +"</p>\n" +
                    "                    <p class=\"result-pubdates\">"+ itemList[i].pubdates +"</p>\n" +
                    "                </div>\n" +
                    "\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"result-col-right\">\n" +
                    "                <div class=\"result-img\">\n" +
                    "                    <img src=\""+ itemList[i].image +"\">\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"result-movie-info\">\n" +
                    "                    <p class=\"result-name\">"+ itemList[i].movieName +"</p>\n" +
                    "                    <p class=\"result-original-name\">" + itemList[i].originalName + "</p>\n" +
                    "                    <p class=\"result-rating\">" + itemList[i].rating + "</p>\n" +
                    "                    <p class=\"result-genres\">"+ itemList[i].genres +"</p>\n" +
                    "                    <p class=\"result-pubdates\">" + itemList[i].pubdates + "</p>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "        </div>\n";
            }
        }

    }else{
        // 最后一个是一个

        for (var i = 0; i < length;++i){

            if (i % 2 == 0 && i != length-1){

                str = str + " <div class=\"result-row\">\n" +
                    "\n" +
                    "            <div class=\"result-col\">\n" +
                    "\n" +
                    "                <div class=\"result-img\">\n" +
                    "                    <img src=\""+ itemList[i].image +"\">\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"result-movie-info\">\n" +
                    "                    <p class=\"result-name\">"+itemList[i].movieName +"</p>\n" +
                    "                    <p class=\"result-original-name\">" + itemList[i].originalName + "</p>\n" +
                    "                    <p class=\"result-rating\">"+ itemList[i].rating +"</p>\n" +
                    "                    <p class=\"result-genres\">"+ itemList[i].genres +"</p>\n" +
                    "                    <p class=\"result-pubdates\">"+ itemList[i].pubdates +"</p>\n" +
                    "                </div>\n" +
                    "\n" +
                    "            </div>\n";

            }else if (i % 2 == 0 && i == length - 1){
                // 一个  直接结束
                str = str + " <div class=\"result-row\">\n" +
                    "\n" +
                    "            <div class=\"result-col\">\n" +
                    "\n" +
                    "                <div class=\"result-img\">\n" +
                    "                    <img src=\""+ itemList[i].image +"\">\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"result-movie-info\">\n" +
                    "                    <p class=\"result-name\">"+ itemList[i].movieName +"</p>\n" +
                    "                    <p class=\"result-original-name\">"+ itemList[i].originalName +"</p>\n" +
                    "                    <p class=\"result-rating\">"+ itemList[i].rating +"</p>\n" +
                    "                    <p class=\"result-genres\">"+ itemList[i].genres +"</p>\n" +
                    "                    <p class=\"result-pubdates\">" + itemList[i].pubdates + "</p>\n" +
                    "                </div>\n" +
                    "\n" +
                    "            </div>\n" +
                    "            </div>\n";

            }else{
                str = str + "<div class=\"result-col-right\">\n" +
                    "                <div class=\"result-img\">\n" +
                    "                    <img src=\""+ itemList[i].image +"\">\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <div class=\"result-movie-info\">\n" +
                    "                    <p class=\"result-name\">"+ itemList[i].movieName +"</p>\n" +
                    "                    <p class=\"result-original-name\">"+ itemList[i].originalName +"</p>\n" +
                    "                    <p class=\"result-rating\">"+ itemList[i].rating +"</p>\n" +
                    "                    <p class=\"result-genres\">"+ itemList[i].genres +"</p>\n" +
                    "                    <p class=\"result-pubdates\">"+ itemList[i].pubdates +"</p>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "\n" +
                    "        </div>\n";
            }

        }
    }

    $("#search-result-model").empty();
    $("#search-result-model").append(str);

}


/*分页组件*/
function pageComponent(search,currentPage,size,pages) {

    // 当前只够放下 10个page node   太多了会扩展 效果显示不好  应该控制

    // 每次刷新 都要清空内容
    $("#page-component").empty();

    if (pages == 0){
        return ;
    }

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
                    "                <input type=\"button\" value=\""+ page +"\" name=\"\" onclick=\"search('"+ page +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
                    "            </div>\n";
            }
        }

        // 当前只有一页的情况下 没有下一页
        if (currentPage != pages){
            var next = parseInt(currentPage)+1;
            str = str + "<div class=\"next-page\">\n" +
                "                <input  type=\"button\" value=\"下一页\" name=\"下一页\" onclick=\"search('"+ next +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
                "            </div>\n"
        }

    }

    else if (currentPage == pages){
        // 是否最后一页（无下一页）

        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"上一页\" onclick=\"search('"+ pre +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
            "            </div>\n";

        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\"" + i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"search('"+ i +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
                    "            </div>\n";
            }

        }
    }

    else{
        // 中间页
        var pre = parseInt(currentPage)-1;
        str = str + " <div class=\"pre-page\">\n" +
            "                <input type=\"button\" value=\"上一页\" name=\"\" onclick=\"search('"+ pre +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
            "            </div>\n";


        for (var i = 1;i < pages+1;++i){
            if (i == currentPage){
                str = str + "<div class=\"page-num\">\n" +
                    "                <input disabled style=\"background: #EF4238;color: #FFFFFF;cursor: default;border: none;\" type=\"button\" value=\""+ i +"\" name=\"\">\n" +
                    "            </div>\n";
            }else{
                str = str + "<div class=\"page-num\">\n" +
                    "                <input type=\"button\" value=\""+ i +"\" name=\"\" onclick=\"search('"+ i +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
                    "            </div>\n";
            }

        }
        var next = parseInt(currentPage) + 1;
        str = str + "<div class=\"next-page\">\n" +
            "                <input type=\"button\" value=\"下一页\" name=\"\" onclick=\"search('"+ next +"','"+ PAGE_SIZE +"','"+ search +"')\">\n" +
            "            </div>\n";
    }

    $("#page-component").append(str);

}
