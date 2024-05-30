<template>
  <nav class="fixed w-full bg-white border-gray-200 dark:bg-gray-900 px-20">
    <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Tasky</span
        >
      </a>

      <div class="flex justify-center items-center hover:cursor-pointer" @click="logout">
        <p class="text-white mr-2">Logout</p>
        <FontAwesomeIcon class="mr-2 text-colorA6A6A6" :icon="faSignOut" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { logoutRepository } from '@/repository/logout_repository'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  const resp = await logoutRepository()
  if (resp) {
    router.replace('/')
  }
}
</script>

<style lang="scss" scoped></style>
