import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, SearchIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Employee Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your team and their access to business operations.
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-primary">
            Employee List
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0! ">
              <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label>Employee Name</Label>
                  <Input placeholder="Enter employee name" />
                </div>
                <div className="space-y-4">
                  <Label>Employee Address</Label>
                  <Input placeholder="Enter employee address" />
                </div>
                <div className="space-y-4">
                  <Label>Employee Status</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label>Employee Code</Label>
                  <Input
                    placeholder="Auto generated upon save"
                    disabled
                    readOnly
                  />
                  <p className="text-xs">
                    This code will be used by employees given by the business
                    owner.
                  </p>
                </div>

                <div className="space-y-4 border-t pt-4 col-span-2 mt-4">
                  <Label>Send welcome email</Label>
                  <div className="flex items-start gap-2 text-xs justify-start">
                    <Checkbox />
                    Send account activation instruction to user’s email
                  </div>
                </div>
              </div>
              <DialogFooter className="p-4">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button>Add Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputGroup>
            <InputGroupInput />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className="divide-y">
            <div className="w-full p-2 rounded-sm flex justify-between items-center">
              <div className="flex gap-4 items-center justify-start">
                <Avatar className="size-12">
                  <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="h-full">
                  <h4 className="font-bold">John Smith</h4>
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </div>
              </div>
              <div className="space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="p-0! ">
                    <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                      <DialogTitle>Edit Employee Details</DialogTitle>
                    </DialogHeader>
                    <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label>Employee Name</Label>
                        <Input placeholder="Enter employee name" />
                      </div>
                      <div className="space-y-4">
                        <Label>Employee Address</Label>
                        <Input placeholder="Enter employee address" />
                      </div>
                      <div className="space-y-4">
                        <Label>Employee Status</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <Label>Employee Code</Label>
                        <Input
                          placeholder="Auto generated upon save"
                          disabled
                          readOnly
                        />
                        <p className="text-xs">
                          This code will be used by employees given by the
                          business owner.
                        </p>
                      </div>

                      <div className="space-y-4 border-t pt-4 col-span-2 mt-4">
                        <Label>Send welcome email</Label>
                        <div className="flex items-start gap-2 text-xs justify-start">
                          <Checkbox />
                          Send account activation instruction to user’s email
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="p-4">
                      <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                      </DialogClose>
                      <Button>Update Employee</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant={"destructive"}>Remove</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <h3 className="text-2xl font-semibold text-primary py-6">
        Employee Wallets
      </h3>
      <Card className="pt-0! overflow-hidden">
        <CardContent className="px-0!">
          <Table>
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-center text-primary">
                  Employee
                </TableHead>
                <TableHead className="text-center text-primary">
                  Wallet Balance
                </TableHead>
                <TableHead className="text-center text-primary">
                  Last Transaction
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
              <TableRow>
                <TableCell className="text-center">
                  Wireless Headphones
                </TableCell>
                <TableCell className="text-center">$350.00</TableCell>
                <TableCell className="text-center">Today, 10:24 AM</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Add funds</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0!">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Add Funds to Employee Wallet</DialogTitle>
                      </DialogHeader>
                      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <Label>Employee Name</Label>
                          <Input placeholder="Enter employee name" />
                        </div>
                        <div className="space-y-4">
                          <Label>Current Balance</Label>
                          <InputGroup>
                            <InputGroupInput placeholder="" />
                            <InputGroupAddon>
                              <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                        <div className="space-y-4">
                          <Label>Amount to Add</Label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                        <div className="space-y-4">
                          <Label>Note (Optional)</Label>
                          <Input />
                        </div>
                      </div>
                      <DialogFooter className="p-4">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button>Add Funds</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
