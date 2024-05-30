<template>
  <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
    <p class="text-2xl text-gray-400 dark:text-gray-500">{{ label }}</p>
    <span v-if="loading"><CustomLoading /></span>
    <p v-else class="text-white">{{ count }}</p>
  </div>
</template>

<script setup>
import CustomLoading from './CustomLoading.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
