<template>
  <div class="bg-color2B2B31 p-4 mx-2 rounded-lg mb-4">
    <div class="flex flex-row mb-4 justify-between">
      <CustomCard name="UI/UX" />
      <CustomPriorityCard :name="setPriority()" :priority="setPriority()" />
    </div>
    <p class="text-colorE9E9EC pb-2">{{ task.title }}</p>

    <p class="text-colorA6A6A6 mb-2">
      {{ task.description }}
    </p>
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-colorE9E9EC">Progress</span>
      <span class="text-sm font-medium text-blue-700 dark:text-white"> {{ task.progress }} %</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
    </div>

    <div class="flex">
      <div class="bg-color30394A p-2 mt-3 rounded-lg">
        <p class="text-color6FBCD6">{{ task.dueDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomCard from './CustomCard.vue'
import CustomPriorityCard from './CustomPriorityCard.vue'
const props = defineProps({
  task: {
    required: true
  }
})

const setPriority = () => {
  switch (props.task.priority) {
    case 0:
      return 'Low'
    case 1:
      return 'Medium'
    case 2:
      return 'High'
  }
}
</script>
