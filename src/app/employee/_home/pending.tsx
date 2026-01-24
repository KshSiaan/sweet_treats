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
export default function Orders({
  data,
}: {
  data: {
    id: number;
    order_number: string;
    customer_id: number;
    business_id: number;
    order_date: string;
    amount_info: {
      sub_total: number;
      shipping_cost: number;
      discount: number;
      total_amount: number;
    };
    order_item: Array<{
      product_id: number;
      business_category_id: number;
      product_category_id: number;
      product_name: string;
      product_price: number;
      quantity: number;
    }>;
    shipping_info: {
      name: string;
      address: string;
      city: string;
      zip: number;
      phone_number: string;
    };
    payment_method: string;
    status: string;
    assign_employee_id: number;
    transaction_id: any;
    created_at: string;
    updated_at: string;
  }[];
}) {
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
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">#{item?.order_number}</TableCell>
            <TableCell className="text-center">
              {item.shipping_info.name}
            </TableCell>
            <TableCell className="text-center">
              {item.order_item.length} item
              {item.order_item.length > 1 ? "s" : ""}
            </TableCell>
            <TableCell className="text-center">
              {new Date(item.created_at).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>
            <TableCell className="text-center">
              {item.status === "Pending" && (
                <Badge className="bg-yellow-500">{item.status}</Badge>
              )}
              {item.status === "In Progress" && (
                <Badge className="bg-blue-500">{item.status}</Badge>
              )}
              {item.status === "Ready" && (
                <Badge className="bg-indigo-500">{item.status}</Badge>
              )}
              {item.status === "On The Way" && (
                <Badge className="bg-purple-500">{item.status}</Badge>
              )}
              {item.status === "Delivery Accepted" && (
                <Badge className="bg-green-500">{item.status}</Badge>
              )}
              {item.status === "Canceled" && (
                <Badge className="bg-red-500">{item.status}</Badge>
              )}
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
                    <p className="text-sm">{item.shipping_info.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.shipping_info.address}, {item.shipping_info.city}{" "}
                      {item.shipping_info.zip}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      📞 {item.shipping_info.phone_number}
                    </p>
                    <Label className="text-lg">Order Items</Label>
                    <div className="space-y-2">
                      {item.order_item.map((orderItem, idx) => (
                        <p
                          key={idx}
                          className="text-sm flex justify-between items-center"
                        >
                          <span>
                            {orderItem.quantity} x {orderItem.product_name}
                          </span>
                          <span>
                            $
                            {(
                              orderItem.product_price * orderItem.quantity
                            ).toFixed(2)}
                          </span>
                        </p>
                      ))}
                    </div>
                    <Label className="text-lg">Status</Label>
                    <Badge className="bg-green-600">{item.status}</Badge>
                    <Label className="text-lg">Payment Method</Label>
                    <p className="text-sm">{item.payment_method}</p>
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg space-y-2 text-muted-foreground">
                      <p className="w-full flex justify-between items-center text-sm">
                        <span>Subtotal:</span>
                        <span>${item.amount_info.sub_total.toFixed(2)}</span>
                      </p>
                      <p className="w-full flex justify-between items-center text-sm">
                        <span>Shipping:</span>
                        <span>
                          ${item.amount_info.shipping_cost.toFixed(2)}
                        </span>
                      </p>
                      <p className="w-full flex justify-between items-center text-sm">
                        <span>Discount:</span>
                        <span>-${item.amount_info.discount.toFixed(2)}</span>
                      </p>
                      <Separator />
                      <p className="w-full flex justify-between items-center text-sm font-semibold text-foreground">
                        <span>Total</span>
                        <span>${item.amount_info.total_amount.toFixed(2)}</span>
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
        ))}
      </TableBody>
    </Table>
  );
}
