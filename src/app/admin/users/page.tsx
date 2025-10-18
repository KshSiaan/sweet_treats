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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangleIcon, PlusIcon } from "lucide-react";

export default function Page() {
  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          User Management
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Add a new user
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0!">
            <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4!">
              <Label>Full name</Label>
              <Input placeholder="" />
              <Label>Email</Label>
              <Input placeholder="" />
              <Label>User Type </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Customer</SelectItem>
                  <SelectItem value="inactive">Business Owner</SelectItem>
                </SelectContent>
              </Select>
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Label>Initial Notes</Label>
              <Textarea className="resize-none!" placeholder="" />
            </div>
            <DialogFooter className="p-4!">
              <DialogClose asChild>
                <Button className="px-12" variant={"outline"} size={"lg"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button className="px-12" size={"lg"}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Email
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Type
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
              <TableRow>
                <TableCell className="text-center">
                  john.doe@example.com
                </TableCell>
                <TableCell className="text-center">Customer</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Oct 15, 2025</TableCell>
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
                            Full name
                          </h5>
                          <p className="text-muted-foreground">John Doe</p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
                            User Type
                          </h5>
                          <p className="text-muted-foreground">Customer</p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
                            Email
                          </h5>
                          <p className="text-muted-foreground">
                            john.doe@example.com
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
                            Registration Date
                          </h5>
                          <p className="text-muted-foreground">Oct 15, 2025</p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
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
                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
                            Last Login
                          </h5>
                          <p className="text-muted-foreground">
                            Today, 09:24 AM
                          </p>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <h5 className="text-xl font-semibold text-muted-foreground">
                            Account Notes
                          </h5>
                          <Textarea
                            className="resize-none"
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-100! text-amber-600">
                        Suspend
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col justify-center items-center gap-3">
                        <AlertTriangleIcon className="text-yellow-500 size-16" />
                        <h4 className="text-muted-foreground text-xl font-bold">
                          Suspend User
                        </h4>
                        <p className="text-sm text-center text-muted-foreground">
                          Are you sure you want to suspend this user?
                        </p>
                        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
                          <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          <Button>Confirm</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0!">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Edit Category</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 p-4!">
                        <Label>Category name</Label>
                        <Input placeholder="" defaultValue={"Retail"} />
                        <Label>Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <Label>Description</Label>
                        <Textarea
                          defaultValue={
                            "Stores selling products directly to consumers"
                          }
                          className="resize-none!"
                          placeholder=""
                        />
                      </div>
                      <DialogFooter className="p-4!">
                        <DialogClose asChild>
                          <Button
                            className="px-12"
                            variant={"outline"}
                            size={"lg"}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button className="px-12" size={"lg"}>
                          Update
                        </Button>
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
