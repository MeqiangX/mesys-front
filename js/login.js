
var errorV = new Vue({
    el:"#error",
    data:{
        errorBool: false
    }
});

var logoutV = new Vue({
    el:"#logout",
    data:{
        logoutBool: false
    }
})


var loginSub = new Vue({
    el:"#example-1",
    methods: {
        submit(){
            axios({
              method: 'get',
              url: 'localhost:8084/api/uc/role/role-test'
            }).then(function (res) {
             console.log(res);
             });
        }
    }});