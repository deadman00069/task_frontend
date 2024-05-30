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
          <p class="text-4xl font-medium text-textColor mb-8">Sign up now</p>

          <form action="">
            <div class="flex flex-col sm:flex-row sm:space-x-4 mb-4">
              <CustomTextField class="flex-grow mb-4 sm:mb-0" label="First Name" errorText="" />

              <CustomTextField class="flex-grow" label="Last Name" />
            </div>

            <CustomTextField class="flex-grow mb-4" label="Email" />

            <CustomTextField class="flex-grow mb-4" label="Phone no" />

            <CustomPasswordTextField class="flex-grow mb-4" label="Password" errorText="sdfds" />

            <CustomPasswordTextField class="flex-grow mb-10" label="Confirm Password" />

            <div class="flex space-x-6 items-center">
              <CustomButton variant="primary">{{ appStrings.common.signup }}</CustomButton>
              <p>
                {{ appStrings.long.AlreadyHaveAnAcount }}
                <span class="underline cursor-pointer" @click="onLoginButtonPressed">{{
                  appStrings.long.LogIn
                }}</span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import CustomTextField from '../components/CustomTextField.vue'
import CustomPasswordTextField from '../components/CustomPasswordTextField.vue'
import CustomButton from '../components/CustomButton.vue'
import { useRouter } from 'vue-router'
import { appStrings } from '../consts/strings'
import { ref } from 'vue'
import { timeout } from '@/utils/Utils'
import AppConfig from '@/config/AppConfig'
import { toast, type ToastOptions } from 'vue3-toastify'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

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

const onLoginButtonPressed = () => {
  router.replace('/')
}
</script>
