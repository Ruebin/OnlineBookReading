<!--
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-01-04 18:34:17
 * @LastEditTime : 2020-01-06 13:59:11
 * @LastEditors  : Ruebin
 -->
 <style lang="scss">
.readbook{
  height: 100%;
}
 </style>
<template>
  <div class="readbook">
    <iframe
    :src="API_HOST+url"
    type="application/x-google-chrome-pdf"
    width="100%"
    height="100%"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      API_HOST: API_HOST,
      url: ''
    }
  },
  mounted() {
    this.url = this.$store.state.bookinfo.book_address;
  }
}
</script>
