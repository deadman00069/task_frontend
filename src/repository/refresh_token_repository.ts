import { appStrings } from '@/consts/strings'
import axiosInstance from '../service/api_service'

export async function refreshTokenRepository(): Promise<boolean | null> {
  try {
    const url: string = 'auth/token/refresh'
    const refreshToken = localStorage.getItem(appStrings.localStorageKeys.refreshToken)

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })

    /// Setting access and refresh token to local storage
    localStorage.setItem(
      appStrings.localStorageKeys.accessToken,
      response.data?.data.accessToken ?? ''
    )

    localStorage.setItem(
      appStrings.localStorageKeys.refreshToken,
      response.data?.data.refreshToken ?? ''
    )

    if (response.status === 200) {
      response.data
      return true
    }
    return false
  } catch (error: any) {
    return false
  }
}
