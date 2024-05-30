import axios from 'axios'
import AppConfig from '../config/AppConfig'
import { refreshTokenRepository } from '@/repository/refresh_token_repository'
import { logoutRepository } from '@/repository/logout_repository'
import { appStrings } from '@/consts/strings'

const axiosInstance = axios.create({
  baseURL: AppConfig().baseUrl,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    const refreshTokenUrl = 'auth/token/refresh'
    if (config.url?.endsWith(refreshTokenUrl)) {
      return config
    }

    // Do something before request is sent
    const token = localStorage.getItem(appStrings.localStorageKeys.accessToken)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const resp = await refreshTokenRepository()
        if (!resp) {
          await logoutRepository()
          window.location.href = '/'
        }
        return axiosInstance(originalRequest)

        // Retry the original request with the new token
      } catch (error) {
        console.log('Errrrororr', error)
        // await logoutRepository()
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
