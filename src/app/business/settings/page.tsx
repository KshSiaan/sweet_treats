"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";
import ProfUpdateForm from "./prof-update-form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="!pb-12 !py-12 border rounded-xl">
      <div className="flex flex-row justify-center items-center">
        <Avatar className="size-[140px] relative overflow-visible">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>AV</AvatarFallback>
          <Button
            className="absolute bottom-0 right-0 z-30"
            variant="outline"
            size="icon"
          >
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              <EditIcon />
            </label>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </Button>
        </Avatar>
      </div>
      <div className="">
        <ProfUpdateForm />
        <div className="px-6 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant={"outline"}>
                Update password from here
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="pb-4 border-b">
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Current Password</Label>
                <Input />
                <Label>New Password</Label>
                <Input />
                <Label>Confirm Password</Label>
                <Input />
              </div>
              <DialogFooter className="mt-6">
                <Button className="w-full">Update Password</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
