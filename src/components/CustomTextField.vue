<template>
  <!-- Text field -->
  <div class="flex flex-col" :class="extraClass">
    <label class="mb-1 text-color666666" :for="label">{{ label }}</label>
    <input
      class="border border-gray-300 p-2 rounded-md w-full focus:border-green-500 focus:outline-none"
      :class="{ 'border-red-500': errorText }"
      :type="type"
      :id="label"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
    <p class="pl-1 pt-1 text-red-400" v-if="errorText">{{ errorText }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    require: true,
    type: String
  },
  errorText: {
    type: String,
    default: ''
  },
  extraClass: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<style></style>
