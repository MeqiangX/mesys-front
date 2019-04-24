/*引入Header Footer部分公共代码*/


/*得到当前选中的地域id*/
function getSelectedAreaId() {
   return $("#area-select option:selected").val();
}

/*得到URI 中的 参数列表 */
function getAllParamsFromURI(){

    var url = window.location.search; // 获取url  .html 之后的string
    var result = []; // 返回对象数组
    if (url.indexOf("?") != -1){

        // 切割参数 为对象
       var paramList =  url.substr(url.indexOf("?") + 1);

       // 用&来切割
        var paramArr = paramList.split("&");

        for (var i = 0;i < paramArr.length;++i){
            var paramNameAndVal = paramArr[i].split("=");
            var param = new Object();
            param.paramName = paramNameAndVal[0];
            param.paramVal = paramNameAndVal[1];
            result.push(param);
        }

    }else{
        // 未携带参数
    }
    return result;
}


/*得到uri 中的 areaId*/
function getParamFromURI(paramname){
    var params = getAllParamsFromURI();

    if (params.length == 0){
        // 没有参数
        return null;
    }else{

        // 找到
        for (var i = 0; i < params.length;++i){
            if (paramname == params[i].paramName){
                return params[i].paramVal;
            }
        }
        // 有参数 没找到
        return null;
    }

}

var oneReq = new Array; // 得到地区数组 只执行一次

function initSelectOption() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://127.0.0.1:8081/api/common/init-select-area",
        success: function (data,status) {
            var itemList = data.data;
            var returnArray = new Array();
            for (var i = 0;i < itemList.length;++i) {
                var areaArray = itemList[i].areas;
                var childArray = new Array();
                if (null == areaArray){
                    continue;
                }
                /* console.log(areaArray);*/
                for (var j = 0; j < areaArray.length; ++j) {
                    var child = {
                        "id": areaArray[j].areaId,
                        "text": areaArray[j].area
                    }
                    childArray.push(child);
                }

                var item = {
                    "text": itemList[i].initials,
                    "children": childArray
                }

                returnArray.push(item);
            }
            /*console.log(returnArray);*/
            oneReq = returnArray;
        }
    });
}

/*初始化导航*/
function initNavi(pageTypeCode){
    //  设置 当前在哪个页面的navi - class - css   // 在页面跳转的时候 会带上这个区域id 如果没有则不考虑

    if (oneReq.length == 0){
        console.log(oneReq);
        initSelectOption();
        console.log(oneReq);
    }

    // header 加载
    $.ajax({
        type:"get",
        url:"./common/header.html",
        async:false,
        success:function(data){
            $("#header").html(data);
            $("#"+ pageTypeCode).addClass("active");

            var select2 = $('.singleSelect').select2({
                data: oneReq,

            });

            // 渲染完成之后 选择 之前选择的 areaId
            if (null != getParamFromURI("areaId")){
                console.log(getParamFromURI("areaId"));
                select2.val(getParamFromURI("areaId")).trigger("change");
            }

        }
    });

    // footer 加载
    $.ajax({
        type:"get",
        url:"./common/footer.html",
        async:false,
        success:function(data){
            $("#footer").html(data);
        }
    });

  /*  $(document).ready(function() {
        $('.singleSelect').select2();
    });*/
}



/*页面跳转锚*/
function pageAnchor(pageName,obj) {
    var thisObj = $(obj);
    thisObj.attr("href",pageName+"?areaId=" + getSelectedAreaId());
}
