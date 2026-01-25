
import type { AdminContenttype, AdminDashboardApiType} from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse, Paginator } from "@/types/base";
import type { BranchType, BusinessUserType, CashVerificationType, EventWinner, LeaderboardType, PaymentType, RefundType, TeamType, TransactionsApi, UserType } from "@/types/auth";

export async function AdminDashboardApi(
  token: string,
): Promise<ApiResponse<AdminDashboardApiType>> {
  return howl(
    `/admin/get-admin-dashboard-info`,
    { token }
  );
}

export async function getAdminCategories(token:string):Promise<ApiResponse<{
            id: number,
            name: string,
            description: string,
            business: number
}[]>>{
    return howl(`/admin/business-category`,{token});
}
export async function getAdminUsers(token:string,page:number,perPage:number):Promise<ApiResponse<Paginator<UserType[]>>>{ 
    return howl(`/admin/get-users?per_page=${perPage}&page=${page}`, { token });
}
export async function adminSuspendToggle(token: string, userId: number): Promise<ApiResponse<UserType>> {
    return howl(`/admin/action-toggle/${userId}`, {
      token,
      method: "PATCH",
    });
}
export async function getAdminBusinessUsers(token:string,page:number,perPage:number):Promise<ApiResponse<Paginator<BusinessUserType[]>>>{ 
    return howl(`/admin/get-business-accounts?per_page=${perPage}&page=${page}`, { token });
}
export async function getAdminContents(token:string):Promise<ApiResponse<AdminContenttype[]>>{ 
    return howl(`/admin/get-contents`, { token });
}
export async function approveAdminContent(token:string, id: number):Promise<ApiResponse<AdminContenttype>>{ 
    return howl(`/admin/approved/${id}`, { token,method:"PATCH" });
}
export async function removeAdminContent(token:string, id: number):Promise<ApiResponse<AdminContenttype>>{ 
    return howl(`/admin/remove/${id}`, { token,method:"DELETE" });
}

export async function getAdminWithdrawRequest(
  token: string
): Promise<ApiResponse<{
    id: number
    user_id: number
    total_amount: string
    date: string
    status: string
    created_at: string
    updated_at: string
    user: {
      id: number
      full_name: string
      role: string
      avatar_url: string
    }
  }[]>> {
  return howl(`/admin/get-withdraw-requests`, { token });
}

export async function acceptWithdrawRequest(token: string, id: number): Promise<ApiResponse<{
    id: number
    user_id: number
    total_amount: string
    date: string
    status: string
    created_at: string
    updated_at: string
    user: {
      id: number
      full_name: string
      role: string
      avatar_url: string
    }
  }>> {
  return howl(`/admin/request-accept/${id}`, {
    token,
    method: "PATCH",
  });
}

export async function rejectWithdrawRequest(token: string, id: number): Promise<ApiResponse<{
    id: number
    user_id: number
    total_amount: string
    date: string
    status: string
    created_at: string
    updated_at: string
    user: {
      id: number
      full_name: string
      role: string
      avatar_url: string
    }
  }>> {
  return howl(`/admin/request-decline/${id}`, {
    token,
    method: "PATCH",
  });
}

export async function getPage(key: string):Promise<ApiResponse<{
  slug: string
  title: string
  content: string
  updated_at: string
  created_at: string
  id: number
}>>{
  return howl(`/pages/${key}`)
}

export async function updatePage(token:string, key: string,body:{title:string, content:string}):Promise<ApiResponse<{
  slug: string
  title: string
  content: string
  updated_at: string
  created_at: string
  id: number
}>>{
  return howl(`/pages/${key}`,{
    token,
    method:"POST",
    body:{
      ...body
    }
  })
}