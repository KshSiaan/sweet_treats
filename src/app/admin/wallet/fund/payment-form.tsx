"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { apiConfig } from "@/lib/config";
import { useRouter } from "next/navigation";
import { base_api, base_url } from "@/lib/utils";
import { useCookies } from "react-cookie";

export default function PaymentForm({
  price,
  paymentId,
}: {
  price: string;
  paymentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [{ token }] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const navig = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      const data = {
        amount: price,
        status: "success",
        payment_intent_id: paymentIntent.id,
      };

      const res = await fetch(
        `${base_url}${base_api}/admin/add-money-success`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!result.status) {
        toast.error(result.message ?? "Payment failed");
        setIsLoading(false);
        return;
      }

      toast.success("Payment successful 💸");

      // ✅ hard redirect (guaranteed)
      window.location.href = "/admin/wallet";
      navig.refresh();
    } else {
      toast.error(
        `Payment failed: ${paymentIntent?.status ?? "Unknown status"}`,
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PaymentElement className="border-2 rounded-md border-slate-600 shadow-none! pb-0.5" />
      <Button
        className="w-full mt-6"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          <>Pay ${parseInt(price) / 100}</>
        )}
      </Button>
    </form>
  );
}
