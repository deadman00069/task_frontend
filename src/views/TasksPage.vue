<script setup lang="ts">
import { Status } from '@/consts/enums'
import CustomButton from '@/components/CustomButton.vue'
import TaskColumnWrapper from '@/components/TaskColumnWrapper.vue'
import CreateTaskDialog from '@/components/CreateTaskDialog.vue'
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const isClosed = ref(false)
const hiddenClass = ref('hidden')
const taskStore = useTasksStore()

const onClick2233 = () => {
  isClosed.value = !isClosed.value
  if (isClosed.value) {
    hiddenClass.value = ''
  } else {
    setTimeout(() => {
      hiddenClass.value = 'hidden'
    }, 200)
  }
}
</script>

<template>
  <CreateTaskDialog :hiddenClass="hiddenClass" @onClick="onClick2233" :isClosed="isClosed" />
  <div class="p-4">
    <div class="flex justify-between mb-8">
      <p class="text-4xl font-semibold text-white">My Tasks</p>
      <CustomButton @onClick="onClick2233">Add Task</CustomButton>
    </div>

    <div class="grid grid-cols-3 gap-x-8">
      <TaskColumnWrapper
        heading="OnGoing"
        :listOfTasks="taskStore._listOfOnGoingTasks ?? []"
        :loading="taskStore._loadingOnGoing"
      />
      <TaskColumnWrapper
        heading="Pending"
        :listOfTasks="taskStore._listOfPendingTasks ?? []"
        :loading="taskStore._loadingPending"
      />
      <TaskColumnWrapper
        heading="Completed"
        :listOfTasks="taskStore._listOfCompletedTasks ?? []"
        :loading="taskStore._loadingCompleted"
      />
    </div>
  </div>
  <!-- <div class="bg-red-300 h-800"></div> -->
</template>

<style lang="scss" scoped></style>
