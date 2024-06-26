import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization']
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
