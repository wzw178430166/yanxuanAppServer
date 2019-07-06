﻿const express=require('express');

const cors=require('cors');
const session = require("express-session");

//创建web服务器
var server=express();
server.listen(8090);

 //2.3:session
 server.use(session({
	secret:"128位字符串",
	resave:true,
	saveUninitialized:true
  }))
//npm i -save cors
server.use(cors({
	//origin:"http://127.0.0.1:5501"
	origin:"*"  //任意跨域
}))

//引入mysql模块
const mysql=require('mysql');
//创建连接池
var pool=mysql.createPool({
     host:'127.0.0.1',
	 port:'3306',
	 user:'root',
     password:'',
	 database:'wangyiapp',
	 connectionLimit:20 //设置连接池的大小
});



//引入第三方中间件body-parser 字符串查询中间件  post请求主体
const bodyParser=require('body-parser');
server.use(bodyParser.urlencoded({
  extended:false
}));

//引入index首页路由器
const index=require('../routes/indexproduct');
//引入用户路由器
const userRouter=require('../routes/user.js');
/*引入导航一级商品列表路由模块*/
const details=require("../routes/details");
/*引入商品详情路由模块*/
const product=require("../routes/product");
/*引入购物车路由模块*/
const Cart=require("../routes/cart");

//(使用内置中间件)把静态资源托管到指定目录
server.use(express.static('../public'));
//使用用户路由器 挂载： /user http://127.0.0.1:8080/user
server.use('/user',userRouter);

//使用首页商品路由器 挂载： /http://127.0.0.1:8080/index
server.use('/index',index);

/*使用导航一级商品列表路由模块*/
server.use("/product_list",details);

/*使用商品详情路由模块*/
server.use("/product",product);

/*使用商品详情路由模块*/
server.use("/shopping",Cart);
