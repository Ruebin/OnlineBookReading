<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 12:37:08
 * @LastEditTime : 2020-01-05 13:54:14
 * @LastEditors  : Ruebin
 -->
<template>
    <div class="context-container">
        <div class="context-box">
            <div
                class="box-flex"
                 v-for="(data,i) in getList"
                 :key ="i">
                <div class="box-item">
                    <div class="item-a" @click="goToRead(data)">
                        <div class="item-box-top" >
                                <img
                                    :src="API_HOST+data.cover_address"
                                    alt="课程图片"
                                    class="cover-img">
                        </div>
                        <div class="item-box-bottom">
                            <div class="course-info">
                                <div class="course-name">
                                    <span>{{data.book_name}}</span>
                                </div>
                                <div class="course-description">
                                    <span>{{data.author}}</span>
                                </div>
                                <div class="course-description">
                                    <span>{{data.press}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      API_HOST: API_HOST,
      isShow: true,
      keyword: ''
    }
  },
  props: {
    getList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goToRead(data) {
      const params = { book_id: data.book_id }
      this.$router.params = params;
      this.$router.push(`/book/${data.book_id}/bookinfo`);
      this.$store.state.bookinfo = data;
    }
  }
}
</script>
<style lang="scss" scoped>
.context-container{
    width: 100%;
    margin: auto;
    .context-box{
        display: flex;
        flex-wrap: wrap;
        .box-flex{
            flex: 0 0 25%;
            max-width: 25%;
            padding:1%;
            box-shadow: 0 2px 2px 0 #eee;
            height: 400px;
            .box-item{
                width: 100%;
                height: 100%;
                position: relative;
                .item-a{
                    height: 75%;
                    cursor: pointer;
                    text-decoration: none;
                    color: #08bf91;
                    background-color: transparent;
                    .item-box-top{
                        height: 100%;
                        .cover-img{
                           width: 100%;
                           height: 100%;
                        }
                    }
                    &:hover{
                        .item-box-bottom{
                            height: 27%;
                        }
                    }
                    .item-box-bottom{
                        position: absolute;
                        width: 100%;
                        height: 20%;
                        bottom: 0;
                        background: #fff;
                        transition: height .3s ease-out;
                        .course-info{
                            height: 100%;
                            padding: 18px 16px 0;
                            top: 0;
                            background: #fff;
                            overflow: hidden;
                            .course-name{
                                font-size: 1rem;
                                display: block;
                                width: 100%;
                                color: #666;
                                margin-bottom: .5rem;
                                font-weight: 500;
                                line-height: 1.2;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .course-description{
                                margin-top: 10px;
                                color: #666;
                                font-size: 13px;
                                line-height: 1.4;
                                -webkit-line-clamp: 3;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                word-wrap: break-word;
                            }
                        }
                        .course-meta-data{
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            left: 0;
                            height: 53px;
                            padding: 0 10px;
                            font-size: 12px;
                            color: #9b9da2;
                            background: #fff;
                            .meta-data-inner{
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .student-count{
                                    .user_num{
                                        margin: 0 5px 0 5px;
                                        width: 10px;
                                        height: 10px;
                                    }
                                }
                                .course-type{
                                    padding: 3px 10px;
                                    font-size: 12px;
                                    display: inline-block;
                                    margin-left: 8px;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
