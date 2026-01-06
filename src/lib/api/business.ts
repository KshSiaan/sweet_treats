import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { BusinessMapType, CategoryType, FollowerType, ProductType, StoreFrontType, TransactionType } from "@/types/dbs/business";

export async function getStoreFronts(
  token: string
): Promise<ApiResponse<StoreFrontType>> {
  return howl(`/business/get-store-front`, { token });
}
export async function getCategories(
  token: string
): Promise<ApiResponse<CategoryType>> {
  return howl(`/business/product-category`, { token });
}
export async function addCategory(
  token: string,
  body: { name: string; business_category_id?: number }
): Promise<ApiResponse<CategoryType>> {
  return howl(`/business/product-category`, { token , body, method: "POST" });
}
export async function getFollowers(
  token: string
): Promise<ApiResponse<FollowerType[]>> {
  return howl(`/business/get-follower-list`, { token });
}
export async function getTransaction(
  token: string
): Promise<ApiResponse<TransactionType>> {
  return howl(`/get-transactions`, { token });
}
export async function getBusinessMap(
  token: string
): Promise<ApiResponse<BusinessMapType>> {
  return howl(`/business/get-map`, { token });
}
export async function updateBusinessMap(
  token: string,
  body: { google_map_embed_code: string }
): Promise<ApiResponse<BusinessMapType>> {
  return howl(`/business/create-or-update-map`, { token, body, method: "POST" });
}



export async function getProducts(
  token: string
): Promise<ApiResponse<ProductType[]>> {
  return howl(`/business/product`, { token });
}