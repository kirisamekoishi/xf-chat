import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://192.168.192.10:5000", // 请求的基础路径
  timeout: 10000,  // 请求超时时间
  withCredentials: true, // 允许携带凭据（例如 Cookie）
});

// // 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log('url', config.url)
    // 在发送请求之前做些什么
    if (config.url !== '/api/user/get/loginUser') {
      // 如果有 token，添加到请求头中
      // config.headers['Set-Cookie'] = 'eyJ1c2VyQWNjb3VudCI6ImFkbWluIn0.ZXrWXQ.qxoq4dN8FJH0UMReuUdlY8Ru_3M';
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error(error);
    return Promise.reject(error);
  }
);

/**
 * service.get返回的是一个Promise对象，
 * 该Promise在请求完成后解析为一个包含响应数据的response对象。
 * response对象通常包含以下属性：
 * data: 响应数据
 * status: HTTP状态码
 * statusText: HTTP状态消息
 * headers: 响应头信息
 * config: 请求配置信息
 */

// 响应拦截器
// 统一的错误处理： 在request.js中设置统一的错误处理，以避免在每个接口调用中重复处理错误。
service.interceptors.response.use(
  (response) => {
    // 在这里对响应数据做些什么
    const res = response.data;

    if (!res.code) return res // undefined or 0

    // unhandled error should be caught in next
    return Promise.reject(
      new Error(res.message || `response with error code ${res.code}`)
    )
//     if (res.code !== 0) {
//       // 如果返回的 code 不是 0，表示请求失败
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000,
//       });

//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//         MessageBox.confirm(
//           'You have been logged out, you can cancel to stay on this page, or log in again',
//           'Confirm logout',
//           {
//             confirmButtonText: 'Re-Login',
//             cancelButtonText: 'Cancel',
//             type: 'warning',
//           }
//         ).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload();
//           });
//         });
//       }

//       return Promise.reject(new Error(res.message || 'Error'));
//     } else {
//       // 请求成功，返回响应数据
//       return res;
//     }
  },
  (error) => {
    // 处理响应错误
    console.error('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
