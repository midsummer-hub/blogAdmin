<template>
  <el-menu router unique-opened ref="navBar" :default-active="onRoutes" @select="selectMenu"
           background-color="#393d49" text-color="#fff"  active-text-color="#ffd04b">
    <menu-item v-for="(item, index) in menus"  :item="item" :navIndex="String(index)" :key="index">
    </menu-item>
  </el-menu>
</template>

<script>
  import MenuItem from "@/components/MenuItem";
  export default {
    name: "MenuNav",
    components: {MenuItem},
    data () {
      return {
        menus: [
          {
            id: 1,
            title: '后台首页',
            path: '/admin/home/welcome',
            icon: 'el-icon-platform-eleme',
            child: []
          },
          {
            id: 2,
            title: '博客管理',
            path: '',
            icon: 'el-icon-platform-eleme',
            child: [
              {
                id: 201,
                title: '博客列表',
                path: '/admin/home/blogList',
                icon: 'el-icon-platform-eleme',
              },
              {
                id: 202,
                title: '博客类别',
                path: '/admin/home/blogType',
                icon: 'el-icon-platform-eleme',
              },
            ]
          },
          {
            id: 3,
            title: '评论管理',
            path: '',
            icon: 'el-icon-platform-eleme',
            child: [
              {
                id: 301,
                title: '评论列表',
                path: '/admin/home/commentList',
                icon: 'el-icon-platform-eleme',
              }
            ]
          },
          {
            id: 4,
            title: '博主信息',
            path: '',
            icon: 'el-icon-platform-eleme',
            child: [
              {
                id: 401,
                title: '个人简介',
                path: '/admin/home/myInfo',
                icon: 'el-icon-platform-eleme',
              }
            ]
          },
          {
            id: 5,
            title: '系统管理',
            path: '',
            icon: 'el-icon-platform-eleme',
            child: [
              {
                id: 501,
                title: '修改密码',
                path: '/admin/home/changePassword',
                icon: 'el-icon-platform-eleme',
              }

            ]
          }
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path
      }
    },
    methods: {
      selectMenu(index, indexPath) {
        console.log(index);
        console.log(indexPath);
        let openedMenus = this.$refs.navBar.openedMenus
        let openMenuList
        if(indexPath.length > 1){
          let parentPath = indexPath[indexPath.length-2]
          openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath)+1)
        } else{
          openMenuList = openedMenus
        }
        openMenuList = openMenuList.reverse()
        openMenuList.forEach((ele) => {
          this.$refs.navbar.closeMenu(ele)
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu{
    border-right: none;
  }
</style>
