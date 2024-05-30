import { type CustomResponse } from '../types/CustomResponse'
import axiosInstance from '../service/api_service'
import { type CreateTaskFormData } from '@/types/CreateTaskFormData'
import type { Task } from '@/types/Task'

export async function createTaskRepository(
  data: CreateTaskFormData
): Promise<CustomResponse<Task | null>> {
  try {
    const url: string = 'task'
    const response = await axiosInstance.post(url, data)
    return response.data as CustomResponse<Task>
  } catch (error: any) {
    if (error.response) {
      if (error.response.data['message']) {
        const errorResponse: CustomResponse<null> = {
          success: false,
          message: error.response.data['message'],
          data: null
        }
        return errorResponse
      } else {
        throw new Error('An error occurred during login.')
      }
    } else {
      throw new Error('An error occurred during login.')
    }
  }
}
