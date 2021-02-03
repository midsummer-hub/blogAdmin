import request from "@/utils/request";

export function blogList(data) {
  return request({
    url: '/admin/blog/list',
    method: 'post',
    data
  })
}

export function saveBlog(data) {
  return request({
    url: '/admin/blog/save',
    method: 'post',
    data
  })
}

export function blogOne(data) {
  return request({
    url: '/admin/blog/one',
    method: 'post',
    data
  })
}

export function blogDelete(data) {
  return request({
    url: '/admin/blog/delete',
    method: 'post',
    data
  })
}
