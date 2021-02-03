import axios from "axios";
import store from "@/store";
import {getToken, setToken} from "@/utils/auth";
import {MessageBox, Message} from "element-ui";

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    if(store.getters.token) {
      config.headers['token'] = getToken();
    }
    return config
  },
    error => {
      console.log(error);
      Promise.reject(error)
  }
);

service.interceptors.response.use(
  response => {
    let res = response.data;
    if(res.code == 0 ) {
      return response;
    }else if(res.code == 1100) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      setTimeout(()=>{
        setToken("");
        window.location.reload();
      }, 1000)
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(response)
    }
  },
        error => {
        console.log('err' + error);
        Message({
          message: '网络连接出错',
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(error)
      }
);

export default service



