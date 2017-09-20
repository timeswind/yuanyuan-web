import axios from 'axios'
export default function (store) {
  return function() {
    axios.interceptors.request.use(function (config) {
      if (config && config.url) {
        let urlArray = config.url.split('/')
        if (urlArray && urlArray[1] === 'api' && urlArray[2] !== 'public') {
          if (store.getState().auth.token) {
            config.headers["Authorization"] = "Bearer " + store.getState().auth.token
          } else {
            Promise.reject({
              message: "Need Authorization Token"
            })
          }
        }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
