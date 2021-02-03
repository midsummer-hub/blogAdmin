import request from "@/utils/request";

export function loginByUser(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
};

export function findBlogger() {
  return request({
    url: '/admin/blogger/find',
    method: 'post'
  })
};

export function updatePassword(data) {
  return request({
    url: '/admin/blogger/updatePassword',
    method: 'post',
    data: data
  })
};

export function updateInfo(data) {
  return request({
    url: '/admin/blogger/updateInfo',
    method: 'post',
    data: data
  })
};

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
};
