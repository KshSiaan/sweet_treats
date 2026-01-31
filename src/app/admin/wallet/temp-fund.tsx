"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fundApi, getGlobalUsers, transferApi } from "@/lib/api/global";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStripeInformation } from "@/lib/store/stripe";

// 1️⃣ Zod Schema
const transferSchema = z.object({
  to: z.string().min(1, "Recipient is required"),
  amount: z.string().min(1, "Amount is required"),
});

type TransferFormValues = z.infer<typeof transferSchema>;

export default function TempFund() {
  const [{ token }] = useCookies(["token"]);
  const { setPaymentInfo } = useStripeInformation();
  const navig = useRouter();
  const { data } = useQuery({
    queryKey: ["user_list"],
    queryFn: async () => {
      return getGlobalUsers(token);
    },
  });

  // 2️⃣ React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      to: "",
      amount: "",
    },
  });
  const { mutate, isPending: transferring } = useMutation({
    mutationKey: ["fund_user"],
    mutationFn: (body: TransferFormValues) => {
      return fundApi(token, body.to, { amount: body.amount });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      setPaymentInfo({
        paymentIntent: res.data.id,
        clientSecret: res.data.client_secret,
        amount: res.data.amount,
      });
      navig.push("/admin/wallet/fund");
    },
  });

  const onSubmit = (values: TransferFormValues) => {
    mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add Fund
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Transfer Funds</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">
          <Label>Send to</Label>
          <Select onValueChange={(val) => setValue("to", val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Business" />
            </SelectTrigger>
            <SelectContent>
              {data?.data.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.profile.store_name || user.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.to && (
            <p className="text-red-500 text-sm">{errors.to.message}</p>
          )}

          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Enter fund amount"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </form>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit(onSubmit)} disabled={transferring}>
            {transferring ? "Transferring..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
