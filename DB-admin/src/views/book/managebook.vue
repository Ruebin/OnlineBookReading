<!--
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-03 22:09:57
 * @LastEditTime : 2020-01-06 22:40:36
 * @LastEditors  : Ruebin
 -->
<template>
    <div class="book-page">
      <Panel :class="$style.panel">
        <section><h1 style="margin-left:20px">电子书管理</h1></section>
        <Button type="info" style="float:right;margin:10px 0 0 10px;" @click="addbook">上传电子书</Button>
        <section :class="$style.search">
            <Input v-model="keyword" search enter-button placeholder="Enter something..." @on-search='search'/>
        </section>
        <section :class="$style.content">
          <BookContext :get-list = "bookList"></BookContext>
        </section>
      </Panel>
    </div>
</template>
<script>
import Panel from '../../components/core/panel.vue'
import BookContext from '../../components/privateBook/mybook/BookContext.vue';
import { searchbook } from '../../api/publicBook/searchbook'
import { allbook } from '../../api/publicBook/allbook'

export default {
  name: 'Managebook',
  components: {
    Panel,
    BookContext
  },
  data() {
    return {
      bookList: [],
      keyword: ''
    }
  },
  // 请求数据
  created() {
    allbook().then(res => {
      console.log(res)
      if (res.status == 200) {
        this.bookList = res.msg.data;
      } else {
        console.log(res.msg.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    search() {
      searchbook(this.keyword).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.bookList = res.msg.data;
        } else {
          console.log(res.msg.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addbook() {
      this.$router.push({
        path: '/home/addbook'
      });
    }
  }
}

</script>
<style lang='scss' module>
@import '../../assets/css/element.scss';
.panel{
    @include panel;
    margin:10px;
    .search{
      width: 50%;
      margin:10px auto;
    }
}
</style>
