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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { withDrawHistoryType } from "@/types/dbs/business";
import React, { Suspense } from "react";
import StatusTransformer from "./status-transformer";

export default function History({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    total_amount: string;
    date: string;
    status: string;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      full_name: string;
      role: string;
      avatar_url: string;
    };
  }[];
}) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow>
                <TableCell>{new Date(item?.date).toDateString()}</TableCell>
                <TableCell>
                  {item?.status === "Completed" ? (
                    <Badge className="bg-green-500 text-white">
                      {item?.status}
                    </Badge>
                  ) : item.status === "Pending" ? (
                    <Badge className="bg-amber-500 text-white">
                      {item?.status}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white">
                      {item?.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>${item?.total_amount}</TableCell>
                <TableCell className="w-sm">
                  <div className="max-w-sm space-x-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View</Button>
                      </DialogTrigger>
                      <DialogContent className="p-0!">
                        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                          <DialogTitle>Request Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 p-4">
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>Full name</h5>
                            <p className="text-secondary-foreground">
                              {item?.user?.full_name}
                            </p>
                          </div>
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>User Type</h5>
                            <p className="text-secondary-foreground">
                              {item?.user?.role}
                            </p>
                          </div>
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>Full name</h5>
                            <p className="text-secondary-foreground">
                              {item?.user?.full_name}
                            </p>
                          </div>
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>Request Date</h5>
                            <p className="text-secondary-foreground">
                              {new Date(item?.date).toDateString()}
                            </p>
                          </div>
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>Status</h5>
                            <p className="text-secondary-foreground">
                              {item?.status}
                            </p>
                          </div>
                          <div className="text-muted-foreground font-semibold space-y-2">
                            <h5>Amount</h5>
                            <p className="text-secondary-foreground">
                              ${item?.total_amount}
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
                    <Suspense>
                      {item?.status === "Pending" && (
                        <StatusTransformer id={item?.id} />
                      )}
                    </Suspense>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
