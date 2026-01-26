import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

import { getRewards, getRules } from "@/lib/api/admin";
import { cookies } from "next/headers";
import UpdateRule from "./update-rule";
import { Textarea } from "@/components/ui/textarea";
import AddReward from "./add-reward";
import EditReward from "./edit-reward";
import DeleteReward from "./delete-reward";

export default async function Conversion() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await getRewards(token);

  return (
    <Card className="p-0! py-6! overflow-hidden!">
      <CardHeader className="flex justify-end items-center">
        <AddReward />
      </CardHeader>
      <CardContent className="p-0!">
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">
                Points
              </TableHead>
              <TableHead className="text-primary! text-center">
                Dollar($)
              </TableHead>
              <TableHead className="text-primary! text-center">
                Description
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
            {data?.data?.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell className="text-center">{reward.points}</TableCell>
                <TableCell className="text-center">
                  {reward.amount_usd}
                </TableCell>
                <TableCell className="text-center">
                  {reward.description.slice(0, 50)}
                  {reward.description.length > 50 ? "..." : ""}
                </TableCell>
                <TableCell className="text-center">
                  {reward.status === "Active" ? (
                    <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      <span
                        className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                        aria-hidden="true"
                      />
                      {reward.status.charAt(0).toUpperCase() +
                        reward.status.slice(1)}
                    </Badge>
                  ) : (
                    <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                      <span className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400" />
                      {reward.status.charAt(0).toUpperCase() +
                        reward.status.slice(1)}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-center gap-2! space-x-2">
                  <EditReward data={reward} />

                  <DeleteReward id={reward.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
