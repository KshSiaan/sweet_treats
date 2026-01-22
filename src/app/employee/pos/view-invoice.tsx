"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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
import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ViewInvoice({ data }: { data: InvoiceType }) {
  const [{ token }] = useCookies(["token"]);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { data: me, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return getMeApi(token);
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `invoice-${data?.invoice_number}`,
  });

  const handleSavePDF = async () => {
    if (invoiceRef.current) {
      try {
        const image = await toPng(invoiceRef.current);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const imgWidth = 210;
        const imgHeight =
          (invoiceRef.current.offsetHeight * imgWidth) /
          invoiceRef.current.offsetWidth;
        pdf.addImage(image, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`invoice-${data?.invoice_number}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>View</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[70dvw]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div ref={invoiceRef} className="p-2">
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
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
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
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-muted-foreground">Subtotal:</p>
                <p className="font-semibold text-secondary-foreground">
                  $
                  {data?.order_item
                    .reduce(
                      (acc, item) => acc + item.product_price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-muted-foreground">Discount:</p>
                <p className="font-semibold text-secondary-foreground">
                  ${data?.amount_info.discount.toFixed(2)}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between text-xl">
                <p className="font-semibold text-secondary-foreground">
                  Total:
                </p>
                <p className="font-semibold text-secondary-foreground">
                  ${(data?.amount_info.total_amount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-end-safe">
          <div className="text-muted-foreground">
            <h4 className="text-xl font-semibold">
              Thank you for your business!
            </h4>
            <p>
              Notes: Goods sold are non-refundable unless defective. Powered by
              Sweet Treats POS.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handlePrint()}>Print</Button>
            <Button onClick={handleSavePDF}>Save PDF</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
