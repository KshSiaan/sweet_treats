"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { getAdminUsers } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { useCookies } from "react-cookie";
import Suspend from "./suspend";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["admin-user-management", page],
    queryFn: () => {
      return getAdminUsers(token, page, 12);
    },
  });
  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-primary">User Management</h2>
      </div>
      <Card className="pt-0 overflow-hidden!">
        <CardContent className="px-0">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  User Name
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Email
                </TableHead>
                <TableHead className="text-primary! text-center">
                  User Type
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Status
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Registration Date
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isPending &&
                data?.data?.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center">
                      {user.full_name}
                    </TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">
                      {user.role === "CUSTOMER"
                        ? "Customer"
                        : user.role === "BUSINESS"
                          ? "Business Owner"
                          : user?.role === "EMPLOYEE"
                            ? "Employee"
                            : user.role}
                    </TableCell>
                    <TableCell className="text-center">
                      {user?.status === "Active" ? (
                        <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                          <span
                            className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                            aria-hidden="true"
                          />
                          {user?.status}
                        </Badge>
                      ) : (
                        <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                          <span
                            className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                            aria-hidden="true"
                          />
                          {user?.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center gap-2! space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View</Button>
                        </DialogTrigger>
                        <DialogContent className="p-0!">
                          <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                            <DialogTitle>User Details</DialogTitle>
                          </DialogHeader>
                          <div className="w-full grid grid-cols-2 gap-6 p-4">
                            <div className="space-y-2">
                              <h5 className="text-lg font-semibold text-muted-foreground">
                                Full name
                              </h5>
                              <p className="text-muted-foreground">
                                {user.full_name}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-lg font-semibold text-muted-foreground">
                                User Type
                              </h5>
                              <p className="text-muted-foreground">
                                {user.role === "CUSTOMER"
                                  ? "Customer"
                                  : user?.role === "BUSINESS_OWNER"
                                    ? "Business Owner"
                                    : user?.role === "EMPLOYEE"
                                      ? "Employee"
                                      : user.role}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-lg font-semibold text-muted-foreground">
                                Email
                              </h5>
                              <p className="text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-lg font-semibold text-muted-foreground">
                                Registration Date
                              </h5>
                              <p className="text-muted-foreground">
                                {new Date(user.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-lg font-semibold text-muted-foreground">
                                Status
                              </h5>
                              <p className="text-muted-foreground">
                                <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                                  <span
                                    className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                                    aria-hidden="true"
                                  />
                                  Completed
                                </Badge>
                              </p>
                            </div>
                          </div>
                          <DialogFooter className="p-4 pt-0!">
                            <DialogClose asChild>
                              <Button variant={"outline"} className="px-6">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Suspend data={user} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t">
          <div className="w-full flex justify-end items-center space-x-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <p className=" font-semibold text-muted-foreground text-sm">
              {data?.data?.current_page} of {data?.data?.total}
            </p>
            <Button
              variant="outline"
              disabled={data?.data?.data.length! < 12}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
