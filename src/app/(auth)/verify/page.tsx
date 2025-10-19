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
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";

import React from "react";

export default function Page() {
  return (
    <main className="bg-primary h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 text-background bg-background/40 border-background/40 shadow-white!  aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full ">
          <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
            <span className="text-background">Verify</span>{" "}
            <span className="relative">
              Identity
              <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
            </span>
          </CardTitle>
          <CardDescription className="text-center mt-2 text-background">
            Create a strong and secure password
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center px-12 w-full">
          <InputOTP maxLength={6}>
            <InputOTPSlot index={0} className=" border rounded-sm" />
            <InputOTPSlot index={1} className=" border rounded-sm" />
            <InputOTPSlot index={2} className=" border rounded-sm" />
            <InputOTPSlot index={3} className=" border rounded-sm" />
            <InputOTPSlot index={4} className=" border rounded-sm" />
            <InputOTPSlot index={5} className=" border rounded-sm" />
          </InputOTP>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-2/3 mx-auto" asChild>
            <Link href={"/reset"}>Verify Code</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
