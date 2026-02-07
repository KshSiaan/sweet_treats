import { ApiResponse, Paginator } from "@/types/base"
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

export async function getGlobalUsers(token:string,type?:"BUSINESS"|"CUSTOMER"|"EMPLOYEE"):Promise<ApiResponse<{
    id: number
    full_name: string
    role: string
    email:string
    avatar_url: string
    profile: {
      id: number
      user_id: number
      store_name?: string
    }
  }[]>>{
    return howl(type?`/to-users?filter=${type}`:`/to-users`,{token});
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
export async function fundApi(token:string,id:string|number,body:{
  amount:string,

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
    deposite_by: string
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
}
>>{
    return howl(`/admin/add-money-intent?user_id=${id}`,{token, method: "POST", body:{...body,payment_method_types:"card"}});
}

export async function createWithdraw(token:string,amount:number|string):Promise<ApiResponse<{
        "user_id": number
        "total_amount": number,
        "withdrawal_amount_request": number,
        "platform_fee": number,
        "date": Date,
        "updated_at": Date,
        "created_at": Date,
        "id": number
    }[]>>{
  return howl(`/withdraw`,{token,method:"POST",body:{
    amount
  }});
}

export async function getNotifications(token:string):Promise<ApiResponse<Paginator<{
      id: string
      type: string
      notifiable_type: string
      notifiable_id: number
      data: {
        title: string
        is_body_use: boolean
        body: string
      }
      read_at: any
      created_at: string
      updated_at: string
    }[]>>>{
  return howl(`/get-notifications`,{token});
}

export async function markNotifAsRead(token:string,notifId:string):Promise<ApiResponse<{message:string}>>{
  return howl(`/read?notification_id=${notifId}`,{token,method:"PATCH"});
}
export async function markAllNotifAsRead(token:string):Promise<ApiResponse<{message:string}>>{
  return howl(`/read-all`,{token,method:"PATCH"});
}