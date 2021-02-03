import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import Welcome from "@/views/Welcome";
import ChangePassword from '@/views/ChangePassword'
import MyInfo from "@/views/MyInfo";
import BlogType from "@/views/BlogType";
import AddType from "@/views/AddType";
import BlogList from "@/views/BlogList";
import AddBlog from "@/views/AddBlog";
import CommentList from "@/views/CommentList";
import {getToken} from "@/utils/auth";

Vue.use(Router);

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
};

const routerReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err);
};

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome,
        },
        {
          path: 'changePassword',
          name: 'ChangePassword',
          component: ChangePassword,
        },
        {
          path: 'myInfo',
          name: 'MyInfo',
          component: MyInfo,
        },
        {
          path: 'blogType',
          name: 'BlogType',
          component: BlogType,
        },
        {
          path: 'addType/:id?',
          name: 'AddType',
          component: AddType,
        },
        {
          path: 'blogList',
          name: 'BlogList',
          component: BlogList,
        },
        {
          path: 'addBlog/:id?',
          name: 'AddBlog',
          component: AddBlog,
        },
        {
          path: 'commentList',
          name: 'CommentList',
          component: CommentList,
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
});

router.beforeEach( (to, from, next) => {
  const token = getToken();
  if(token){
    if(to.path == "/login") {
      next({path: "/admin/home/welcome"})
    }
  } else {
    if(to.path != '/login') {
      next({path: "/login"});
    }
  }
  next();
});


export default router;
