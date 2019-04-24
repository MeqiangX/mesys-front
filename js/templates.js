Vue.component('tems',{
    template: " <div class=\"rate\" :class=\"{'disabled':disabled}\">\n" +
    "        <i v-for=\"i in 5\" class=\"iconfont\" @mouseenter=\"disabled?'':curScore=i\" @mouseleave=\"disabled?'':curScore=''\" @click=\"disabled?'':setScore(i)\" :class=\"getClass(i)\">\n" +
    "            <i v-if=\"disabled&&i==Math.floor(score)+1\" class=\"iconfont icon-star\" :style=\"'width:'+width\"></i>\n" +
    "        </i>\n" +
    "        <span v-if=\"showText\" class=\"text\">{{curScore||score}}分</span>\n" +
    "    </div>"
});

var a = new Vue({
    el: '#app',
    template:  " <div class=\"rate\" :class=\"{'disabled':disabled}\">\n" +
    "        <i v-for=\"i in 5\" class=\"iconfont\" @mouseenter=\"disabled?'':curScore=i\" @mouseleave=\"disabled?'':curScore=''\" @click=\"disabled?'':setScore(i)\" :class=\"getClass(i)\">\n" +
    "            <i v-if=\"disabled&&i==Math.floor(score)+1\" class=\"iconfont icon-star\" :style=\"'width:'+width\"></i>\n" +
    "        </i>\n" +
    "        <span v-if=\"showText\" class=\"text\">{{curScore||score}}分</span>\n" +
    "    </div>"
})