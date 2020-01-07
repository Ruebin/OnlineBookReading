<template>
    <div class="login-vue" :style="bg">
        <div class="nav">
            <p>电子书在线阅读平台</p>
            <p>管理端</p>
        </div>
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="账号" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <!-- <p class="account"><span @click="register">注册账号</span>  |  <span @click="forgetPwd">忘记密码</span></p> -->
        </div>
    </div>
</template>

<script>
import { login } from '../../api/user/login'
export default {
  name: 'Login',
  data() {
    return {
      account: '',
      pwd: '',
      accountError: '',
      pwdError: '',
      errorMsg: '',
      isShowLoading: false,
      bg: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount(e) {
      if (this.account == '') {
        this.accountError = '请输入帐号'
      } else {
        this.accountError = ' '
      }
    },
    verifyPwd(e) {
      if (this.pwd == '') {
        this.pwdError = '请输入密码'
      } else {
        this.pwdErro = ' '
      }
    },
    // 登录成功的提示框
    success() {
      this.$Message.success('登录成功！');
    },
    // 密码错误的提示框
    pswError(msg) {
      this.$Message.error(msg);
    },
    // 点击登录后的处理
    submit() {
      const data = {
        admin_name: this.account,
        password: this.pwd
      };
      // localStorage.setItem('isLogin', 'true'); // 这行不能少，否则跳转不成功
      // this.$router.push({ path: this.redirect || '/' })
      // 登陆成功 设置用户信息,不用本地储存的方式,用vuex
      // console.log(this.$store.state.userData.userName)
      login(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.success();
          localStorage.setItem('isLogin', 'true'); // 这行不能少，否则跳转不成功
          this.$router.push({ path: this.redirect || '/' })
        } else if (res.status === 400) {
          if (res.msg === undefined) {
            this.pswError('用户不存在！')
          } else {
            this.pswError(res.msg)
          }
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.login-vue {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: url('../../assets/imgs/bg.png') center no-repeat;
    background-size:100% 100%;
    // background: linear-gradient(70deg, #003C71 ,#004b88,#006aba,#009FDf);
}
.login-vue .nav{
    position: relative;
    color: #000;
    bottom: 20px;
    p{
        font-size: 16px;
        letter-spacing: 10px;
        line-height: 30px;
        text-align: center;
        padding-left: 10px;
        font-weight: bold;
    }
}
.login-vue .container {
    background: rgba(255, 255, 255,.8);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
    // height: 350px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: rgb(245, 230, 230);
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 20px;
    margin-bottom: 20px;
    color: #000;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .sum {
    margin: auto;
    width: 300px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .account {
    margin-top: 30px;
    color: #000;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}

</style>
