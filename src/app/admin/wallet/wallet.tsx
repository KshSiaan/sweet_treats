"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getTransaction } from "@/lib/api/business";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Suspense } from "react";
import Transfer from "./transfer";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import { useCookies } from "react-cookie";
import { TransactionType } from "@/types/dbs/business";
import { ApiResponse } from "@/types/base";
export default function Wallet({
  data,
}: {
  data: ApiResponse<TransactionType>;
}) {
  const [{ token }] = useCookies(["token"]);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex justify-between items-center border-b">
        <CardTitle className="text-2xl font-semibold text-primary">
          Main Wallet
        </CardTitle>
        <div className="space-x-2">
          <Suspense fallback={<div>...</div>}>
            <Transfer />
          </Suspense>
          <Deposit />
          <Suspense fallback={<div>...</div>}>
            <Withdraw token={token} />
          </Suspense>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-center font-semibold text-3xl text-primary">
          ${data?.data?.available_balance ?? "0.00"}
        </p>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-primary">
            Recent Transactions
          </h3>
          {/* <Button>View all</Button> */}
        </div>
        <div className="divide-y border-t pt-6">
          {data?.data?.transactions_histories.data?.map((transaction) => (
            <div
              className="w-full p-y rounded-sm flex justify-between items-center"
              key={transaction.id}
            >
              <div className="flex gap-4 items-center justify-start">
                <div className="h-full space-y-2 py-6">
                  <h4 className="font-bold text-lg">{transaction?.message}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction?.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="">
                <p className={cn("text-xl font-semibold")}>
                  ${transaction?.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
