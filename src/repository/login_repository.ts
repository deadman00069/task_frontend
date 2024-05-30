import { type CustomResponse } from "../types/CustomResponse";
import { type User } from "../types/User";
import axiosInstance from "../service/api_service";
import {type LoginFormData } from "@/types/LoginFormData";

export async function loginRepository(
  data: LoginFormData
): Promise<CustomResponse<LoginResponse | null>> {
  try {
    const url: string = "auth/login";
    const response = await axiosInstance.post(url, data);
    return response.data as CustomResponse<LoginResponse>;
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


type LoginResponse ={
  user:User;
  accessToken:string;
  refreshToken:string;
}