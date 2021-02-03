<template>
  <div style="max-width: 500px;padding: 20px">
    <h2>修改密码</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" readonly/>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm_pwd">
        <el-input type="password" placeholder="请输入密码" v-model="form.confirm_pwd"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" v-on:click="changePassword('form')" style="width:100%;margin-bottom:30px;">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {findBlogger, updatePassword} from "@/api/blogger";

  export default {
    name: "ChangePassword",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认新密码不可为空'));
        } else if (value !== this.form.password) {
          callback(new Error('确认新密码不一致'));
        } else {
          callback();
        }
      }
      return {
        form: {
          id: 0,
          username: '',
          password: '',
          confirm_pwd: ''
        },
        loading: false,
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '新密码不可为空', trigger: 'blur'}
          ],
          confirm_pwd: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      changePassword(formName) {
        this.$refs[formName].validate( valid => {
          if(!valid) {
            return false;
          }
        });

        this.loading = true;

          updatePassword({id: this.form.id, password: this.form.password}).then( res => {
          if(res.data.code == 0) {
            this.$message.success("保存成功");
          }
          this.loading = false;
        }).catch( e => {
          console.log(e);
          this.loading = false;
        })
      },

      loadData() {
        findBlogger().then( res => {
          if(res.data.code == 0) {
            this.form.id = res.data.data.id;
            this.form.username = res.data.data.username;
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
