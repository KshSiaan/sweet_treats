import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StripePaymentInfo {
  paymentIntent: string;
  clientSecret: string;
  amount: number;
  formData: {
    business_id: number;
    amount_info: {
        sub_total: number;
        discount: number;
        total_amount: number;
    };
    customer_info: {
        name: string;
        address: string;
        phone_number: string;
    };
    order_item: {
        product_id: number;
        product_name: string;
        product_price: number;
        quantity: number;
        unit: string;
        count: number;
        business_category_id: number;
        product_category_id: number;
    }[];
    payment_method: string;
} | null;
  setPaymentInfo: (info: Omit<StripePaymentInfo, "setPaymentInfo">) => void;
}

export const usePosInfo = create<StripePaymentInfo>()(
  persist(
    (set) => ({
      paymentIntent: "",
      clientSecret: "",
      amount: 0,
      formData: null,
      setPaymentInfo: (info) => set(info),

    }),
    {
      name: "pos", // key in localStorage
    }
  )
);
