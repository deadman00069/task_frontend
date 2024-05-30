<script setup>
import CheckBoxListItem from './CheckBoxListItem.vue'

const props = defineProps({
  errorText: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['onChange'])

const onChange = (i) => {
  emit('onChange', i)
}
</script>

<template>
  <div>
    <label class="text-color666666" for="{{label}}">Status</label>
    <ul
      class="mt-1 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <CheckBoxListItem label="Ongoing" @onChange="onChange"></CheckBoxListItem>
      <CheckBoxListItem label="Pending" @onChange="onChange"></CheckBoxListItem>
      <CheckBoxListItem label="Completed" @onChange="onChange"></CheckBoxListItem>
    </ul>
    <p class="mt-2 text-red-400" v-if="errorText">{{ errorText }}</p>
  </div>
</template>
