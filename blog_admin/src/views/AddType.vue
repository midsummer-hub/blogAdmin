<template>
  <el-row style="padding: 20px;max-width: 500px">
    <h2>{{title}}</h2>
    <p style="padding: 10px"></p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="类别名称" prop="name">
        <el-input type="text" placeholder="请输入类别名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类别排序" prop="sort">
        <el-input type="number" placeholder="请输入排序" v-model.number="form.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{btn}}</el-button>
        <el-button @click="onBack">返回</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  import {saveType, typeOne} from "@/api/blogType";

  export default {
    name: "AddType",
    data() {
      return {
        form: {
          name: '',
          sort: 1,
          id: 0
        },
        title: '添加博客类别',
        btn: "添加",
        rules: {
          name: [
            {required: true, message: '名称不可为空', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '排序不可为空', trigger: 'blur'}
          ],
        }
      }
    },
    mounted(){
      this.form.id = this.$route.params.id == undefined ? 0 : parseInt(this.$route.params.id);
      if(this.form.id == 0) {
        this.title = '添加博客类别';
      } else {
        this.title = '修改博客类别';
        this.btn = '修改';
        this.loadData()
      }

    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate( valid => {
          if(!valid) {
            return false;
          }
          saveType(this.form).then( res => {
            if(res.data.code == 0) {
              this.$message.success('保存成功');
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch( e => {
            console.log(e)
          })
        })
      },

      loadData() {
        typeOne({id: this.form.id}).then( res => {
          console.log(res);
          if(res.data.code == 0) {
            this.form.name = res.data.data.name;
            this.form.sort = parseInt(res.data.data.sort);
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch( e => {
         console.log(e)
        })
      },

      onBack() {
        this.$router.push('/admin/home/blogType');
      }
    }

  }
</script>

<style scoped>

</style>
