

// 千分位工具函数

function format(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}


// 日期转换函数

function dateToStr(){

}


function strToDate(str,dateFormat) {
    return new Date(str).format(dateFormat);
}