"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getSalary } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import AddSalary from "./add-salary";
import SalaryController from "./salary-controller";
export default function Salary() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["employee_wallets"],
    queryFn: () => {
      return getSalary(token);
    },
    placeholderData: (prev) => prev,
  });
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-primary py-6">
          Employee Wallets
        </h3>
        <AddSalary />
      </div>
      <Card className="pt-0! overflow-hidden">
        <CardContent className="px-0!">
          <Table>
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-center text-primary">
                  Employee
                </TableHead>
                <TableHead className="text-center text-primary">
                  Period
                </TableHead>
                <TableHead className="text-center text-primary">
                  Amount
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
              {data?.data?.map((item) => (
                <TableRow>
                  <TableCell className="text-center">
                    {item?.employee?.full_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.month} , {item?.year}
                  </TableCell>
                  <TableCell className="text-center">{item?.amount}</TableCell>
                  <TableCell className="text-center">
                    {item?.status === "Paid" ? (
                      <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                        <span
                          className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                          aria-hidden="true"
                        />
                        {item?.status}
                      </Badge>
                    ) : (
                      <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                        <span className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400" />
                        {item?.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-start space-x-4 w-[20dvw]">
                    <SalaryController data={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
