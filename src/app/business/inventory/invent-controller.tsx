import React from "react";

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
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { UploadCloudIcon } from "lucide-react";

export default function InventController() {
  return (
    <>
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
                <Input placeholder="Enter purchase price" type="number" />
              </div>
              <div className="space-y-4">
                <Label>Sale Price</Label>
                <Input placeholder="Percentage Discount" type="number" />
              </div>
            </div>
            <Label>Description</Label>
            <Textarea placeholder="Enter promotion description" />
            <Label>Product Image</Label>
            <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
              <label htmlFor="imgSel" className="cursor-pointer h-full w-full">
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
            <Button>Save Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant={"destructive"}>Delete</Button>
    </>
  );
}
