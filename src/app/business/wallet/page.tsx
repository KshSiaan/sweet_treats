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
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import Transfer from "./transfer";
import Deposit from "./deposit";
import Withdraw from "./withdraw";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getTransaction(token!);
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">Wallet System</h3>
        <p className="text-sm text-muted-foreground">
          Manage your business finances and transactions.
        </p>
      </div>
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
                    <h4 className="font-bold text-lg">
                      {transaction?.message}
                    </h4>
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
      {/* <h3 className="text-2xl font-semibold text-primary py-6">
        Employee Wallets
      </h3>
      <Card className="pt-0! overflow-hidden">
        <CardContent className="px-0!">
          <Table>
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-center text-primary">
                  Employee
                </TableHead>
                <TableHead className="text-center text-primary">
                  Wallet Balance
                </TableHead>
                <TableHead className="text-center text-primary">
                  Last Transaction
                </TableHead>
                <TableHead className="text-center text-primary">
                  Status
                </TableHead>
                <TableHead className="text-center text-primary">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  Wireless Headphones
                </TableCell>
                <TableCell className="text-center">$350.00</TableCell>
                <TableCell className="text-center">Today, 10:24 AM</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Add funds</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0!">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Add Funds to Employee Wallet</DialogTitle>
                      </DialogHeader>
                      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <Label>Employee Name</Label>
                          <Input placeholder="Enter employee name" />
                        </div>
                        <div className="space-y-4">
                          <Label>Current Balance</Label>
                          <InputGroup>
                            <InputGroupInput placeholder="" />
                            <InputGroupAddon>
                              <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                        <div className="space-y-4">
                          <Label>Amount to Add</Label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                        <div className="space-y-4">
                          <Label>Note (Optional)</Label>
                          <Input />
                        </div>
                      </div>
                      <DialogFooter className="p-4">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button>Add Funds</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </section>
  );
}
