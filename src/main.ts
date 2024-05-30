import './assets/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin,QueryClient } from '@tanstack/vue-query'

const pinia = createPinia()
const app = createApp(App)

app.use(VueQueryPlugin)
app.use(pinia)
app.use(setupCalendar, {})
app.use(router)
app.use(Vue3Toasity, {
  autoClose: 3000
  // ...
} as ToastContainerOptions)

app.mount('#app')
