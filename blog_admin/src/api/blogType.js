import request from "@/utils/request";

export function typeList(data) {
  return request({
    url: '/admin/blog/type/list',
    method: 'post',
    data: data
  })
}
export function saveType(data) {
  return request({
    url: '/admin/blog/type/save',
    method: 'post',
    data: data
  })
};

export function typeOne(data) {
  return request({
    url: '/admin/blog/type/one',
    method: 'post',
    data: data
  })
}

export function typeDelete(data) {
  return request({
    url: '/admin/blog/type/delete',
    method: 'post',
    data:data
  })
}

export function typeAll() {
  return request({
    url: '/admin/blog/type/All',
    method: 'post'
  })
}
