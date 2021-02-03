<template>
  <el-row style="padding: 20px;">
    <h2>评论列表</h2>
    <el-tabs v-model="activeName" @tab-click="statusClick">
      <el-tab-pane label="待审核" name="first">待审核</el-tab-pane>
      <el-tab-pane label="已审核" name="second">已审核</el-tab-pane>
    </el-tabs>
    <el-table
      :data="comments"
      stripe
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="blog_title"
        label="博客标题">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="用户ip">
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="评论日期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 0"
             size="mini"
             type="primary"
             @click="handleEdit(scope.$index, scope.row)">审核
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: left; margin-top: 10px"
                   background
                   layout="prev, pager, next, total"
                   :page-size="pageSize"
                   :total="total"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </el-row>
</template>

<script>
  import {deleteComment, getCommentList, reviewComment} from "@/api/comment";

  export default {
    name: "CommentList",
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: 'vue基础',
            type: 'vue',
            add_data: '2016-03-17'
          }
        ],
        comments: [],
        total: 1,
        pageSize: 10,
        currentPage: 1,
        activeName: 'first'
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      handleEdit(index, row) {
        this.$confirm('是否审核此评论', '警告', {
          type: 'warning',
        }).then( () => {
          reviewComment({id: row.id}).then(res => {
            if(res.data.code == 0 ){
              this.$message({
                type: 'success',
                message: '审核成功'
              });
              this.loadData()
            } else {
              console.log(res)
            }
          }).catch(e => {
            console.log(e);
          })
        }).catch( e => {
          this.$message({
            type: 'error',
            message: '不通过审核的评论内容可以删除'
          });
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认要删除吗？', '警告', {
          type: 'warning'
        }).then(() => {
          deleteComment({id: row.id}).then(res => {
            if(res.data.code == 0 ){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.loadData()
            } else {
              console.log(res)
            }

          }).catch(e => {
            console.log(e);
          })
        }).catch(() => {
          console.log('bbb')
        })
      },
      handleCurrentChange(val) {
        this.currentPage = parseInt(val);
        this.loadData()
      },
      statusClick(tab, event) {
        this.loadData()
      },
      loadData(){
        let data = {page: this.currentPage, size: this.pageSize};
        if(this.activeName == "first") data.status = 0;
        else data.status = 1;
        getCommentList(data).then(res => {
          if(res.data.code == 0) {
            this.comments = res.data.data;
            this.total = res.data.count;
          } else {
            console.log(res)
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>

</style>
