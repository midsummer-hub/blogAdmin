import request from "@/utils/request";

export function getCommentList(data) {
  return request({
    url: '/admin/comment/list',
    method: 'post',
    data
  })
}

export function reviewComment(data) {
  return request({
    url: '/admin/comment/review',
    method: 'post',
    data
  })
}

export function deleteComment(data) {
  return request({
    url: '/admin/comment/delete',
    method: 'post',
    data
  })
}
