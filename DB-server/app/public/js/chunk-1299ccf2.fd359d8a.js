(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1299ccf2"],{"18f7":function(t,r,s){"use strict";var c=s("4a41"),e=s.n(c);e.a},"4a41":function(t,r,s){},"4f46":function(t,r,s){"use strict";s.r(r);var c=function(){var t=this,r=t.$createElement,s=t._self._c||r;return s("div",{staticClass:"login-vue",style:t.bg},[t._m(0),s("div",{staticClass:"container"},[s("p",{staticClass:"title"},[t._v("WELCOME")]),s("div",{staticClass:"input-c"},[s("Input",{attrs:{prefix:"ios-contact",placeholder:"账号",clearable:""},on:{"on-blur":t.verifyAccount},model:{value:t.account,callback:function(r){t.account=r},expression:"account"}}),s("p",{staticClass:"error"},[t._v(t._s(t.accountError))])],1),s("div",{staticClass:"input-c"},[s("Input",{attrs:{type:"password",prefix:"md-lock",placeholder:"密码",clearable:""},on:{"on-blur":t.verifyPwd},model:{value:t.pwd,callback:function(r){t.pwd=r},expression:"pwd"}}),s("p",{staticClass:"error"},[t._v(t._s(t.pwdError))])],1),s("Button",{staticClass:"submit",attrs:{loading:t.isShowLoading,type:"primary"},on:{click:t.submit}},[t._v("登陆")])],1)])},e=[function(){var t=this,r=t.$createElement,s=t._self._c||r;return s("div",{staticClass:"nav"},[s("p",[t._v("电子书在线阅读平台")]),s("p",[t._v("用户端")])])}],n=s("eeb9");function o(t){return Object(n["a"])({url:"/api/v1/login",method:"post",withCredentials:!0,data:t})}var a={name:"Login",data:function(){return{account:"",pwd:"",accountError:"",pwdError:"",errorMsg:"",isShowLoading:!1,bg:{}}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},methods:{verifyAccount:function(t){""==this.account?this.accountError="请输入帐号":this.accountError=" "},verifyPwd:function(t){""==this.pwd?this.pwdError="请输入密码":this.pwdErro=" "},success:function(){this.$Message.success("登录成功！")},pswError:function(t){this.$Message.error(t)},submit:function(){var t=this,r={user_name:this.account,password:this.pwd};o(r).then(function(r){console.log(r),200===r.status?(t.success(),localStorage.setItem("isLogin","true"),t.$router.push({path:t.redirect||"/"})):400===r.status&&(void 0===r.msg?t.pswError("用户不存在！"):t.pswError(r.msg))}).catch(function(t){console.log(t)})}}},i=a,u=(s("18f7"),s("2877")),l=Object(u["a"])(i,c,e,!1,null,"31be7f76",null);r["default"]=l.exports}}]);