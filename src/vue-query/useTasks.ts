import { useMutation, useQuery } from '@tanstack/vue-query'
import taskListRepository from '../repository/get_task_list_repository'
import { Status } from '../consts/enums'
import { timeout } from '@/utils/Utils'
import type { Task } from '@/types/Task'
import { createTaskRepository } from '@/repository/create_task_repository'
import type { CreateTaskFormData } from '@/types/CreateTaskFormData'

const fetchTasks = async (status: Status) => {
  await timeout(4000)
  const response = await taskListRepository(status)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response.data
}

const createTask = async (task:CreateTaskFormData)=>{
  await timeout(4000)
  const response = await createTaskRepository(task)
  if (!response.success) {
    throw new Error(response.message)
  }
  return response.data
}

export const useTasks = (status: Status) => {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => fetchTasks(status)
  })
}

export const useTaskMutation = (task:Task)=>{
  return  useMutation({
    mutationFn: () => createTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
