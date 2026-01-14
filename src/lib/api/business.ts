import { ApiResponse, Paginator } from "@/types/base";
import { base_api, base_url, howl } from "../utils";
import { BusinessMapType, CategoryType, EmployeeType, FollowerType, ProductType, PromotionType, salaryType, StockType, StoreFrontType, TransactionType } from "@/types/dbs/business";

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
): Promise<ApiResponse<Paginator<ProductType[]>>> {
  return howl(`/business/product?per_page=50`, { token });
}
export async function addProduct(
  token: string,
  body: FormData
): Promise<ApiResponse<ProductType[]>> {
  const res = await fetch(`${base_url}${base_api}/business/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Note: Don't set Content-Type for FormData; the browser handles it automatically
      accept: "application/json",
    },
    body,
  });
  // if (!res.ok) {
    //   throw new Error(`HTTP ${res.status}`);
    // }
    const data = await res.json();
    return data;
  }
  
  export async function updateProduct(
    token: string,
    body: FormData,
    id: string
  ): Promise<ApiResponse<ProductType[]>> {
    const res = await fetch(`${base_url}${base_api}/business/product/${id}?_method=PATCH`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type for FormData; the browser handles it automatically
        accept: "application/json",
    },
    body,
  });
  
  const data = await res.json();
  return data;
  
}

export async function deleteProduct(
  token: string,
  id: string
): Promise<ApiResponse<ProductType>> {
  return howl(`/business/product/${id}`, { token ,method: "DELETE" });
}
export async function getStocks(
  token: string,
): Promise<ApiResponse<StockType[]>> {
  return howl(`/business/get-stock-requests`, { token });
}
export async function restockApi(
  token: string,
  id: string,
  restockAmm: string
): Promise<ApiResponse<StockType>> {
  return howl(`/business/stock-update/${id}?restock_quantity=${restockAmm}`, { token,method: "PATCH" });
}



export async function getEmployeesApi(
  token: string,
): Promise<ApiResponse<EmployeeType[]>> {
  return howl(`/business/employee`, { token });
}
export async function addEmployee(
  token: string,
  body:{
    full_name:string,
    email:string,
    address:string,
    status:string,
  }
): Promise<ApiResponse<EmployeeType>> {
  return howl(`/business/employee`, { token, body, method: "POST" });
}
export async function updateEmployee(
  token: string,
  id:string,
  body:{
    full_name:string,
    status:string,
  }
): Promise<ApiResponse<EmployeeType>> {
  return howl(`/business/employee/${id}?_method=PATCH`, { token, body: {
    full_name: body.full_name,
    status: body.status
  }, method: "POST" });
}
export async function deleteEmployeeApi(
  token: string,
  id: string
): Promise<ApiResponse<EmployeeType>> {
  return howl(`/business/employee/${id}`, { token ,method: "DELETE" });
}



export async function getSalary(
  token: string,
): Promise<ApiResponse<salaryType[]>> {
  return howl(`/business/salary`, { token });
}

export async function addSalary(
  token: string,
  body:{
    employee_id:string|number,
    month:string,
    year:string,
    amount:string,
  }
): Promise<ApiResponse<salaryType>> {
  return howl(`/business/salary`, { token, body, method: "POST" });
}

export async function updateSalary(
  token: string,
  id:string,
  body:{
    employee_id:string|number,
    month:string,
    year:string,
amount:string,
  }
): Promise<ApiResponse<salaryType>> {
  return howl(`/business/salary/${id}?_method=PATCH`, { token, body, method: "POST" });
}

export async function deleteSalary(
  token: string,
  id: string
): Promise<ApiResponse<salaryType>> {
  return howl(`/business/salary/${id}`, { token ,method: "DELETE" });
}

export async function confirmSalary(
  token: string,
  id:string,
): Promise<ApiResponse<salaryType>> {
  return howl(`/business/confirm-salary/${id}`, { token, method: "PATCH" });
}


export async function getPromotions(
  token: string,
): Promise<ApiResponse<PromotionType[]>> {
  return howl(`/business/promotion`, { token });
}

export async function addPromotion(
  token: string,
  body:FormData
): Promise<ApiResponse<PromotionType[]>> {
  const res = await fetch(`${base_url}${base_api}/business/promotion`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type for FormData; the browser handles it automatically
        accept: "application/json",
      },
      body,
    });
    const data = await res.json();
    return data;
  }
  export async function editPromotion(
    token: string,
    id:string,
    body:FormData
  ): Promise<ApiResponse<PromotionType>> {
    const res = await fetch(`${base_url}${base_api}/business/promotion/${id}?_method=PATCH`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type for FormData; the browser handles it automatically
        accept: "application/json",
      },
      body,
    });
    const data = await res.json();
    return data;
  }
  export async function deletePromotion(
    token: string,
    id: string
  ): Promise<ApiResponse<PromotionType[]>> {
    return howl(`/business/promotion/${id}`, { token, method: "DELETE" });
  }