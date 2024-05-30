import {type CustomResponse } from "../types/CustomResponse";
import {type TaskHistory } from "../types/TaskHistory";
import axiosInstance from "../service/api_service";

export default async function taskHistoryRepository(): Promise<
  CustomResponse<TaskHistory[] | null>
> {
  try {
    const url: string = "task/history";
    const response = await axiosInstance.get(url);
    return response.data as CustomResponse<TaskHistory[]>;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data["message"]) {
        const errorResponse: CustomResponse<null> = {
          success: false,
          message: error.response.data["message"],
          data: null,
        };
        return errorResponse;
      } else {
        throw new Error("An error occurred during login.");
      }
    } else {
      throw new Error("An error occurred during login.");
    }
  }
}
