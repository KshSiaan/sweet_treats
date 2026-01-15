


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