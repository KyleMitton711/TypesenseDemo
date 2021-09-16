import axios from 'axios';
import router from '@/router';
// import Vue from 'vue'

const VUE_APP_API_URL = process.env.VUE_APP_API_URL;

const http = axios.create({
  baseURL: VUE_APP_API_URL
})

http.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default class APIService {
  isRefreshing = false;

  async get(url, headers = {}, responseType = 'json') {
    try {
      return await http.get(url, {
        headers: {
          ...headers,
        },
        responseType: responseType,
        data: {},
      });
    } 
    catch (e) {
      if (e.response.status == 401) {
        document.location.href = "/auth";
        return;
      }
      throw e.response;
    }
  }

  async post(url, content, headers = {}, responseType = 'json') {
    try {
      return await http.post(url, content, {
        headers: {
          ...headers
        },
        responseType: responseType
      });
    }
    catch (e) {
      // if (e.response.status == 401) {
      //   document.location.href = "/auth";
      //   return;
      // }
      throw e.response;
    }
  }

  async put(url, content, headers = {}) {
    try {
      return await http.put(url, content, {
        headers: {
          ...headers
        }
      });
    }
    catch (e) {
      // if (e.response.status == 401) {
      //   document.location.href = "/auth";
      //   return;
      // }
      throw e.response;
    }
  }

  async patch(url, content, headers = {}) {
    try {
      return await http.patch(url, content, {
        headers: {
          ...headers
        }
      })
    }
    catch (e) {
      // if (e.response.status == 401) {
      //   document.location.href = "/auth";
      //   return;
      // }
      throw e.response;
    }
  }

  async delete(url, content = {}, headers = {}) {
    try {
      return http.delete(url, {
        headers: {
          ...headers
        },
        data: content
      })
    } 
    catch (e) {
      // if (e.response.status == 401) {
      //   document.location.href = "/auth";
      //   return;
      // }
      throw e.response;
    }
  }
}
