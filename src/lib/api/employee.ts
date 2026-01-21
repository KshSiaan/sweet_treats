import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { InvoiceType, ProductType, StockType } from "@/types/dbs/employee";
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
export async function getEmployeeProducts(
  token: string,
  product_category_id:string,
): Promise<ApiResponse<ProductType[]>> { 
  return howl(`/employee/get-products?product_category_id=${product_category_id}`, { token });
}


export async function createInvoiceApi(
  token: string,
  body:{
  business_id: number
  amount_info: {
    sub_total: number
    discount: number
    total_amount: number
  }
  order_item: Array<{
    product_id: number
    product_name: string
    product_price: number
    quantity: number
    unit?: string
    count?: number
  }>
  payment_method: string
}
): Promise<ApiResponse<InvoiceType[]>> { 
  return howl(`/employee/create-invoice`, { token,method:"POST",body });
}

export async function getInvoiceHistory(
  token: string
): Promise<ApiResponse<InvoiceType[]>> { 
  return howl(`/employee/get-invoices`, { token });
}