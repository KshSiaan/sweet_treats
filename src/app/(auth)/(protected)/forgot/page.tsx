"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { forgotApi } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = React.useState("");
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot"],
    mutationFn: () => {
      return forgotApi({ email });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.push("/verify");
    },
  });

  return (
    <main className="bg-primary h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 text-background bg-background/40 border-background/40 shadow-white! aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
            <span className="text-background">Reset</span>{" "}
            <span className="relative">
              Password
              <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
            </span>
          </CardTitle>
          <CardDescription className="text-center mt-2 text-background">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-12 w-full">
          <Label>E-mail</Label>
          <Input
            className="text-foreground bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-6">
          <Button
            className="w-2/3 mx-auto"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Send Verification Code"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
