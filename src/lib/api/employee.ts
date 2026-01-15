import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { StockType } from "@/types/dbs/employee";



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