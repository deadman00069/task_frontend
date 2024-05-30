<template>
  <!-- Text field -->
  <div class="flex flex-col">
    <div class="flex justify-between">
      <label class="mb-1 text-color666666" :for="label">{{ label }} </label>
      <div class="flex space-x-2 cursor-pointer content-center" @click="toggleVisibility">
        <img v-if="isVisible" src="../assets/show.svg" alt="show-icon" />
        <img v-else src="../assets/hide.svg" alt="hide-icon" />

        <p class="text-color666666" v-if="isVisible">Show</p>
        <p class="text-color666666" v-else>Hide</p>
      </div>
    </div>
    <input
      class="border border-gray-300 p-2 rounded-md w-full focus:border-green-500 focus:outline-none"
      :class="{ 'border-red-500': errorText }"
      :type="inputType"
      :id="label"
      placeholder="Enter Your Name"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
    <p class="pl-1 pt-1 text-red-400" v-if="errorText">{{ errorText }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Define refs
const isVisible = ref(true)
const inputType = ref('password') // Assuming you want to toggle between text and password

const toggleVisibility = () => {
  if (isVisible.value) {
    inputType.value = 'text'
  } else {
    inputType.value = 'password'
  }
  isVisible.value = !isVisible.value
}

defineProps({
  label: {
    require: true,
    type: String,
    default: 'Label text'
  },
  errorText: {
    type: String,
    default: ''
  },
  modelValue: String
})
const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<style></style>
