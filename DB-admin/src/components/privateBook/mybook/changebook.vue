<template>
  <Panel class="panel">
    <Form ref="formValidate" :model="formValidate" :label-width="200">
        <FormItem label="电子书名称：" prop="book_name">
            <Input v-model="formValidate.book_name" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="电子书作者：" prop="author">
            <Input v-model="formValidate.author" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="出版社：" prop="press">
            <Input v-model="formValidate.press" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="电子书类别：" prop="type">
            <Input v-model="formValidate.type" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="封面图：">
            <Row type="flex" justify="center" align="middle">
                <Col span="4" >
                    <form id="uploadPicForm" style="display:none" enctype="multipart/form-data">
                        <input type="file" name="file" id="uploadPicInput" ref="filePicField" />
                    </form>
                    <Button class="uploadBtn" type="primary" @click="uploadPicTrigger()">上传图片</Button>
                </Col>
                <Col span="20">
                  <img src id="uploadPicImg" alt />
                  <div class="uploadPic" id="uploadPic">
                      <strong class="Pictext">推荐尺寸比例</b>16:9</strong>
                      <Icon type="ios-cloud-upload" size="170" style="color: #3399ff"></Icon>
                  </div>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="电子书文件：">
          <input type="file" name="file" id="uploadfileInput" ref="filefileField" />
        </FormItem>
        <div class="summit">
          <div class="sumitBtn">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </div>
        </div>
    </Form>
  </Panel>
</template>
<script>
import { changebook } from '../../../api/privateBook/changebook'
import Panel from '../../../components/core/panel.vue'

export default {
  data() {
    return {
      formValidate: {
        book_name: 'test',
        author: 'test',
        press: 'test',
        type: 'test',
        image: '',
        file: ''
      }
    }
  },
  mounted() {
    if (this.$store.state.bookinfo.book_name !== '') {
      this.formValidate = this.$store.state.bookinfo
    }
  },
  methods: {
    uploadPicTrigger() {
      this.$refs.filePicField.click();
      // 调用方法，change_pic(图片id，文件选择input框id);
      this.change_pic('uploadPicImg', 'uploadPicInput');
    },
    change_pic(img_id, file_id) {
      var img = document.getElementById(img_id);
      var file = document.getElementById(file_id);
      var message = this.$Message;
      if (
        !(window.FileReader && window.File && window.FileList && window.Blob)
      ) {
        img.alt = '您的浏览器不支持fileReader';
      }
      file.addEventListener('change', function(e) {
        var files = this.files;
        if (files.length) {
          // 对文件进行处理,检查
          checkFile(this.files)
        } else {
          img.src = 'timg.jpg'; // 打开了文件框，但并没有选文件上传的情况，会自动清空Input的file
          document.getElementById('uploadPic').style.display = 'block';
        }
      });
      // 图片处理和检查
      function checkFile(files) {
        var file = files[0];
        var reader = new FileReader();
        if (!/image\/\w+/.test(file.type)) {
          message.warning('请上传图片文件！')
          return false;
        }
        // onload是异步操作
        reader.onload = function(e) {
          img.src = e.target.result;
          document.getElementById('uploadPic').style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit(name) {
      const book_id = this.$store.state.bookinfo.book_id
      if (this.$refs.filePicField.files.length !== 0) { this.formValidate.image = this.$refs.filePicField.files[0] } else this.formValidate.image = null
      if (this.$refs.filefileField.files.length !== 0) { this.formValidate.file = this.$refs.filefileField.files[0] } else this.formValidate.file = null
      this.$refs[name].validate((valid) => {
        if (valid) {
          const formdata = new FormData();
          formdata.append('book_id', book_id);
          formdata.append('book_name', this.formValidate.book_name);
          formdata.append('author', this.formValidate.author);
          formdata.append('press', this.formValidate.press);
          formdata.append('type', this.formValidate.type);
          formdata.append('image', this.formValidate.image);
          formdata.append('file', this.formValidate.file);
          this.$Spin.show();
          console.log(formdata.get('file'))
          changebook(formdata).then(res => {
            if (res.status === 200) {
              this.$Message.success('修改成功!');
              this.$Spin.hide();
              this.$router.push('/home')
            } else {
              this.$Message.error('修改错误!');
            }
          })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  components: {
    Panel
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/element.scss';
.panel{
    @include panel;
    margin:auto;
    width: 50%;
    #uploadPicImg{
      width: 50%;
      height: 50%;
      padding-left: 20%;
    }
    .uploadPic{
        position: relative;
        width: 170px;
        margin: auto;
        .Pictext{
            text-align: center;
            position:absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%,-50%,0)
        }
    }
    .summit{
      width: 25%;
      margin: auto;
    }
}
</style>
