import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StripePaymentInfo {
  paymentIntent: string;
  clientSecret: string;
  amount: number;
  setPaymentInfo: (info: Omit<StripePaymentInfo, "setPaymentInfo">) => void;
}

export const useStripeInformation = create<StripePaymentInfo>()(
  persist(
    (set) => ({
      paymentIntent: "",
      clientSecret: "",
      amount: 0,
      setPaymentInfo: (info) => set(info),
    }),
    {
      name: "stripe-payment-info", // key in localStorage
    }
  )
);
