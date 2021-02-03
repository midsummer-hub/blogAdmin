<template>
  <el-submenu v-if="item.child && item.child.length > 0" :index="navIndex" class="subItem">
    <template slot="title">
      <i :class="item.icon"></i>
      <span>{{item.title}}</span>
    </template>
    <menu-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem">
    </menu-item>
  </el-submenu>
  <el-menu-item v-else :index="item.path">
    <i :class="item.icon"></i>
    <span>{{item.title}}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: "MenuItem",
    props: ['item', 'navIndex']

  }
</script>

<style scoped>
  .el-menu-item{
    color: #fff;
  }
  .subItem div{
     color: #fff!important;
   }
  .subItem i{
    color: #fff!important;
  }
</style>
