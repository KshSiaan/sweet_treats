import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
export default function Orders() {
  return (
    <Table className="">
      <TableHeader className="bg-accent ">
        <TableRow>
          <TableHead className="text-primary! text-center">Order ID</TableHead>
          <TableHead className="text-primary! text-center">Customer</TableHead>
          <TableHead className="text-primary! text-center">Items</TableHead>
          <TableHead className="text-primary! text-center">Time</TableHead>
          <TableHead className="text-primary! text-center">Status</TableHead>
          <TableHead className="text-primary! text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">#ORD-7840</TableCell>
          <TableCell className="text-center">Sarah Johnson</TableCell>
          <TableCell className="text-center">1 Wireless Headphone</TableCell>
          <TableCell className="text-center">10:24 AM</TableCell>
          <TableCell className="text-center">
            <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
              <span
                className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                aria-hidden="true"
              />
              Completed
            </Badge>
          </TableCell>
          <TableCell className="text-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>View</Button>
              </DialogTrigger>
              <DialogContent className="p-0! ">
                <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4">
                  <Label className="text-lg">Customer</Label>
                  <p className="text-sm">Customer</p>
                  <Label className="text-lg">Order Items</Label>
                  <p className="text-sm flex justify-between items-center">
                    <span>1 x Wireless Headphone</span>
                    <span>$89.99</span>
                  </p>
                  <Label className="text-lg">Special Instructions</Label>
                  <p className="text-sm">
                    Product’s packaging have to be best.
                  </p>
                  <Label className="text-lg">Status</Label>
                  <Badge className="bg-green-600">Completed</Badge>
                  <div className="p-2 bg-zinc-100 rounded-lg space-y-2 text-muted-foreground">
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span>$89.99</span>
                    </p>
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Shipping:</span>
                      <span>$89.99</span>
                    </p>
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Tax:</span>
                      <span>$89.99</span>
                    </p>
                    <Separator />
                    <p className="w-full flex justify-between items-center text-sm font-semibold text-foreground">
                      <span>Total</span>
                      <span>$89.99</span>
                    </p>
                  </div>
                </div>
                <DialogFooter className="p-4">
                  <DialogClose asChild>
                    <Button variant={"outline"}>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
