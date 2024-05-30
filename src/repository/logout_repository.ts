import axiosInstance from '../service/api_service'

export async function logoutRepository(): Promise<boolean> {
  try {
    const url: string = 'auth/logout'
    await axiosInstance.post(url)
    localStorage.clear()
    return true
  } catch (error: any) {
    console.log(error)
    return false
  }
}
