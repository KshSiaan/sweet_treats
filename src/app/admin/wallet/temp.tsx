"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allWithdraws } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { InfoIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TempFund from "./temp-fund";
export default function Temp() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["all_withdrawss"],
    queryFn: () => {
      return allWithdraws(token);
    },
  });

  return (
    <div className="">
      <div className="mb-6 flex justify-end items-center">
        <TempFund />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Stripe Balance:</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-5xl">
              ${data?.data?.available_stripe_balance}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>pending_stripe_balance:</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-5xl">
              ${data?.data?.pending_stripe_balance}
            </h2>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Alert>
          <InfoIcon />
          <AlertTitle>Note:</AlertTitle>
          <AlertDescription>{data?.data?.message}</AlertDescription>
        </Alert>
      </div>
      <div className="mt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Top Up Histories</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.user_top_up_histories?.map((withdraw) => (
              <TableRow>
                <TableCell>{withdraw.user.full_name}</TableCell>
                <TableCell>{withdraw.user.email}</TableCell>
                <TableCell>{withdraw.user.role}</TableCell>
                <TableCell>
                  <Badge>{withdraw.status}</Badge>
                </TableCell>
                <TableCell>${withdraw.deposit_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
