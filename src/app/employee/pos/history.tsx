"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoiceHistory } from "@/lib/api/employee";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import ViewInvoice from "./view-invoice";

export default function History() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["invoice-history"],
    queryFn: async () => {
      return getInvoiceHistory(token);
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>#{invoice.invoice_number}</TableCell>
            <TableCell>{invoice.customer_info.name || "Walk-in"}</TableCell>
            <TableCell>
              {new Date(invoice.order_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{invoice.payment_method.replace(/_/g, " ")}</TableCell>
            <TableCell>
              <ViewInvoice data={invoice} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
