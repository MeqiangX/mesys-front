## 问题记录

1. 前后端分离 得到后端的session时候的问题 

> 参考： https://blog.csdn.net/qq_29072049/article/details/83574221
https://segmentfault.com/a/1190000011811757

> 普通发送ajax请求

```javascript


$.ajax({
  type:"get",
  async:false,
  url:"",
  data:{
  },
  success:function(data,status){
  
  }
});

```

> 普通发送ajax 无法解决每次请求都带上cookies 因为里面有sessionId 为了保证每次请求的sessionId 都一致 才能拿到同一个session域 
在做登录认证的时候，会出现请求未登录的情况，查看请求头的时候发现并没有把登录时的cookie设置到第二次的请求头里面。
查看资料才知道跨域请求要想带上cookie，必须要在ajax请求里加上xhrFields: {withCredentials: true}, crossDomain: true。


2. 从URL上有中文参数的时候，乱码问题的解决

> http://www.w3school.com.cn/jsref/jsref_decodeURI.asp

```js

decodeURI(string);  JS 的函数  URL上的字母都是通过encodeURI()编码的， decodeURI函数可以对encodeURI()编码的URI进行编码

```


3. 方get/post ajax 请求联合后台@RequestBody 和 @RequestParam 

```js

// get + requestParam

// 如果是普通的对象 直接@RequestParam + get
 $.ajax({
        type:"get",
        async:false,
        url:"http://localhost:8082/api/portal/order/allow-purchased",
        data:{
            seats:seatIds // 上一步得到的坐席ids
        },
        success:function (data,status) {
            // 返回的是被预定的坐席id 如果都没有 则正常都可预订
            if (data.success == true){
                result = data.data;
            }
        }
    });
    
 // 如果是list (无论参数是什么)前端都不用修改 后端要改变
 
   @ApiOperation("订座")
    @GetMapping("seat-book")
    public R<Boolean> seatBooking(@RequestParam("seatIds[]") List<Integer> seatIds, @RequestParam Integer userId){
   
   @RequestParam("seatIds[]") 表明接收一个List类型的参数 
   

```

```js

post + requestBody

 @ApiOperation("通过坐席坐标和排片id来查询坐席id")
    @PostMapping("/seatId-by-coordinate")
    public R<List<Integer>> seatIdsByCoordinate(@RequestBody CoordinatePo coordinatePo){
    
    
    
   // js 
    post send
    
     coordinatePo.seats = seatObjList;
    coordinatePo.arrangeId = arrangeId;
    $.ajax({
        type:"post",  // 用ajax + @requestBody 组合 用json 数据格式传送 要指定 数据格式 和传输格式
        async:false,
        dataType:"json",
        contentType:"application/json",
        url:"http://localhost:8082/api/portal/order/seatId-by-coordinate",
        data: JSON.stringify(coordinatePo),
        success:function (data,status) {
            if (data.success = true){
                result = data.data;
            }
        }
    });
    
    // 关键加上了 
        dataType:"json",
        contentType:"application/json", 
        以及
        data: JSON.stringify(coordinatePo),
        
        因为RequestXXX的注解标识了 是用json 来传递

```
