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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getAdminContents } from "@/lib/api/admin";
import { AlertTriangleIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Approve from "./approve";
import Remove from "./remove";
import { Suspense } from "react";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return notFound();
  }
  const data = await getAdminContents(token);
  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Content Moderation
        </h2>
      </div>
      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Customer Name
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Product Name
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Comment
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
              {data.data.map((content) => (
                <TableRow>
                  <TableCell className="text-center">
                    {content.customer.full_name}
                  </TableCell>
                  <TableCell className="text-center">{content.title}</TableCell>
                  <TableCell className="text-center">
                    {content.experience.slice(0, 20)}...
                  </TableCell>
                  <TableCell className="text-center">
                    {content.status === "Approved" ? (
                      <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                        <span
                          className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                          aria-hidden="true"
                        />
                        {content.status}
                      </Badge>
                    ) : content.status === "Under Review" ? (
                      <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                        <span
                          className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"
                          aria-hidden="true"
                        />
                        {content.status}
                      </Badge>
                    ) : (
                      <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                        <span
                          className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                          aria-hidden="true"
                        />
                        {content.status}
                      </Badge>
                    )}
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
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Content Type
                            </h5>
                            <p className="text-muted-foreground text-sm">
                              Review
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Flags
                            </h5>
                            <p className="text-muted-foreground text-sm">3</p>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Author
                            </h5>
                            <p className="text-muted-foreground text-sm">
                              Sarah Johnson
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Flag Reasons
                            </h5>
                            <ul className="list-disc list-inside">
                              <li className="text-muted-foreground text-sm">
                                In appropriate language
                              </li>
                              <li className="text-muted-foreground text-sm">
                                False information
                              </li>
                              <li className="text-muted-foreground text-sm">
                                Harassment
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Status
                            </h5>
                            <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                              <span
                                className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                                aria-hidden="true"
                              />
                              Approved
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              User Type
                            </h5>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="customer">
                                  Customer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2 space-y-2">
                            <h5 className="text-xl font-semibold text-muted-foreground">
                              Account Notes
                            </h5>
                            <Textarea
                              className="resize-none"
                              readOnly
                              placeholder="Add notes about ths user....."
                            />
                          </div>
                        </div>
                        <DialogFooter className="p-4 pt-0!">
                          <DialogClose asChild>
                            <Button variant={"outline"} className="px-6">
                              Close
                            </Button>
                          </DialogClose>
                          <Button className="px-6">Save Notes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {content.status === "Under Review" && (
                      <>
                        <Suspense>
                          <Approve data={{ id: String(content.id) }} />
                        </Suspense>
                        <Suspense>
                          <Remove data={{ id: String(content.id) }} />
                        </Suspense>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
