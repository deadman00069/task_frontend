<script setup>
import { useTasks } from '../vue-query/useTasks.ts'
import { Status } from '../consts/enums'

// Fetch tasks for different statuses
const {
  data: ongoingTasks,
  error: errorOngoing,
  isLoading: isLoadingOngoing,
  isError: isErrorOngoing
} = useTasks(Status.Ongoing)
const {
  data: pendingTasks,
  error: errorPending,
  isLoading: isLoadingPending,
  isError: isErrorPending
} = useTasks(Status.Pending)
const {
  data: completedTasks,
  error: errorCompleted,
  isLoading: isLoadingCompleted,
  isError: isErrorCompleted
} = useTasks(Status.Completed)
</script>

<template>
  <div>
    <h1>Tasks</h1>

    <div class="task-category">
      <h2>Ongoing</h2>
      <div v-if="isLoadingOngoing">Loading...</div>
      <div v-if="isErrorOngoing">Error: {{ errorOngoing.message }}</div>
      <ul v-if="ongoingTasks">
        <li v-for="task in ongoingTasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>

    <div class="task-category">
      <h2>Pending</h2>
      <div v-if="isLoadingPending">Loading...</div>
      <div v-if="isErrorPending">Error: {{ errorPending.message }}</div>
      <ul v-if="pendingTasks">
        <li v-for="task in pendingTasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>

    <div class="task-category">
      <h2>Completed</h2>
      <div v-if="isLoadingCompleted">Loading...</div>
      <div v-if="isErrorCompleted">Error: {{ errorCompleted.message }}</div>
      <ul v-if="completedTasks">
        <li v-for="task in completedTasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>
