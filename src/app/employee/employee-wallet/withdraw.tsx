"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getMeApi } from "@/lib/api/auth";
import Link from "next/link";
import { connectStripeAccount, createWithdraw } from "@/lib/api/global";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Withdraw({ token }: { token: string | undefined }) {
  const [amount, setAmount] = React.useState<number | string>("");
  if (!token) {
    return null;
  }
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMeApi(token),
    enabled: !!token,
  });
  const { mutate, isPending: isMutating } = useMutation({
    mutationKey: ["connect_stripe_acc"],
    mutationFn: () => {
      return connectStripeAccount(token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
      console.log(err);
    },
    onSuccess: (res) => {
      toast.success("Redirecting to Stripe to complete onboarding");
      window.location.href = res.onboarding_url;
    },
  });

  const { mutate: withdraw, isPending: withdrawing } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: () => {
      return createWithdraw(token, amount);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      setAmount("");
    },
  });

  if (!data?.data.user.stripe_account_id) {
    return (
      <Button
        className="bg-blue-500"
        onClick={() => {
          mutate();
        }}
        disabled={isPending || isMutating}
      >
        {isPending || isMutating ? (
          "Loading..."
        ) : (
          <>
            <PlusIcon />
            Withdraw {data?.data.user.stripe_account_id}
          </>
        )}
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500">
          <PlusIcon />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0! ">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Withdraw</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4">
          <Label>Amount</Label>
          <Input
            placeholder="Enter fund amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => withdraw()} disabled={withdrawing}>
            {withdrawing ? "Processing..." : "Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
