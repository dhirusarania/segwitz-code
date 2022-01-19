
import { createStore } from 'vuex'
import axios from 'axios'
import { useCookies } from "vue3-cookies";

var parseJwt = function(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      access: '',
      username: ''
    }
  },
  mutations: {
    SET_USER_AUTH(state, value) {
      const { cookies } = useCookies();
      state.isLoggedIn = value.isLogged
      state.access = value.access
      try {
        let token = cookies.get("user-auth");
        let parsed_token = parseJwt(token);
        state.username = parsed_token['name'];
      } catch (error) {
        return state.username = ''
      }
    },
    INIT_STATE(state) {
      const { cookies } = useCookies();
      try {
        let token = cookies.get("user-auth");
        let parsed_token = parseJwt(token);
        state.username = parsed_token['name'];
        state.isLoggedIn = true
        state.access = token
      } catch (error) {
        return state.username = ''
      }
    }
  },
  actions: {
    Login({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `/api/login`,
          data: payload,
          contentType: 'application/json',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('error in request', err)
            reject(err)
          })
      })
    },
    CreateBlog({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `/api/blog/create`,
          data: payload,
          contentType: 'application/json',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('error in request', err)
            reject(err)
          })
      })
    },
    GetBlogs({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/api/blogs`,
          contentType: 'application/json',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('error in request', err)
            reject(err)
          })
      })
    },
    GetSingleBlog({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/api/blog/${payload}`,
          contentType: 'application/json',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('error in request', err)
            reject(err)
          })
      })
    },
    DeleteBlog({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `/api/blog/${payload}`,
          contentType: 'application/json',
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log('error in request', err)
            reject(err)
          })
      })
    },
  }
})

export default store
