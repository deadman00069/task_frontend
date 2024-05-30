<script setup lang="ts">
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import InfoCard from '../components/InfoCard.vue'
import GoodMorningSection from '../components/GoodMorningSection.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomLoading from '@/components/CustomLoading.vue'
import axiosInstance from '@/service/api_service'
import { onMounted, ref } from 'vue'
import taskHistoryRepository from '@/repository/get_task_history_repository'
import type { TaskHistory } from '@/types/TaskHistory'
import { timeout } from '@/utils/Utils'
import AppConfig from '@/config/AppConfig'

const _loading = ref(false)
const taskHistoryData = ref<TaskHistory>()

const getHistory = async () => {
  try {
    _loading.value = true

    await timeout(AppConfig().apiDelay)
    const resp = await taskHistoryRepository()
    if (resp != null && resp.data != null) {
      taskHistoryData.value = resp.data[0]
    }
  } catch (error) {
    console.log(error)
  } finally {
    _loading.value = false
  }
}

onMounted(() => {
  getHistory()
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-4">
    <GoodMorningSection />

    <Calendar class="my-calendar" borderless expanded :is-dark="true">
      <template #footer>
        <div class="w-full px-4 h-12"></div>
      </template>
    </Calendar>

    <InfoCard label="Total Tasks" :count="taskHistoryData?.totalTasks" :loading="_loading" />
    <InfoCard
      label="Total Completed Tasks"
      :count="taskHistoryData?.totalCompleted"
      :loading="_loading"
    />
    <InfoCard
      label="Total OnGoing Tasks"
      :count="taskHistoryData?.totalOngoing"
      :loading="_loading"
    />
    <InfoCard
      label="Total Pending Tasks"
      :count="taskHistoryData?.totalPending"
      :loading="_loading"
    />
  </div>
</template>

<style>
.my-calendar {
  border-radius: 8px;
  height: '100%';
}
</style>
