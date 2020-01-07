<!--
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-05 11:09:17
 * @LastEditTime : 2020-01-06 13:59:01
 * @LastEditors  : Ruebin
 -->
<template>
  <Panel class="panel">
    <Button type="info" size='small' @click="goback" style="margin:10px 30px" >返回主页</Button>
    <div class="box">
      <Row class="contain" type="flex" justify="center">
        <Col span="12" class="containLeft">
          <img :src="API_HOST+bookinfo.cover_address"  alt="" class="img">
        </Col>
        <Col span="12" class="containRight">
          <h1 class="title">{{bookinfo.book_name}}</h1>
          <p class="info">作者：{{bookinfo.author}}</p>
          <p class="info">出版社：{{bookinfo.press}}</p>
          <p class="info">类别：{{bookinfo.type}}</p>
          <p class="info">所属：{{bookinfo.belong}}</p>
          <p class="info">评论数：{{bookinfo.comment_num}}</p>
          <div>
            <Button type="info" @click="read" class="readBtn">开始阅读</Button>
            <Button type="warning" @click="change" class="readBtn" >修改信息</Button>
            <Button type="error" @click="remove" class="readBtn" >删除</Button>
          </div>
        </COl>
      </Row>
    </div>
    <div class="commit">
      <div class="commit_title">
        <strong style="font-size:20px">评论</strong >
        <Button type="info" style="float:right;margin-left:10px" size='small' @click="commit">评论</Button>
        <Input v-model="commitText" placeholder="Enter something..." />
      </div>
      <div class="commit_text" v-for="(item,index) in this.commentList" :key="index">
        <div class="commit_top">
          <span class="commit_name">{{item.user_name}}</span>
          <span class="commit_time">{{item.date}}</span>
        </div>
        <div class="commit_context">{{item.content}}</div>
      </div>
    </div>
  </Panel>
</template>
<script>
import Panel from '../../components/core/panel.vue'
import { deletebook } from '../../api/privateBook/deletebook'
import { comment } from '../../api/publicBook/comment'
import { allcomment } from '../../api/publicBook/allcomment'
import { searchbook } from '../../api/publicBook/searchbook'

export default {
  data() {
    return {
      bookinfo: {},
      API_HOST: API_HOST,
      commitText: '',
      commentList: []
    }

  },
  mounted() {
    searchbook(this.$store.state.bookinfo.book_name).then(res => {
      console.log(res)
      if (res.status == 200) {
        this.bookinfo = res.msg.data[0];
        this.$store.state.bookinfo = res.msg.data[0];
      } else {
        console.log(res.msg.msg)
      }
    }).catch(err => {
      console.log(err)
    }),
    allcomment(this.$store.state.bookinfo.book_id).then(res => {
      console.log(res)
      if (res.status == 200) {
        this.commentList = res.msg.data;
      } else {
        console.log(res.msg.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    Panel
  },
  methods: {
    read() {
      const params = { book_id: this.$store.state.bookinfo.book_id }
      this.$router.params = params;
      this.$router.push(`/book/${params.book_id}/bookinfo/readbook`);
    },
    change() {
      this.$router.push({ path: '/home/changebook' });
    },
    goback() {
      this.$router.push({ path: '/home' });
    },
    remove() {
      console.log(this.bookinfo.book_id)
      const params = { book_id: this.$store.state.bookinfo.book_id }
      deletebook(params).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$Message.success('删除成功！');
          this.$router.push({ path: '/home' });
        } else {
          console.log(res.msg.msg)
        }
      }).catch(err => {
        console.log(err)
      })

    },
    commit() {
      const params = { book_id: this.$store.state.bookinfo.book_id, content: this.commitText }
      comment(params).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$Message.success('评论成功！');
          this.commitText = '';
        } else {
          console.log(res.msg.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.panel{
  .box{
    width: 50%;
    margin: auto;
    .contain{
      width: 100%;
      .containLeft{
        .img{
          width: 300px;
          height: 350px;
        }
      }
      .containRight{
        .info{
          margin: 5px 0;
        }
        .readBtn{
          margin: 50px 5px;
        }
      }
    }
  }
  .commit{
    width: 70%;
    margin: auto;
    .commit_title{
      margin: 10px;
      padding-bottom: 15px;
      border-bottom: 1px solid lightgray;
    }
    .commit_text{
      padding: 10px;
      border-bottom: 1px solid lightgray;
      .commit_top{
        margin:10px 10px;
        .commit_name{
          margin-right: 10px;
          color:blue;
        }
      }
      .commit_context{
        margin: 0 10px;
      }
    }
  }
}
</style>
