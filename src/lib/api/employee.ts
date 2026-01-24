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

export async function employeeDashboardStats(
  token: string
): Promise<ApiResponse<{
  "total_online_sales": number,
  "total_in_store_sales": number,
  "total_sales": number,
  "incoming_orders": number,
  "pending_orders": number,
  "conpleted_orders": number
}>> {
  return howl(`/employee/dashboard-info`, { token });
}

export async function getRecentOrders(
  token: string,
  filter:'Pending' | 'Canceled' | 'In Progress' | 'Ready' | 'On The Way' | 'Delivery Accepted',
): Promise<ApiResponse<{
  id: number
  order_number: string
  customer_id: number
  business_id: number
  order_date: string
  amount_info: {
    sub_total: number
    shipping_cost: number
    discount: number
    total_amount: number
  }
  order_item: Array<{
    product_id: number
    business_category_id: number
    product_category_id: number
    product_name: string
    product_price: number
    quantity: number
  }>
  shipping_info: {
    name: string
    address: string
    city: string
    zip: number
    phone_number: string
  }
  payment_method: string
  status: string
  assign_employee_id: number
  transaction_id: any
  created_at: string
  updated_at: string
}[]>> { 
  return howl(`/employee/get-orders?filter=${encodeURIComponent(filter)}`, { token });
}