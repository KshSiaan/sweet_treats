import { ApiResponse } from "@/types/base";
import { base_api, base_url, howl } from "../utils";
import { loginResponse, UserType } from "@/types/auth";



export async function loginApi({email,password,role}:{email:string,password:string,role:string}):Promise<ApiResponse<loginResponse>>{
    return howl(`/login`,{method:"POST",body:{email,password,role}});
}
export async function forgotApi({email}:{email:string}):Promise<ApiResponse<{otp?:string}>>{
    return howl(`/forgot-password`,{method:"POST",body:{email}});
}
export async function verifyOtpApi({otp}:{otp:string}):Promise<ApiResponse<loginResponse>>{
    return howl(`/verify-otp`,{method:"POST",body:{otp}});
}
export async function changePasswordApi({password,password_confirmation,token}:{token:string,password:string,password_confirmation:string}):Promise<ApiResponse<any>>{
    return howl(`/change-password`,{method:"POST",body:{password,password_confirmation},token});
}
export async function getMeApi(token:string):Promise<ApiResponse<{user:UserType}>>{
    return howl(`/get-profile`,{token});
}
export async function updateMeApi(token:string,body:{full_name?:string,store_location?:string}):Promise<ApiResponse<{user:UserType}>>{
    return howl(`/personalization`,{token,body,method:"POST"});
}
export async function updateAvatar(
  token: string,
  body: FormData
): Promise<ApiResponse<{ user: UserType }>> {
  const res = await fetch(`${base_url}${base_api}/personalization`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!res.ok) {
    throw new Error("Failed to update avatar");
  }

  return res.json();
}


export async function updatePass(token:string,body:{
    current_password: string;
    password: string;
    password_confirmation: string;
}):Promise<ApiResponse<{user:UserType}>>{
    return howl(`/update-password`,{token,body,method:"POST"});
}


