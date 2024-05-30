import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'
import { Status } from '../consts/enums'
import AppConfig from '@/config/AppConfig'
import { timeout } from '@/utils/Utils'
import taskListRepository from '@/repository/get_task_list_repository'
import { createTaskRepository } from '@/repository/create_task_repository'
import type { CreateTaskFormData } from '@/types/CreateTaskFormData'
import { toast } from 'vue3-toastify'
import  {useTasks}  from '@/vue-query/useTasks'

export const useTasksStore = defineStore('tasks', () => {
  // const _loadingPending = ref(false)
  // const _loadingOnGoing = ref(false)
  // const _loadingCompleted = ref(false)
  const _loadingCreateTask = ref(false)
  // //
  // const _listOfPendingTasks = ref<Task[]>([])
  // const _listOfOnGoingTasks = ref<Task[]>([])
  // const _listOfCompletedTasks = ref<Task[]>([])

  const {
    data: _listOfOnGoingTasks,
    error: errorOngoing,
    isLoading: _loadingOnGoing,
    isError: isErrorOngoing
  } = useTasks(Status.Ongoing)
  const {
    data: _listOfPendingTasks,
    error: errorPending,
    isLoading: _loadingPending,
    isError: isErrorPending
  } = useTasks(Status.Pending)
  const {
    data: _listOfCompletedTasks,
    error: errorCompleted,
    isLoading: _loadingCompleted,
    isError: isErrorCompleted
  } = useTasks(Status.Completed)

  // const getAllTasks = async (status: Status) => {
  //   switch (status) {
  //     case Status.Ongoing:
  //       _loadingOnGoing.value = true
  //       break
  //     case Status.Pending:
  //       _loadingPending.value = true
  //       break
  //     case Status.Completed:
  //       _loadingCompleted.value = true
  //       break
  //   }

  //   try {
  //     await timeout(AppConfig().apiDelay)
  //     const resp = await taskListRepository(status)
  //     if (resp.success) {
  //       console.log('### Yehh bpoo', resp.data)
  //       if (status === Status.Ongoing) {
  //         _listOfOnGoingTasks.value = resp.data ?? []
  //       } else if (status === Status.Pending) {
  //         _listOfPendingTasks.value = resp.data ?? []
  //       } else if (status === Status.Completed) {
  //         _listOfCompletedTasks.value = resp.data ?? []
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching ${status} tasks:`, error)
  //   } finally {
  //     switch (status) {
  //       case Status.Ongoing:
  //         _loadingOnGoing.value = false
  //         break
  //       case Status.Pending:
  //         _loadingPending.value = false
  //         break
  //       case Status.Completed:
  //         _loadingCompleted.value = false
  //         break
  //     }
  //   }
  // }

  const createTask = async (task: CreateTaskFormData): Promise<Boolean> => {
    
    try {
      _loadingCreateTask.value = true
      await timeout(AppConfig().apiDelay)




      
      const response = await createTaskRepository(task)
      if (response != null && response.success) {
        
        console.log('####dsfdsfdsf', response.data)
        toast.success('Create task success')

        console.log('#Taskk status', task.status)
        // switch (task.status) {
        //   case 0:
        //     getAllTasks(Status.Ongoing)
        //     break
        //   case 1:
        //     getAllTasks(Status.Pending)
        //     break
        //   case 2:
        //     getAllTasks(Status.Completed)
        //     break
        // }
        return true
      } else {
        toast.error('Task creation fails')
      }
    } catch (error) {
      console.log(error)
    } finally {
      _loadingCreateTask.value = false
    }
    return false
  }

  return {
    _loadingPending,
    _loadingOnGoing,
    _loadingCompleted,
    _listOfPendingTasks,
    _listOfOnGoingTasks,
    _listOfCompletedTasks,
    _loadingCreateTask,
    errorOngoing,
    errorPending,
    errorCompleted,
    isErrorOngoing,
    isErrorCompleted,
    isErrorPending,
    createTask
  }
})
