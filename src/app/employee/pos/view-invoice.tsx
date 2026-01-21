import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMeApi } from "@/lib/api/auth";
import { InvoiceType } from "@/types/dbs/employee";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";

export default function ViewInvoice({ data }: { data: InvoiceType }) {
  const [{ token }] = useCookies(["token"]);
  const { data: me, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return getMeApi(token);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>View</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70dvw]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <div className="grid grid-cols-2 gap-4 border-b pb-6">
            <div className="">
              <Image
                src={"/logo.webp"}
                height={124}
                width={124}
                alt="logo"
                className="size-18 object-contain"
              />
              <div className="text-sm font-semibold text-muted-foreground">
                <p>123 Bakery Lane, Food District</p>
                <p>New York, NY 10012 • +1 (555) 019-2834</p>
                <p>admin@sweettreats.com</p>
              </div>
            </div>
            <div className="text-end font-semibold">
              <h4 className="text-lg text-secondary-foreground mb-6">
                TAX INVOICE
              </h4>
              <p className="text-muted-foreground">
                Invoice:{" "}
                <span className="text-secondary-foreground">
                  #{data?.invoice_number}
                </span>
              </p>
              <p className="text-muted-foreground">
                Date:{" "}
                <span className="text-secondary-foreground">
                  {new Date(data?.order_date).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-muted-foreground pb-2">
                Bill From
              </h4>
              <p className="font-semibold">{data?.customer_info?.name}</p>
              <p>{data?.customer_info?.address}</p>
              <p>{data?.customer_info?.phone_number}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-muted-foreground pb-2">
                Bill To
              </h4>
              <p className="font-semibold">
                {data?.bill_to?.employee.full_name}
              </p>
              <p>{data?.bill_to?.employee?.email}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-muted-foreground pb-2">
                Payment
              </h4>
              <p className="font-semibold">
                Method:{" "}
                <span className="text-primary font-bold">
                  {data?.payment_method}
                </span>
              </p>
            </div>
          </div>
          <Table className="mt-6">
            <TableHeader className="bg-primary/30">
              <TableRow></TableRow>
              <TableHead>#</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableHeader>
            <TableBody>
              {data?.order_item.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.unit || "pcs"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.product_price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.product_price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* TODO: COMPLETE THE REST OF THE INVOICE DETAILS */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
