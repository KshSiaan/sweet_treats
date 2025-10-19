import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, SearchIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Inventory Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your product inventory and stock levels.
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-primary">
            Product Inventory
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0!">
              <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                <DialogTitle>Add New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 px-6 pb-6">
                <Label>Item name</Label>
                <Input placeholder="Enter item name" />
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Electronics</SelectItem>
                    <SelectItem value="1">Clothing</SelectItem>
                    <SelectItem value="1">Home & Garden</SelectItem>
                    <SelectItem value="1">Sports & Outdoors</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-4">
                    <Label>Quantity</Label>
                    <Input placeholder="Enter quantity" type="number" />
                  </div>
                  <div className="space-y-4">
                    <Label>Purchase Price</Label>
                    <Input placeholder="Enter purchase price" type="number" />
                  </div>
                  <div className="space-y-4">
                    <Label>Sale Price</Label>
                    <Input placeholder="Percentage Discount" type="number" />
                  </div>
                </div>
                <Label>Description</Label>
                <Textarea placeholder="Enter promotion description" />
                <Label>Promotion Image</Label>
                <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
                  <label
                    htmlFor="imgSel"
                    className="cursor-pointer h-full w-full"
                  >
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant={"icon"} className="text-primary">
                          <UploadCloudIcon />
                        </EmptyMedia>
                        <EmptyTitle className="text-sm">
                          Click to upload promotion image
                        </EmptyTitle>
                      </EmptyHeader>
                    </Empty>
                    <input type="file" className="hidden" id="imgSel" />
                  </label>
                </div>
              </div>
              <DialogFooter className="p-4">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button>Add Item</Button>
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
                <Image
                  src={"https://picsum.photos/200"}
                  height={64}
                  width={64}
                  alt="logo"
                  className="bg-accent size-12 rounded-sm"
                />
                <div className="h-full space-y-4">
                  <h4 className="font-bold">Wireless Headphones</h4>
                  <div className="flex items-center gap-8 text-sm font-semibold text-muted-foreground">
                    <p>Stock: 42</p>
                    <p>Price: $79.99</p>
                    <p>Sales: $50.99</p>
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="p-0!">
                    <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                      <DialogTitle>Edit Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 px-6 pb-6">
                      <Label>Item name</Label>
                      <Input placeholder="Enter item name" />
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Electronics</SelectItem>
                          <SelectItem value="1">Clothing</SelectItem>
                          <SelectItem value="1">Home & Garden</SelectItem>
                          <SelectItem value="1">Sports & Outdoors</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-4">
                          <Label>Quantity</Label>
                          <Input placeholder="Enter quantity" type="number" />
                        </div>
                        <div className="space-y-4">
                          <Label>Purchase Price</Label>
                          <Input
                            placeholder="Enter purchase price"
                            type="number"
                          />
                        </div>
                        <div className="space-y-4">
                          <Label>Sale Price</Label>
                          <Input
                            placeholder="Percentage Discount"
                            type="number"
                          />
                        </div>
                      </div>
                      <Label>Description</Label>
                      <Textarea placeholder="Enter promotion description" />
                      <Label>Product Image</Label>
                      <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
                        <label
                          htmlFor="imgSel"
                          className="cursor-pointer h-full w-full"
                        >
                          <Empty>
                            <EmptyHeader>
                              <EmptyMedia
                                variant={"icon"}
                                className="text-primary"
                              >
                                <UploadCloudIcon />
                              </EmptyMedia>
                              <EmptyTitle className="text-sm">
                                Click to upload promotion image
                              </EmptyTitle>
                            </EmptyHeader>
                          </Empty>
                          <input type="file" className="hidden" id="imgSel" />
                        </label>
                      </div>
                    </div>
                    <DialogFooter className="p-4">
                      <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                      </DialogClose>
                      <Button>Save Edit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant={"destructive"}>Delete</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
