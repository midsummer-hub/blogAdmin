<template>
  <el-row style="padding: 20px;">
    <h2>博客类别</h2>
    <div style="text-align: left;margin: 10px">
    <el-button type="primary" @click="handleAdd()">添加类别</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型名称">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排列序号">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: left; margin-top: 10px"
      background
      layout="prev, pager, next, total"
      :page-size="pageSize"
      :total="total"
      :current-page='currentPage'
      @current-change="handleCurrentChange">
    </el-pagination>
  </el-row>
</template>

<script>
  import {typeDelete, typeList} from "@/api/blogType";

  export default {
    name: "BlogType",
    data() {
      return {
        tableData: [],
        total: 50,
        pageSize: 10,
        currentPage: 1
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      handleAdd() {
        this.$router.push('/admin/home/addType');
      },
      handleEdit(index, row) {
        console.log(index, row);
        console.log(row.id);
        this.$router.push(`/admin/home/addType/${row.id}`);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认要删除吗？', '警告', {
          type: 'warning'
        }).then( () => {
          typeDelete({id: row.id}).then(res => {
            if(res.data.code == 0) {
              this.$message.success("删除成功");
              this.loadData()
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch( e => {
            console.log(e)
          })
        }).catch( () => {
          console.log('bbb')
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadData();
      },
      loadData() {
        typeList({page: this.currentPage, size: this.pageSize}).then(res => {
          if(res.data.code == 0) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch( e => {
          console.log(e)
        })
      }
    },

  }
</script>

<style>
  .el-table td, .el-table th{
    text-align: center!important;
  }
</style>
