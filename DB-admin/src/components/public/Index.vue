<template>
  <div class="index-vue">
    <!-- 右侧部分 -->
    <section class="sec-right">
      <!-- 头部 -->
      <div class="top-c">
        <header>
          <div class="h-left">
            <img src="../../assets/imgs/booklogo.jpg" alt="">
            <div class="pfName">
              <p>电子书在线阅读系统</p>
            </div>
          </div>
          <div class="h-right">
            <!-- 消息 -->
            <div class="notice-c" @click="info" title="查看新消息">
              <div :class="{newMsg: hasNewMsg}"></div>
              <Icon type="ios-notifications-outline" />
            </div>
            <!-- 用户头像 -->
            <div class="user-img-c">
              <img src="@/assets/imgs/user.jpg" />
            </div>
            <!-- 下拉菜单 -->
            <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
              <div class="pointer">
                <span>{{userName}}</span>
                <Icon v-show="arrowDown" type="md-arrow-dropdown" />
                <Icon v-show="arrowUp" type="md-arrow-dropup" />
              </div>
              <DropdownMenu slot="list">
                <!-- name标识符 -->
                <!-- <DropdownItem name="1">修改密码</DropdownItem> -->
                <DropdownItem name="2">基本资料</DropdownItem>
                <DropdownItem divided name="3">退出登陆</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

      </div>
      <div class="box">
        <!-- 页面主体 -->
        <div class="main-content">
          <div class="view-c">
            <keep-alive :include="keepAliveData">
              <!-- 子页面 -->
              <router-view v-if="isShowRouter" />
            </keep-alive>
            <div class="loading-c" v-show="showLoading">
              <Spin size="large"></Spin>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { routesArr } from '../../router'
