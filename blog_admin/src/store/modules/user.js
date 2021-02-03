import {getToken, setToken} from "@/utils/auth";
import {findBlogger, loginByUser} from "@/api/blogger";

const user = {
  state: {
    token: getToken(),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
      console.log('token: ' + token);
    }
  },

  actions: {
    loginByUser({ commit, state}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUser(userInfo).then( res => {
          if(res.data.code == 0) {
            commit('SET_TOKEN', res.data.data);
            resolve(res)
          } else {
            reject(res)
          }
        }).catch( e => {
          reject(e)
        })
      })
    }
  }
};

export default user;
