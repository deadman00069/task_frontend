<template>
  <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
    <div @click="$emit('onChange', label)" class="flex items-center ps-3">
      <input
        :id="label"
        type="radio"
        name="list-radio"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        :for="label"
        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ label }}
      </label>
    </div>
  </li>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['onChange'])
</script>
