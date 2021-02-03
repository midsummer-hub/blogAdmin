<template>
  <div>
    <el-container>
      <el-header>
        <header-nav ref="header"></header-nav>
      </el-header>
      <el-container>
        <el-aside width="200px" style="overflow: hidden">
          <menu-nav></menu-nav>
        </el-aside>
        <el-container id="main">
          <el-main style="padding: 0;line-height:0;">
            <router-view></router-view>
          </el-main>
          <el-footer>
            <p>www.xjs.com</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import HeaderNav from "@/components/HeaderNav";
  import MenuNav from "@/components/MenuNav";
  import {findBlogger} from "@/api/blogger";
  export default {
    name: "Home",
    components: {
      HeaderNav,
      MenuNav,
    },
    data() {
      return {

      }
    },
    mounted () {
      let navHeight = document.documentElement.clientHeight;
      let nav = document.getElementsByClassName('el-aside');
      console.log(navHeight);
      for (let item of nav) {
        item.style.height = (navHeight - 80) + 'px';
      }
      document.getElementById('main').style.maxHeight = (navHeight - 80) + 'px';
      this.loadData();
    },

    methods: {
      loadData() {
        findBlogger().then( res => {
          if(res.data.code == 0) {
            console.log("findBlogger");
            this.$refs.header.update(res.data.data.username);
          }
        })
      },
    }


  }

</script>

<style scoped>
  .el-header {
    background-color: #23262e;
    color: #fff;
    text-align: center;
    line-height: 60px;
    border-bottom: 5px solid #1e9fff;
  }

  .el-footer{
    background-color: #eee;
    text-align: center;
    line-height: 44px;
    height: 44px!important;
  }
  .el-footer p{
    line-height: 18px;
    height: 18px!important;
  }

  .el-aside {
    background-color: #393d49;
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: 2px solid #1e9fff;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
