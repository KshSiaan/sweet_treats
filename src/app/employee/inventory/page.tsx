import {
  AlertTriangleIcon,
  DollarSignIcon,
  FileTextIcon,
  PackageIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
// import { ChartBarDefault } from "./bar-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <section>
      <div className="w-fullflex flex-col gap-6">
        <div className="">
          <h3 className="text-2xl font-semibold text-primary ">
            Inventory Management
          </h3>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Product
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Current Stock
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Last Updated
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Status
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  1 Wireless Headphone
                </TableCell>
                <TableCell className="text-center">Sarah Johnson</TableCell>
                <TableCell className="text-center">10:24 AM</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Update</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0! ">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 space-y-4">
                        <Label>Current Quantity</Label>
                        <Input placeholder="Enter quantity" type="number" />
                        <Label>Reason for Update</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Sale</SelectItem>
                            <SelectItem value="2">Restock</SelectItem>
                            <SelectItem value="3">Damage/Loss</SelectItem>
                            <SelectItem value="4">
                              Inventory Adjustment
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Label>Initial Notes</Label>
                        <Textarea />
                      </div>
                      <DialogFooter className="p-4">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Close</Button>
                        </DialogClose>
                        <Button>Update Stock</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="">
          <h3 className="text-2xl font-semibold text-primary ">
            Inventory Management
          </h3>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Product
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Current Stock
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Last Updated
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Status
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  1 Wireless Headphone
                </TableCell>
                <TableCell className="text-center">Sarah Johnson</TableCell>
                <TableCell className="text-center">10:24 AM</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                    <span
                      className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                      aria-hidden="true"
                    />
                    Critical
                  </Badge>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Urgent Restock</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0! ">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 space-y-4">
                        <Label>Requested Quantity</Label>
                        <Input placeholder="Enter quantity" type="number" />
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Normal</SelectItem>
                            <SelectItem value="2">High</SelectItem>
                            <SelectItem value="3">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                        <Label>Notes</Label>
                        <Textarea />
                      </div>
                      <DialogFooter className="p-4">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Close</Button>
                        </DialogClose>
                        <Button>Submit Request</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
