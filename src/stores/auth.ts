import { appStrings } from '@/consts/strings'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = localStorage.getItem(appStrings.localStorageKeys.accessToken)
  const isAuth = ref(false)
  if (accessToken) {
    console.log('###Yeh budddy')
    isAuth.value = true
  }

  return { isAuth }
})
