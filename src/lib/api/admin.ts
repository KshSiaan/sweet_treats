
import type { AdminContenttype, AdminDashboardApiType, claimType, RewardType} from "@/types/admin";
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
  return howl(`/pages/${key}`,{
    headers:{
      "Cache-Control":"no-store",
      "cache": "no-store"
    }
  })
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

export async function getRules(token:string):Promise<ApiResponse<{
    id: number
    activity_name: string
    days: Array<string>
    points_per_dollar: number
    status: string
    created_at: string
    updated_at: string
  }[]>>{
  return howl(`/admin/get-rules`, { token });
}
export async function updateRules(token:string,id:number|string,body:any){
  return howl(`/admin/update-rule/${id}?_method=PATCH`, { token,body, method:"POST" });
}
export async function getRewards(token:string):Promise<ApiResponse<RewardType[]>>{
  return howl(`/admin/get-rewards`, { token });
}
export async function addRewards(token:string,body:any):Promise<ApiResponse<RewardType>>{
  return howl(`/admin/add-reward`, { token,body, method:"POST" });
}
export async function editRewardById(token:string,id:number|string,body:any):Promise<ApiResponse<RewardType>>{
  return howl(`/admin/edit-reward/${id}?_method=PATCH`, { token,body, method:"POST" });
}
export async function deleteReward(token:string,id:number|string):Promise<ApiResponse<RewardType>>{
  return howl(`/admin/delete-reward/${id}`, { token, method:"DELETE" });
}


export async function getClaims(token:string):Promise<ApiResponse<claimType[]>>{
  return howl(`/admin/get-claim-requests`, { token });
}
export async function acceptClaim(token:string,id:number|string):Promise<ApiResponse<claimType>>{
  return howl(`/admin/claim-accepted/${id}`, { token, method:"PATCH" });
}
export async function cancelClaim(token:string,id:number|string):Promise<ApiResponse<claimType>>{
  return howl(`/admin/claim-cancel/${id}`, { token, method:"PATCH" });
}



export async function allWithdraws(token:string,):Promise<ApiResponse<{
  available_stripe_balance: number
  pending_stripe_balance: number
  message: string
  user_top_up_histories: Array<{
    id: number
    user_id: number
    deposit_amount: string
    net_topup_amount: string
    processing_fee_amount: string
    date: string
    status: string
    created_at: string
    updated_at: string
    user: {
      id: number
      full_name: string
      role: string
      email: string
      avatar_url: string
    }
  }>
}>>{
  return howl(`/admin/get-user-top-up-histories`, { token});
}