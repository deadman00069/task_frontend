<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import TaskCard from '@/components/TaskCard.vue'
import DropDownMenu from '../components/DropDownMenu.vue'
import { ref, type PropType, watch } from 'vue'
import { Priority } from '@/consts/enums'
import type { Task } from '@/types/Task'

const listOfFilteredTasks = ref<Task[]>([])
const props = defineProps({
  heading: {
    type: String,
    required: true
  },
  listOfTasks: {
    type: Array as PropType<Task[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

watch(
  () => props.listOfTasks,
  (newTasks) => {
    listOfFilteredTasks.value = newTasks
  },
  { immediate: true } // This makes sure it runs immediately after the component is set up
)

listOfFilteredTasks.value = props.listOfTasks

const getSelectedMenu = (v) => {
  console.log('menu is', v.value)

  switch (v.value) {
    case 0:
      // sortByDueDate()
      break
    case 1:
      sortByPriority(Priority.High)
      break
    case 2:
      sortByPriority(Priority.Medium)
      break
    case 3:
      sortByPriority(Priority.Low)
      break
    case 4:
      listOfFilteredTasks.value = props.listOfTasks ?? []
      break
  }
}

const sortByPriority = (priority: Priority) => {
  console.log('From sortByPriority')
  console.log('Prioprity', priority)
  let filteredTasks

  switch (priority) {
    case Priority.Low:
      filteredTasks = props.listOfTasks?.filter((task) => task.priority === 0)

      break
    case Priority.Medium:
      filteredTasks = props.listOfTasks?.filter((task) => task.priority === 1)
      break
    case Priority.High:
      filteredTasks = props.listOfTasks?.filter((task) => task.priority === 2)
      break
    default:
      // Handle unexpected priority values
      console.error('Invalid priority value:', priority)
      return
  }
  listOfFilteredTasks.value = filteredTasks ?? []
}
</script>

<template>
  <div class="h-full bg-color242428 rounded-lg">
    <div class="flex items-center justify-between p-4">
      <p class="text-lg font-semibold text-colorA6A6A6">{{ heading }}</p>
      <div>
        <DropDownMenu
          @onChange="getSelectedMenu"
          :list="[
            {
              name: 'Date',
              value: 0
            },
            {
              name: 'High',
              value: 1
            },

            {
              name: 'Medium',
              value: 2
            },
            {
              name: 'Low',
              value: 3
            },
            {
              name: 'Reset',
              value: 4
            }
          ]"
        >
          <FontAwesomeIcon class="mr-2 text-colorA6A6A6" :icon="faEllipsis" />
        </DropDownMenu>
        <!-- <FontAwesomeIcon class="mr-2 text-colorA6A6A6" :icon="faAdd" /> -->
      </div>
    </div>
    <div class="h-800 overflow-y-auto">
      <div v-if="loading">
        <div class="flex justify-center mt-10">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <div v-else v-for="item in listOfFilteredTasks" :key="item._id">
        <TaskCard :task="item" />
      </div>
    </div>
  </div>
</template>
