<template>
  <div style="padding: 20px">
  <h2>个人简介</h2>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input type="text" placeholder="请输入用户名" v-model="form.username"/>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input type="text" placeholder="请输入昵称" v-model="form.nickname"/>
    </el-form-item>
    <el-form-item label="个性签名" prop="sign">
      <el-input type="text" placeholder="请输入个性签名" v-model="form.sign"/>
    </el-form-item>
    <el-form-item label="头像" prop="img">
      <el-upload
        class="avatar-uploader"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange">
        <img v-if="form.img" :src="imgUrl" class="avatar" style="width: 80px;height: 80px">
        <el-button v-else size="small" type="primary">点击上传</el-button>
        <el-input type="hidden" v-model="form.img"></el-input>
      </el-upload>
    </el-form-item>
    <el-form-item label="个人简介" prop="profile">
      <editor-item v-model="form.profile" ref="myEditor" placeholder="请输入正文" @change="change"></editor-item>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" v-on:click="submit('form')"
                 style="margin-bottom:30px;">提 交
      </el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import EditorItem from "@/components/EditorItem";
  import {uploadFile} from "@/api/common";
  import {findBlogger, updateInfo} from "@/api/blogger";
  export default {
    name: "MyInfo",
    components: {EditorItem},
    data() {
      return {
        form: {
          id: 0,
          username: '',
          nickname: '',
          sign: '',
          img: '',
          profile: '',
        },
        imgUrl: '',
        loading: false,
        imageUrl: '',
        rules: {
          username: [
            {required: true, message: '用户名不可为空', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '昵称不可为空', trigger: 'blur'}
          ],
          sign: [
            {required: true, message: '个性签名不可为空', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '头像不可为空', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '个人简介不可为空', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.loadData();
    },

    methods: {
      loadData(){
        findBlogger().then( res => {
          if(res.data.code == 0) {
            this.form = res.data.data;
            this.imgUrl = `${process.env.BASE_API}${res.data.data.img}`;
            this.$refs.myEditor.update(res.data.data.profile);
          } else {
            this.$refs.myEditor.update();
          }
        }).catch(e => {
          console.log(e)
        })
      },
      submit(formName){
        this.$refs[formName].validate( valid => {
          if(!valid) {
            return false;
          }
          this.loading = true;
            updateInfo(this.form).then( (res) => {
            if(res.data.code == 0) {
              this.$message.success("保存成功");
            }
            this.loading = false;
          }).catch( e => {
            console.log(e);
            this.loading = false;
          });
        })
      },
      change(val) {
        this.form.profile = val
      },
      handleChange(file, fileList){
        if(this.beforeUpload(file.raw) == false) {
          return ;
        }

        uploadFile(file.raw).then(res => {
          if(res.data.code == 0) {
            this.form.img = res.data.data;
            this.imgUrl = `${process.env.BASE_API}${res.data.data}`;
          }
        });
      },
      beforeUpload(file) {
        console.log(file)
        const isImg = file.type.indexOf('image') >= 0;
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isImg) {
          this.$message.error('上传头像图片只能是 图片 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isImg && isLt10M;
      }
    }
  }
</script>

<style>
  .el-form-item__content{
    line-height: 0;
  }
  .avatar-uploader{
    text-align: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
