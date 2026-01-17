"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPaymentIntent } from "@/lib/api/global";

/* -------------------- Zod Schema -------------------- */
const depositSchema = z.object({
  amount: z.coerce.number().min(1),
  payment_method_types: z.string(),
});

type DepositForm = z.infer<typeof depositSchema>;

/* -------------------- Component -------------------- */
export default function Deposit() {
  const form = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      payment_method_types: "card",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["payment_intent"],
    mutationFn: (body: {
      amount: number | string;
      payment_method_types: string;
    }) => {
      return createPaymentIntent("token", body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });

  const onSubmit = (data: DepositForm) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Deposit
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Deposit Funds</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-1">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter fund amount"
                {...form.register("amount")}
              />
            </div>

            <div className="space-y-1">
              <Label>Payment method</Label>
              <Select
                value={form.watch("payment_method_types")}
                onValueChange={(value) =>
                  form.setValue("payment_method_types", value as "card")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Deposit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
