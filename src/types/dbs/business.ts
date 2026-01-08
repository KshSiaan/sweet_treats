export interface StoreFrontType {
  id: number;
  business_id: number;
  images:string[];
  video_path: string;
  caption: any;
  duration: string;
  created_at: string;
  updated_at: string;
}

export type BusinessCategory =
  | "retail"
  | "labour_service"
  | "food_service"
  | "rental"
  | "ecommerce"

export type CategoryType = Record<BusinessCategory, CategoryItem[]>

export interface CategoryItem {
  id: number
  business_category_id: number
  business_id: number
  name: string
  created_at: string
  updated_at: string
}


export interface FollowerType {
    id: number
    customer_id: number
    follower_id: number
    created_at: string
    updated_at: string
    order_count: number
    customer: {
      id: number
      full_name: string
      role: string
      email: string
      status: string
      avatar_url: string
    }
  }


  export interface TransactionType {
    available_balance: number
    transactions_histories: {
      current_page: number
      data: Array<{
        id: number
        trx_id: string
        order_number: any
        payment_intent_id: string
        user_id: number
        type: string
        message: string
        amount: string
        date: string
        status: string
        created_at: string
        updated_at: string
      }>
      first_page_url: string
      from: number
      last_page: number
      last_page_url: string
      links: Array<{
        url?: string
        label: string
        page?: number
        active: boolean
      }>
      next_page_url: any
      path: string
      per_page: number
      prev_page_url: any
      to: number
      total: number
    }
  }

export interface BusinessMapType {
  id: number
  business_id: number
  google_map_embed_code: string
  created_at: string
  updated_at: string
}

export interface ProductType {
  id: number
  business_id: number
  business_category_id: number
  product_name: string
  product_category_id: number
  price: string
  unit?: string
  product_images: Array<string>
  stock?: number
  description: string
  availability: any
  created_at: string
  updated_at: string
}
export interface StockType {
  id: number
  employee_id: number
  business_id: number
  product_id: number
  required_stock: number
  status: string
  created_at: string
  updated_at: string
  product: {
    id: number
    product_name: string
    stock: number
    created_at: string
  }
}


export interface EmployeeType {
    id: number
    empId: number
    business_id: number
    employee_id: number
    created_at: string
    updated_at: string
    employee: {
      id: number
      full_name: string
      role: string
      email: string
      status: string
      avatar_url: string
    }
  }

  export interface salaryType {
  id: number
  business_id: number
  employee_id: number
  month: string
  year: string
  amount: string
  status: string
  created_at: string
  updated_at: string
  employee: {
    id: number
    full_name: string
    role: string
    avatar_url: string
  }
}

export interface PromotionType {
    id: number
    business_category_id: number
    business_id: number
    title: string
    image: string
    type: string
    discount_value: number
    starting_date: string
    ending_date: string
    use_code: any
    description: string
    target_category_id: number
    is_specific: boolean
    target_products: any
    created_at: string
    updated_at: string
  }