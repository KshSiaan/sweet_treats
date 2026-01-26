import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { AlertTriangleIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getClaims } from "@/lib/api/admin";
import { cookies } from "next/headers";
import UpdateRule from "./update-rule";
import ClaimController from "./claim-controller";

export default async function Claim() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await getClaims(token);

  return (
    <Card className="p-0! overflow-hidden!">
      <CardContent className="p-0! ">
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">
                Customer
              </TableHead>
              <TableHead className="text-primary! text-center">
                Amount
              </TableHead>
              <TableHead className="text-primary! text-center">
                Amount * Points per $
              </TableHead>
              <TableHead className="text-primary! text-center">
                Phone number
              </TableHead>
              <TableHead className="text-primary! text-center">
                Status
              </TableHead>
              <TableHead className="text-primary! text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="text-center">
                  {rule.customer_name}
                </TableCell>
                <TableCell className="text-center">{rule?.amount}</TableCell>
                <TableCell className="text-center">
                  {rule?.point_conversion_rule?.points *
                    parseInt(rule?.amount || "0")}{" "}
                  pts
                </TableCell>
                <TableCell className="text-center">{rule?.phone}</TableCell>
                <TableCell className="text-center">
                  {rule.status === "Completed" ? (
                    <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      <span
                        className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                        aria-hidden="true"
                      />
                      {rule.status.charAt(0).toUpperCase() +
                        rule.status.slice(1)}
                    </Badge>
                  ) : (
                    <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                      <span className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400" />
                      {rule.status.charAt(0).toUpperCase() +
                        rule.status.slice(1)}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-center gap-2! space-x-2">
                  {/* <UpdateRule rule={rule} /> */}
                  <ClaimController data={rule} />

                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"destructive"}>Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col justify-center items-center gap-3">
                        <AlertTriangleIcon className="text-yellow-500 size-16" />
                        <h4 className="text-muted-foreground text-xl font-bold">
                          Delete Subscription
                        </h4>
                        <p className="text-sm text-center text-muted-foreground">
                          Are you sure you want to delete free subscription?
                          This action cannot be undone.
                        </p>
                        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
                          <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          <Button>Confirm</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
