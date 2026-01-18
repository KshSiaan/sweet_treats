import { ApiResponse } from "@/types/base"
import { howl } from "../utils"


export async function createPaymentIntent(token:string,{
    amount,payment_method_types
}:{
    amount:number|string,
    payment_method_types:string
}):Promise<ApiResponse<{
    id: string
    object: string
    amount: number
    amount_capturable: number
    amount_details: {
      tip: Array<any>
    }
    amount_received: number
    application: any
    application_fee_amount: any
    automatic_payment_methods: any
    canceled_at: any
    cancellation_reason: any
    capture_method: string
    client_secret: string
    confirmation_method: string
    created: number
    currency: string
    customer: any
    customer_account: any
    description: any
    excluded_payment_method_types: any
    last_payment_error: any
    latest_charge: string
    livemode: boolean
    metadata: {
      user_id: string
    }
    next_action: any
    on_behalf_of: any
    payment_method: string
    payment_method_configuration_details: any
    payment_method_options: {
      card: {
        installments: any
        mandate_options: any
        network: any
        request_three_d_secure: string
      }
    }
    payment_method_types: Array<string>
    processing: any
    receipt_email: any
    review: any
    setup_future_usage: any
    shipping: any
    source: any
    statement_descriptor: any
    statement_descriptor_suffix: any
    status: string
    transfer_data: any
    transfer_group: any
  }>>{
    return howl(`/payment-intent`,{token,method:"POST",body:{
        amount,
        payment_method_types
    }});
}

export async function connectStripeAccount(token:string):Promise<{
    "status": boolean,
    "message": string,
    "onboarding_url": string,
    "stripe_account_id": string
}>{
    return howl(`/create-connected-account`,{token,method:"POST",body:{}});
}

export async function getGlobalUsers(token:string,type:"BUSINESS"|"CUSTOMER"|"EMPLOYEE"):Promise<ApiResponse<{
    id: number
    full_name: string
    role: string
    avatar_url: string
    profile: {
      id: number
      user_id: number
      store_name?: string
    }
  }[]>>{
    return howl(`/to-users?filter=${type}`,{token});
}
export async function transferApi(token:string,body:{
  to:string,
  amount:string,
  descripton?:string|undefined,
  purpose:string
}):Promise<ApiResponse<{
    sender: {
      id: number
      user_id: number
      wallet_balance: number
      user: {
        id: number
        full_name: string
        role: string
        avatar_url: string
      }
    }
    receiver: {
      id: number
      user_id: number
      wallet_balance: number
      user: {
        id: number
        full_name: string
        role: string
        avatar_url: string
      }
    }
  }>>{
    return howl(`/transfer`,{token, method: "POST", body});
}