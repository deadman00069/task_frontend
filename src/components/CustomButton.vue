<template>
  <button
    @click="$emit('onClick')"
    class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    :class="extraClass"
    type="submit"
    value="Signup"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // default variant is primary
    validator: (value) => ['primary', 'success', 'danger', 'secondary'].includes(value) // validate the variant prop
  },
  extraClass: {
    type: String,
    default: ''
  }
})
defineEmits(['onClick'])
</script>

<style></style>