import { logout } from '../../api/user/logout.js'
export default {
  name: 'Index',
  data() {
    return {
      // 用于储存页面路径
      paths: {},
      // 当前显示页面
      currentPage: '',
      openMenus: [], // 要打开的菜单名字 name属性
      menuCache: [], // 缓存已经打开的菜单
      showLoading: false, // 是否显示loading
      hasNewMsg: true, // 是否有新消息
      isShowRouter: true,
      msgNum: '0', // 新消息条数
      // 标签栏         标签标题     路由名称
      // 数据格式 {text: '首页', name: 'home'}
      // 用于缓存打开的路由 在标签栏上展示
      tagsArry: [],
      arrowUp: false, // 用户详情向上箭头
      arrowDown: true, // 用户详情向下箭头
      isShowAsideTitle: true, // 是否展示侧边栏内容
      aside: null, // 侧边栏
      label: null, // 标签栏
      asideClassName: 'aside-big', // 控制侧边栏宽度变化
      asideArrowIcons: [], // 缓存侧边栏箭头图标 收缩时用
      // 面包屑
      crumbs: '主页',
      userName: '',
      userImg: ''
    };
  },
  created() {
    // 已经为ajax请求设置了loading 请求前自动调用 请求完成自动结束
    // 添加请求拦截器
    this.$axios.interceptors.request.use(
      config => {
        this.showLoading = true;
        // 在发送请求之前做些什么
        return config;
      },
      error => {
        this.showLoading = false;
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.$axios.interceptors.response.use(
      response => {
        this.showLoading = false;
        // 对响应数据做点什么
        return response;
      },
      error => {
        this.showLoading = false;
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  },
  mounted() {
    // 第一个标签
    const name = this.$route.name;
    this.currentPage = name;
    this.tagsArry.push({
      text: this.nameToTitle[name],
      name: name
    });
    if (this.$route.name === 'introduction' && this.$store.state.course.course_id === 0) {
      this.$router.replace('/course')
      this.tagsArry.shift();
    }
    if (this.$route.name === 'learning' && this.$store.state.course.project_id === 0) {
      this.$router.replace('/course')
      this.tagsArry.shift();
    }
    // 设置用户信息
    this.userName = localStorage.userName;
    this.userImg = localStorage.userImage;

    this.aside = document.querySelector('.aside');
    this.label = document.querySelector('.ul-c')
    this.asideArrowIcons = document.querySelectorAll(
      'aside .ivu-icon-ios-arrow-down'
    );
    let w = document.documentElement.clientWidth || document.body.clientWidth;

    window.onresize = () => {
      // 可视窗口宽度太小 自动收缩侧边栏
      if (
        w < 1200 &&
        this.isShowAsideTitle &&
        w > (document.documentElement.clientWidth || document.body.clientWidth)
      ) {
        this.shrinkAside();
      }
      w = document.documentElement.clientWidth || document.body.clientWidth;
    };
  },
  watch: {
    $route(to) {
      const name = to.name;
      this.currentPage = name;
      if (name == 'error') {
        this.crumbs = '404';
        return;
      }
      if (to.name === 'introduction' && this.$store.state.course.course_id === 0) {
        this.$router.replace('/course')
      }
      if (!this.keepAliveData.includes(name)) {
        // 如果标签超过8个 则将第一个标签删除
        if (this.tagsArry.length == 8) {
          this.tagsArry.shift();
        }
        this.tagsArry.push({ name, text: this.nameToTitle[name] });
      }

      setTimeout(() => {
        this.crumbs = this.paths[name];
      }, 0);
    },
    /**
     * 监听是否为教学界面
     */
    getIsLearningPage(newVal) {
      if (newVal === true) {
        document.querySelector('.top-c').style.display = 'none';
        document.querySelector('.mask').style.display = 'none';
        document.querySelector('.aside').style.display = 'none';
        document.querySelector('.main-content').style.padding = '0';
        document.querySelector('.view-c').style.padding = '0';
      } else {
        document.querySelector('.top-c').style.display = 'block';
        document.querySelector('.mask').style.display = 'block';
        document.querySelector('.aside').style.display = 'block';
        document.querySelector('.main-content').style.padding = '0.625rem 0.75rem';
        document.querySelector('.view-c').style.padding = '0.3125rem';
      }
    }
  },
  computed: {
    // 菜单栏
    menuItems() {
      return this.$store.state.menuItems;
    },
    // 需要缓存的路由
    keepAliveData() {
      return this.tagsArry.map(item => item.name);
    },
    /**
     * 用于监听是否为教学界面
     */
    getIsLearningPage() {
      return this.$store.state.isLearningPage;
    },
    // 由于iView的导航菜单比较坑 只能设定一个name参数
    // 所以需要在这定义组件名称和标签栏标题的映射表 有多少个页面就有多少个映射条数
    nameToTitle() {
      const obj = {};
      routesArr.forEach(e => {
        this.processNameToTitle(obj, e);
      });
      return obj;
    }
  },
  methods: {
    // 弹框
    Error() {
      this.$Message.error('注销失败!');
    },
    // 判断当前标签页是否激活状态
    isActive(name) {
      return this.$route.name === name;
    },
    // 跳转页面 路由名称和参数
    gotoPage(name, params) {
      this.currentPage = name;
      this.crumbs = this.paths[name];
      this.$router.replace({ name, params });

      if (!this.keepAliveData.includes(name)) {
        // 如果标签超过8个 则将第一个标签删除
        if (this.tagsArry.length == 8) {
          this.tagsArry.shift();
        }
        this.tagsArry.push({ name, text: this.nameToTitle[name] });
      }
    },
    // 用户操作
    userOperate(name) {
      switch (name) {
        case '1':
          // 修改密码
          this.gotoPage('password');
          break;
        case '2':
          // 基本资料
          this.gotoPage('userinfo');
          break;
        case '3':
          // 退出登陆 清除用户资料
          logout().then(res => {
            console.log(res);
            if (res.status === 200) {
              localStorage.setItem('isLogin', 'false');
              localStorage.setItem('userImg', '');
              localStorage.setItem('userName', '');
              // 重设路由
              this.$router.replace({ name: 'login' });
              this.$Message.success('注销成功！');
            }
          })

          break;
      }
    },
    // 控制用户三角箭头显示状态
    showArrow(flag) {
      this.arrowUp = flag;
      this.arrowDown = !flag;
    },
    // 判断
    isShrinkAside() {
      this.isShowAsideTitle ? this.shrinkAside() : this.expandAside();
    },
    // 收缩
    shrinkAside() {
      this.asideArrowIcons.forEach(e => {
        e.style.display = 'none'
      })
      this.isShowAsideTitle = false
      this.openMenus = []
      this.$nextTick(() => {
        this.$refs.asideMenu.updateOpened()
      })
      setTimeout(() => {
        this.asideClassName = ''
        this.aside.style.width = '5rem';
        this.label.style.margin = '0.125rem 0 0 4.375rem';
      }, 0)
    },
    // 展开
    expandAside() {
      setTimeout(() => {
        this.isShowAsideTitle = true;
        this.asideArrowIcons.forEach(e => {
          e.style.display = 'block';
        });
        this.openMenus = this.menuCache;
        this.$nextTick(() => {
          this.$refs.asideMenu.updateOpened();
        });
      }, 200);
      this.asideClassName = 'aside-big';
      this.aside.style.width = '11.25rem';
      this.label.style.margin = '0.125rem 0 0 10rem';
    },
    // 刷新当前标签页
    reloadPage() {
      const name = this.$route.name;
      const index = this.keepAliveData.indexOf(name);
      this.$nextTick(() => {
        if (this.tagsArry.length) {
          this.isShowRouter = false;
          this.tagsArry.splice(index, 1);
          this.$nextTick(() => {
            this.tagsArry.splice(index, 0, {
              name,
              text: this.nameToTitle[name]
            });
            this.gotoPage(name);
            this.isShowRouter = true;
          });
        } else {
          this.isShowRouter = false;
          this.$nextTick(() => {
            this.tagsArry.push({ name, text: this.nameToTitle[name] });
            this.gotoPage(name);
            this.isShowRouter = true;
          });
        }
      });
    },
    // 关闭单个标签
    closeTag(i) {
      const name = this.tagsArry[i].name;
      this.tagsArry.splice(i, 1);
      event.stopPropagation();
      // 如果关闭的是当前标签 则激活前一个标签
      // 如果关闭的是第一个标签 则激活后一个标签
      if (this.tagsArry.length) {
        if (this.isActive(name)) {
          if (i != 0) {
            this.gotoPage(this.tagsArry[i - 1].name);
          } else {
            this.gotoPage(this.tagsArry[i].name);
          }
        }
      } else {
        // 如果没有标签则跳往首页
        if (name != 'home') {
          this.gotoPage('home');
        } else {
          this.reloadPage();
        }
      }
    },
    // 根据路由名称关闭页面
    closeName(name) {
      for (let i = 0, len = this.tagsArry.length; i < len; i++) {
        if (this.tagsArry[i].name == name) {
          this.closeTag(i);
          break;
        }
      }
    },
    // 批量关闭标签
    closeTags(flag) {
      if (flag == 1) {
        // 关闭其他标签
        this.tagsArry = [];
        this.gotoPage(this.$route.name);
      } else {
        // 关闭所有标签
        this.tagsArry = [];
        this.gotoPage('home');
        this.reloadPage();
      }
    },
    // 激活标签
    activeTag(i) {
      this.gotoPage(this.tagsArry[i].name);
    },
    // 消息通知
    info() {
      const self = this;
      this.$Notice.info({
        title: `您有${this.msgNum}条消息`,
        render(h) {
          return h(
            'Button',
            {
              attrs: {
                type: 'info',
                size: 'small'
              },
              on: {
                click() {
                  // 点击查看跳转到消息页
                  self.gotoPage('msg');
                  (self.hasNewMsg = false), (self.msgNum = 0);
                }
              }
            },
            ['点击查看']
          );
        }
      });
    },
    // 菜单栏改变事件
    menuChange(data) {
      this.menuCache = data;
    },
    processNameToTitle(obj, data, text) {
      if (data.name) {
        obj[data.name] = data.text;
        this.paths[data.name] = text ? `${text} / ${data.text}` : data.text;
      }
      if (data.children) {
        data.children.forEach(e => {
          this.processNameToTitle(
            obj,
            e,
            text ? `${text} / ${data.text}` : data.text
          );
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.index-vue {
  height: 100%;
  display: flex;
  justify-content: space-between;
  color: #666;
}
.logo-c {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 20px 0;
  justify-content: center;
}
.logo {
  width: 40px;
  margin-right: 10px;
}
.box {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    .aside{
      width: 180px;
      min-width: 50px;
      height: 110%;
      margin-top: -36px;
      transition: width 0.5s;
      .ivu-menu {height: 100%;}
    }
  }

/* 主体页面 */
.sec-right {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
}
/* 主体页面头部 */
.top-c {
  background: rgba(230, 230, 230, 0.5);
  width: 100%;
}
header {
  height: 50px;
  border-bottom: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
  padding-left: 10px;
  font-size: 14px;
  color: white;
  background: linear-gradient(left,#003C71 , #009FDf);
}
header .ivu-icon {
  font-size: 24px;
}
.refresh-c {
  margin: 0 30px;
  cursor: pointer;
}
.h-right {
  display: flex;
  align-items: center;
}
.h-left {
  display: flex;
  align-items: center;
  img{
    width: 140px;
    height: 44px;
  }
  .pfName{
    padding-left: 20px;
    p:first-child{
      font-weight: bold;
      font-size: 16px;
    }
  }
}
.user-img-c img {
  width: 100%;
}
.notice-c {
  cursor: pointer;
  position: relative;
}
.newMsg {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff5722;
  right: 0;
  top: 0;
}
.user-img-c {
  width: 34px;
  height: 34px;
  background: #ddd;
  border-radius: 50%;
  margin: 0 40px;
  overflow: hidden;
}
.tag-options {
  cursor: pointer;
  position: relative;
}
.div-tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.div-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  height: 34px;
  width: 160px;
  font-size: 18px;
}
/* 标签栏 */
.ul-c {
  height: 34px;
  margin: 2px 0 0 160px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
  width: calc(100% - 160px);
  transition: margin 0.5s;
}
.ul-c li {
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  height: 24px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px 5px 2px 3px;
  border: 1px solid #e6e6e6;
}
a {
  color: #666;
  transition: none;
}
.li-a {
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ul-c .ivu-icon {
  margin-left: 6px;
}
.active {
  background: #409eff;
  border: 1px solid #409eff;
}
.active a {
  color: #fff;
}
.active .ivu-icon {
  color: #fff;
}
/* 主要内容区域 */
.main-content {
  overflow: auto;
  height: 100%;
  width: 100%;
  background: #eee;
  padding: 10px 12px;
  display: inline-block;
}
.view-c {
  position: relative;
  padding: 5px;
  height: 100%;
}
.pointer {
  cursor: pointer;
}
/* loading */
.loading-c {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask {
  position: fixed;
  background: #eee;
  height: 10px;
  width: 100%;
  top: 85px;
  z-index: 10;
}
.crumbs {
  margin-left: 10px;
  color: #97a8be;
  cursor: default;
}
.menu-level-3 .ivu-icon {
  font-size: 18px;
}
</style>
