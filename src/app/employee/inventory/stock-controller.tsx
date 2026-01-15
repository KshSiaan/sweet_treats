"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StockType } from "@/types/dbs/employee";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { requestStock } from "@/lib/api/employee";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const restockSchema = z.object({
  required_stock: z
    .string()
    .min(1, "Required stock is required")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
});

type RestockForm = z.infer<typeof restockSchema>;

export default function StockController({ item }: { item: StockType }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const form = useForm<RestockForm>({
    resolver: zodResolver(restockSchema),
    defaultValues: {
      required_stock: "",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["restock"],
    mutationFn: (payload: {
      product_id: string;
      business_id: string;
      required_stock: string;
    }) => {
      return requestStock(
        token,
        payload.product_id,
        payload.business_id,
        payload.required_stock
      );
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });

  const onSubmit = (values: RestockForm) => {
    const payload = {
      product_id: String(item.id),
      business_id: String(item.business_id),
      required_stock: values.required_stock,
    };
    mutate(payload);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Urgent Restock</Button>
        </DialogTrigger>

        <DialogContent className="p-0!">
          <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-4"
          >
            <div className="space-y-4">
              <Label>Current Stock</Label>
              <p className="text-sm font-semibold p-2 bg-secondary text-muted-foreground">
                {item.stock}
              </p>
            </div>
            <div className="space-y-4 border-t pt-4">
              <Label>Requested Quantity</Label>
              <Input
                type="number"
                placeholder="Enter quantity"
                {...form.register("required_stock")}
              />
              {form.formState.errors.required_stock && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.required_stock.message}
                </p>
              )}
            </div>

            {/* <div className="space-y-1">
            <Label>Priority</Label>
            <Select defaultValue="3">
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Normal</SelectItem>
                <SelectItem value="2">High</SelectItem>
                <SelectItem value="3">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {item?.request && item.request.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Request History</Button>
          </DialogTrigger>
          <DialogContent className="p-0! md:min-w-[60dvw]">
            <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
              <DialogTitle>Request History</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-primary! text-center">
                      Product
                    </TableHead>
                    <TableHead className="text-primary! text-center">
                      Current Stock
                    </TableHead>
                    <TableHead className="text-primary! text-center">
                      Required Stock
                    </TableHead>
                    <TableHead className="text-primary! text-center">
                      Requested Date
                    </TableHead>
                    <TableHead className="text-primary! text-center">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item?.request?.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="text-center">
                        {item.product_name}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {req.required_stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(req.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {req.status === "Request Processing" ? (
                          <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                            <span
                              className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"
                              aria-hidden="true"
                            />
                            {req.status}
                          </Badge>
                        ) : req.status === "Stock Updated" ? (
                          <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                            <span
                              className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                              aria-hidden="true"
                            />
                            {req.status}
                          </Badge>
                        ) : (
                          <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                            <span
                              className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                              aria-hidden="true"
                            />
                            {req.status}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
