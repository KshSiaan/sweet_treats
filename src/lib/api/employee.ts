import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { StockType } from "@/types/dbs/employee";
import { CategoryType } from "@/types/dbs/business";



export async function getStocks(
  token: string
): Promise<ApiResponse<StockType[]>> {
  return howl(`/employee/get-stocks`, { token });
}

export async function requestStock(
  token: string,
    product_id:string,
    business_id:string,
    required_stock:string,
): Promise<ApiResponse<StockType>> {
  return howl(`/employee/stock-request`, { token ,method: "POST" ,body:{
    product_id,
    business_id,
    required_stock
  }});
}

export async function getEmployeeCategories(
  token: string,
  business_id:string,
): Promise<ApiResponse<{
  id: number
  business_category_id: number
  business_id: number
  name: string
  created_at: string
  updated_at: string
}[]>> { 
  return howl(`/employee/product-category?business_category_id=${business_id}`, { token });
}