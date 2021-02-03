import request from "@/utils/request";

export function uploadFile(file) {
  let configs = {
    headers:{'Content-Type':'multipart/form-data'}
  };
  let formData = new FormData();
  formData.append('file',file);
  return request({
    url: "/upload",
    method: 'post',
    data: formData,
    configs: configs
  });
}
