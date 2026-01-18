
import type { AdminContenttype, AdminDashboardApiType} from "@/types/admin";
import { howl } from "../utils";
import type { ApiResponse, Paginator } from "@/types/base";
import type { BranchType, BusinessUserType, CashVerificationType, EventWinner, LeaderboardType, PaymentType, RefundType, TeamType, TransactionsApi, UserType } from "@/types/auth";

export async function AdminDashboardApi(
  token: string,
  page: number = 1,
  perPage: number = 2
): Promise<ApiResponse<AdminDashboardApiType>> {
  return howl(
    `/admin/dashboard-info?page=${page}&per_page=${perPage}`,
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