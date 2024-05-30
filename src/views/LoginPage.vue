<script setup lang="ts">
import CustomTextField from '../components/CustomTextField.vue'
import CustomPasswordTextField from '../components/CustomPasswordTextField.vue'
import CustomButton from '../components/CustomButton.vue'
import { appStrings } from '../consts/strings'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { loginRepository } from '@/repository/login_repository'
import { ref } from 'vue'
import { timeout } from '@/utils/Utils'
import AppConfig from '@/config/AppConfig'
import { toast, type ToastOptions } from 'vue3-toastify'
import { type LoginFormData } from '@/types/LoginFormData'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { values, errors, defineField, handleSubmit, handleReset, setValues } = useForm({
  validationSchema: yup.object({
    password: yup.string().required(appStrings.inputFields.required),
    email: yup
      .string()
      .email(appStrings.inputFields.enterValidEmail)
      .required(appStrings.inputFields.required)
  })
})
const router = useRouter()
const loading = ref(false)
const [email, emailProps] = defineField('email', {
  validateOnModelUpdate: false
})

const [password, passwordProps] = defineField('password', {
  validateOnModelUpdate: false
})

const onSignupButtonPressed = () => {
  router.push('/signup')
}

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  await timeout(AppConfig().apiDelay) //for 1 sec delay
  try {
    const data: LoginFormData = {
      email: values.email,
      password: values.password
    }
    const resp = await loginRepository(data)
    if (resp.success) {
      // setting tokens
      localStorage.setItem(appStrings.localStorageKeys.accessToken, resp.data?.accessToken ?? '')
      localStorage.setItem(appStrings.localStorageKeys.refreshToken, resp.data?.refreshToken ?? '')
      console.log(
        '##fsdfsdf',
        `${appStrings.routes.path.layout}/${appStrings.routes.path.dashboard}`
      )
      router.push('/layout/dashboard')
      toast.success('Login success')
    } else {
      toast.error(resp.message)
    }
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div class="h-screen bg-color1F1F1F px-2 flex sm:px-20 sm:space-x-12">
      <div class="hidden items-center md:hidden xl:flex">
        <section>
          <p class="text-5xl font-semibold text-white pb-6">Tasky</p>
          <p class="text-2xl text-white opacity-80 pb-20">
            Efficiently organize your tasks and boost productivity
          </p>
          <img class="w-395 h-416" src="../assets/signup_page_icon.svg" alt="" />
        </section>
      </div>
      <section class="flex-1 content-center">
        <div class="h-auto bg-white rounded-3xl px-2 sm:px-20 py-12">
          <p class="text-4xl font-medium text-textColor mb-8">Login</p>

          <form @submit="onSubmit">
            <CustomTextField
              class="flex-grow mb-4"
              label="Email"
              v-model="email"
              v-bind="emailProps"
              :errorText="errors.email"
            />

            <CustomPasswordTextField
              class="flex-grow mb-4"
              label="Password"
              :errorText="errors.password"
              v-model="password"
              v-bind="passwordProps"
            />

            <div class="flex space-x-6 items-center">
              <CustomButton variant="primary">
                <span v-if="!loading">{{ appStrings.common.login }}</span>
                <span v-else>
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </span>
              </CustomButton>
              <p>
                {{ appStrings.long.DontHaveAnAcount
                }}<span class="underline cursor-pointer" @click="onSignupButtonPressed">{{
                  appStrings.long.SignUp
                }}</span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>
