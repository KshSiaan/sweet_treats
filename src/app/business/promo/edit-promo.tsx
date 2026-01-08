import React from "react";
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
import { PlusIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function EditPromo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-12" variant={"outline"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Edit Promotion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6 pb-6">
          <Label>Promotion Title</Label>
          <Input placeholder="Enter promotion title" />
          <Label>Promotion Image</Label>
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
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-4">
              <Label>Discount type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Percentage Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Discount Value</Label>
              <Input placeholder="e.g. 20 or 20%" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-4">
              <Label>Start Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-4">
              <Label>End Date</Label>
              <Input type="date" />
            </div>
          </div>
          <Label>Description</Label>
          <Textarea placeholder="Enter promotion description" />
          <Label>Target Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Electronics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Save Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
