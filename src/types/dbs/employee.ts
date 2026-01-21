


export interface StockType {
    id: number
    business_id: number
    product_name: string
    stock: number
    alert_lavel: string
    request?: Array<{
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
    }>
  }

  export interface ProductType{
  id: number
  business_id: number
  business_category_id: number
  product_name: string
  product_category_id: number
  price: string
  unit: string
  product_images: Array<string>
  stock: any
  description: string
  availability: any
  created_at: string
  updated_at: string
  buy1get1: boolean
  discount: boolean
  rating: number
  rating_count: number
}