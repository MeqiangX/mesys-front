var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})

var app2 = new Vue(
    {
        el: '#app2',
        data: {
            message: '页面加载于' + new Date().toLocaleString()
        }
    }
)

var app3 = new Vue(
    {
        el: '#app-3',
        data: {
            seen: false
        }
    }
)

var app4 = new Vue(
    {
        el: '#app-4',
        data: {
            objs: [
                {
                    text: '学习Vue'
                },
                {
                    text: '学习Element'
                } //....多个obj  同时可以使用app4.objs.push({}) 来添加元素
            ]
        }
    }
)

var app5 = new Vue(
    {
        el: '#app-5',
        data: {
            message: "Hellp Vue.js"
        },
        methods:{
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('');
            }
        }
    }
);

// 定义组件 抽象
// 固定组件
Vue.component('component-item',{
    template: '<li>This is the component content</li>'
});



//动态组件
Vue.component('dynamic-component-item',{
    props: ['item'], //可以自定义属性  类似这里是说 这是一个数组 props 每个prop 名为 item
    template: '<li>{{ item.text }}</li>>'
})


var app6 = new Vue({
    el: '#app-6'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {id: 0, text: '水果'},
            {id: 1, text: '蔬菜'},
            {id: 2, text: '肉类'}
        ]
    }
})

app.message = "I have changed the data !"

app2.message = 'changed too !'



// 生命周期函数钩子

// created 钩子 用于在一个实例被创建之后 执行
var app8 = new Vue({
    el: '#app-8',
    data:{
        a: 1
    },
    beforeCreated:function(){
      console
          .log("创建之前调用的钩子函数---> beforeCreate")
    },
    created: function(){
        console
            .log("实例创建之后调用的钩子函数---> created:"+'a is ：' + this.a)
    },
    beforeMount:  function () {
        console
            .log("挂载在DOM之前调用的钩子函数---> beforeMount")
    },
    mounted: function () {
        console
            .log("挂载完之后调用的钩子函数--> mounted")
    },
    beforeUpdate: function () {
        console
            .log("修改数据之前调用的钩子函数---> beforeUpdate")
    },
    updated: function () {
        console("修改之后调用的钩子函数---> updated")
    },
    beforeDestory: function () {
        console
            .log("销毁实例前调用的钩子函数---> beforeDestory")
    },
    destoryed: function () {
        console.log("销毁实例之后调用的钩子函数--> destoryed --> over")
    }
})
/**
 * 还有其他的一些钩子 ： 如 beforeCreate (当前created) beforeMount(挂载之前) mounted(挂载完)
 * beforeUpdate(数据修改前) updated(数据修改) beforeDestoryed(销毁前) destoryed(销毁)
 */


//3 模板语法
/**
 * {{}} Mustach 双大括号 语法
 * 不但支持参数 也支持运算 语法 js 方法 布尔运算等
 * {{ number + 1 }}

 {{ ok ? 'YES' : 'NO' }}

 {{ message.split('').reverse().join('') }}
 * v-once  一次性赋值命令 不会再改变
 * v-html 要展示原生的html
 *
 *   指令
 *   v- 前置的特殊特性 当表达式的值改变时 将响应式作用于DOM
 *   <p v-if="seen">你现在能看到我了</p>
 *
 *   有些指令能接受一些参数： 如 v-bind
 *   <a v-bind:href='url'></a>
 *   href 是参数
 *   另一个是v-on 用于绑定事件
 *   <button v-on='todo'></button>
 *
 *
 *   动态参数
 *   <a v-bind:[attrbuteName]:'url'></a>
 *   这里如果有一个Vue实例的 data 是 attrbuteName : 'href' 那么就等效于：href:'url'
 *   同理可以对v-on 来动态添加事件名称
 *
 *
 *   修饰符 .
 *
 *   特定缩写： v-bind v-on
 *   v-bind : <a v-bind:href='url'></a>  ====> <a :href='url'></a>    v-bind --> :
 *   v-on: <a v-on:click='todo'></a>  ===> <a @click='todo'></a> v-on --> @
 *
 */


// 计算属性 替换复杂表达式
var vm = new Vue({
    el: '#example',
    data:{
        message: 'Hello Vue.js'
    },
    computed:{
        //计算属性的getter
        reverseMessage: function(){
            return this.message.split('')
                .reverse().join('');        }
    }
})


//监听属性
var jattr = new Vue({
    el: '#demo',
    data:{
        firstName: 'foo',
        lastName: 'bar',
        fullName: 'foo bar'
    },
    watch:{
        firstName: function(val){
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val;
        }
    },
    computed:{
        changedName: function(){
            return this.firstName + ' ' + this.lastName;
        }
    }
})


// 计算属性的setter
var ch = new Vue({
    el: '#sld',
    data:{
        message: 'Origianl Message'
    },
    computed:{
        changeMessage:{
            get: function () {
                return this.message.split('').reverse().join('')
            },
            set: function (newValue) {
                this.message = 'Message setter';
            }
        }
    }
})
