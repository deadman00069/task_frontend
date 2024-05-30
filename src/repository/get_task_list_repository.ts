import { Status } from '../consts/enums'
import { type CustomResponse } from '../types/CustomResponse'
import { type Task } from '../types/Task'
import axiosInstance from '../service/api_service'

export default async function taskListRepository(
  status: Status
): Promise<CustomResponse<Array<Task> | null>> {
  try {
    let url: string
    switch (status) {
      case Status.Ongoing: {
        url = 'task?status=ongoing'
        break
      }
      case Status.Pending: {
        url = 'task?status=pending'
        break
      }
      case Status.Completed: {
        url = 'task?status=completed'
        break
      }
      default: {
        url = 'task?status=ongoing'

        break
      }
    }
    const response = await axiosInstance.get(url)
    const l = { ...response.data, data: response.data['data'] }

    return l
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
        throw new Error('An error occurred during login. ')
      }
    } else {
      throw new Error('An error occurred during login.')
    }
  }
}
