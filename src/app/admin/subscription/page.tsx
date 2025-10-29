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
} from "@/components/ui/input-group";
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
import { AlertTriangleIcon, ArrowRight, PlusIcon } from "lucide-react";

export default function Page() {
  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Subscription
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0!">
            <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
              <DialogTitle>Add New Subscription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4!">
              <Label>Plan name</Label>
              <Input placeholder="" />
              <Label>Duration</Label>
              <Input placeholder="" />
              <Label>Price</Label>
              <Input placeholder="" />
              <Card className="bg-primary/10 my-6 w-full py-4">
                <CardHeader className="px-4">
                  <CardTitle className="text-sm font-bold text-muted-foreground">
                    Currency Converter
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="flex justify-between items-center gap-4">
                    <InputGroup className="bg-background">
                      <InputGroupInput />
                      <InputGroupAddon align={"inline-end"}>
                        USD
                      </InputGroupAddon>
                    </InputGroup>
                    <div className="">
                      <ArrowRight className="size-4" />
                    </div>
                    <InputGroup className="bg-background">
                      <InputGroupInput />
                      <InputGroupAddon align={"inline-end"}>
                        GYD
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="bg-primary/10 p-2 flex justify-center items-center mt-4 rounded-sm text-primary font-semibold">
                    $100.00 = 20,950 GYD
                  </div>
                  <p className="text-xs p-2 text-center italic text-muted-foreground">
                    Exchange rate: 1 USD = 209.50 GYD
                  </p>
                </CardContent>
              </Card>
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
              <Label>Benefits</Label>
              <Textarea className="resize-none!" placeholder="" />
            </div>
            <DialogFooter className="p-4!">
              <DialogClose asChild>
                <Button className="px-12" variant={"outline"} size={"lg"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button className="px-12" size={"lg"}>
                Save Subscription
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
                  Plan Name
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Duration
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Price
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Active Subscriber
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
              <TableRow>
                <TableCell className="text-center">Free</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">45</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </TableCell>

                <TableCell className="text-center gap-2! space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0!">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Edit Subscription</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 p-4!">
                        <Label>Plan name</Label>
                        <Input placeholder="" />
                        <Label>Duration</Label>
                        <Input placeholder="" />
                        <Label>Price</Label>
                        <Input placeholder="" />
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
                        <Label>Benefits</Label>
                        <Textarea className="resize-none!" placeholder="" />
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
                  <Dialog>
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
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">Fun Spin</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0!">
            <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
              <DialogTitle>Spin Discount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4!">
              <Label>Spin discount</Label>
              <Input placeholder="Enter spin discount" />
              <Label>Discount Background Color</Label>
              <Input placeholder="Enter spin discount" type="color" />
              <Label>Discount Text Color</Label>
              <Input placeholder="Enter spin discount" type="color" />
            </div>
            <DialogFooter className="p-4!">
              <DialogClose asChild>
                <Button className="px-12" variant={"outline"} size={"lg"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button className="px-12" size={"lg"}>
                Save Discount
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
                  Spin Discount
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Discount Background Color
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Discount Text Color
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">$300</TableCell>
                <TableCell className="text-center flex justify-center items-center gap-2">
                  <span className="size-3 rounded-xs bg-black" />
                  Default (Black)
                </TableCell>
                <TableCell className="text-center">
                  <div className=" flex justify-center items-center gap-2">
                    <span className="size-3 rounded-xs bg-black" />
                    Default (Black)
                  </div>
                </TableCell>
                <TableCell className="text-center gap-2! space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0!">
                      <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                        <DialogTitle>Spin Discount</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 p-4!">
                        <Label>Spin discount</Label>
                        <Input placeholder="Enter spin discount" />
                        <Label>Discount Background Color</Label>
                        <Input placeholder="Enter spin discount" type="color" />
                        <Label>Discount Text Color</Label>
                        <Input placeholder="Enter spin discount" type="color" />
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
                          Save Discount
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
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
                          Delete Discount
                        </h4>
                        <p className="text-sm text-center text-muted-foreground">
                          Are you sure you want to delete this discount? This
                          action cannot be undone.
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
