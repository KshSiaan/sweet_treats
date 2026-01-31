"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment-form"; // ✅ your working form
import { notFound } from "next/navigation";
import { useStripeInformation } from "@/lib/store/stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Page() {
  const { paymentIntent, amount, clientSecret } = useStripeInformation();
  if (!paymentIntent || !amount || !clientSecret) {
    return notFound();
  }
  return (
    <main className="h-full w-full flex flex-col justify-center items-center">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          // appearance: {
          //   theme: "night",
          //   variables: {
          //     colorPrimary: "#FF4081",
          //     fontFamily: "sans-serif",
          //     colorBackground: "#131313",
          //     colorText: "#f8fafc",
          //     spacingUnit: "5px",
          //     borderRadius: "8px",
          //   },
          // },
        }}
      >
        <Card className="lg:w-2/3">
          <CardHeader>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>
              Secure payment processed through our encrypted gateway
            </CardDescription>
            {/* <p>{`Amount: $${(amount / 100).toFixed(2)}`}</p>
            <p>{`Payment Intent: ${paymentIntent}`}</p>
            <p>{`Client Secret: ${clientSecret}`}</p>
            <p>{`Public Stripe Key: ${process.env.NEXT_PUBLIC_STRIPE_KEY}`}</p> */}
          </CardHeader>
          <CardContent>
            <PaymentForm
              price={String(amount)}
              paymentId={paymentIntent ?? ""}
            />
            {/* <span className="flex flex-row justify-start items-center gap-4 mt-6">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-xs md:text-sm">
                I authorize this payment and agree to the Terms of Service and
                Privacy Policy.
              </Label>
            </span> */}
          </CardContent>
          <CardFooter>
            {/* Button lives inside PaymentForm for real stripe confirm */}
          </CardFooter>
        </Card>
      </Elements>
    </main>
  );
}
