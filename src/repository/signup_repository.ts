import {type CustomResponse } from "../types/CustomResponse";
import {type User } from "../types/User";
import axiosInstance from "../service/api_service";
import {type SignupFormData } from "@/types/SignupFormData";

export async function signupRepository(
  data: SignupFormData
): Promise<CustomResponse<User | null>> {
  try {
    const url: string = "auth/signup";
    const response = await axiosInstance.post(url, {
      email: data.email,
      user_name: data.userName,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    return response.data as CustomResponse<User>;
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
