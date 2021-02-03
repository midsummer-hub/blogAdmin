<template>
  <el-row>
    <a href="#" class="logo">博客管理后台</a>
    <ul class="top-menu">
      <li>
        <a href="#"><cite>博主：{{blogger}}</cite></a>
      </li>
      <li>
        <cite>{{time}}</cite>
      </li>
      <li>
        <a href="javascript:void(0)" @click="logout"><cite>退出</cite></a>
      </li>
    </ul>
  </el-row>
</template>

<script>
  import {formatTime} from '@/utils/util'
  import {logout} from "@/api/blogger";
  import {setToken} from "@/utils/auth";
  export default {
    name: "HeaderNav",
    data() {
      return {
        time: '',
        blogger: 'abc',
      }
    },
    created() {
      setInterval( () =>{
        this.time = formatTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss');
      }, 1000)
    },
    methods: {
      logout() {
        this.$confirm('确认要删除吗？', '警告', {
          type: 'warning'
        }).then(() => {
          logout().then(res => {
            setToken("");
            this.$router.push('/login');
            window.location.reload();
          })
        }).catch(() => {

        })
      },

      update(blogger) {
        this.blogger = blogger
      }
    }


  }
</script>

<style scoped>
  .logo {
    color: #fff;
    float: left;
    font-size: 20px;
    text-decoration: none;
  }

  .top-menu {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 30px;
    max-height: 30px;
  }

  .top-menu li {
    list-style: none;
    position: relative;
    display: inline-block;
    line-height: 30px;
    max-height: 30px;
    vertical-align: middle;

  }

  .top-menu a {
    text-decoration: none;
    color: #fff;
  }

  .top-menu cite {
    font-size: 16px;
    font-style: normal;
    margin: 0 10px;
  }
</style>
