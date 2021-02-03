<template>
  <el-row style="padding: 20px;">
    <h2>{{title}}</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input type="text" placeholder="请输入标题" v-model="form.title"/>
      </el-form-item>
      <el-form-item label="类别" label-width="100px" prop="typeId">
        <el-select placeholder="请选择类别" v-model="form.typeId">
          <el-option v-for="(item, i) in typesList" :label="item.name" :value="item.id" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor-item v-model="form.content" ref="myEditor" placeholder="请输入正文" @change="change"></editor-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{btn}}</el-button>
        <el-button @click="onBack">返回</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  import EditorItem from "@/components/EditorItem";
  import {blogOne, saveBlog} from "@/api/blog";
  import {typeAll} from "@/api/blogType";
  export default {
    name: "AddBlog",
    components: {EditorItem},
    data() {
      return {
        title: '写博客',
        form: {
          title: '',
          typeId: '',
          content: '',
          summary: '',
          id: 0
        },
        typesList:[],
        btn: '添加',
        rules: {
          title: [
            {required: true, message: '标题不可为空', trigger: 'blur'}
          ],
          typeId: [
            {required: true, message: '请选择类别', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '博客正文不可为空', trigger: 'blur'}
          ],
        }
      }
    },
    props: {
      placeholder: String,
    },
    mounted() {
      this.form.id = this.$route.params.id == undefined ? 0 : parseInt(this.$route.params.id);
      if(this.form.id == 0) {
        this.title = '写博客'
        this.$refs.myEditor.update();
      } else {
        this.title = '修改博客'
        this.btn = '修改'
        this.loadData();
      }
      this.loadTypes();
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return false;
          }
          this.form.summary = this.$refs.myEditor.editor.txt.text();
          saveBlog(this.form).then(res => {
            if(res.data.code == 0){
              this.$message.success("保存成功");
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(e => {
            console.log(e);
          })
        })
      },
      onBack() {
        this.$router.push('/admin/home/blogList');
      },
      change(val) {
        this.form.content = val
      },
      loadTypes() {
        typeAll().then(res => {
          if(res.data.code == 0) {
            this.typesList = res.data.data;

          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      loadData(){
        blogOne({id: this.form.id}).then( res => {
          if(res.data.code == 0) {
            this.form.title = res.data.data.title;
            this.form.typeId = res.data.data.typeId;
            this.form.content = res.data.data.content;
            this.$refs.myEditor.update(this.form.content);
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch( e => {
          console.log(e);
        })
      }
    }
  }
</script>

<style>
  .el-select {
    display: block;
  }

</style>
