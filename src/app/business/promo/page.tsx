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
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Promotions Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Create and manage promotions to attract more customers.
        </p>
      </div>
      <div className="w-full flex justify-between items-center pb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Active Promotions
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0!">
            <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
              <DialogTitle>Create Promotion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 px-6 pb-6">
              <Label>Promotion Title</Label>
              <Input />
              <Label>Promotion Image</Label>
              <div className="w-full border border-dashed rounded-lg py-6 flex justify-center items-center">
                <label htmlFor="imgSel">
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
                  <Label>Promotion Title</Label>
                  <Input />
                </div>
                <div className="space-y-4">
                  <Label>Discount Value</Label>
                  <Input />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-4">
                  <Label>Start Date</Label>
                  <Input />
                </div>
                <div className="space-y-4">
                  <Label>End Date</Label>
                  <Input />
                </div>
              </div>
              <Label>Description</Label>
              <Textarea placeholder="Enter promotion description" />
              <Label>Target Category</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
              </Select>
            </div>
            <DialogFooter className="p-4">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button>Create Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="pt-0! overflow-hidden">
        <CardHeader className="flex justify-between items-center bg-accent py-4">
          <CardTitle className="text-2xl font-semibold text-primary">
            Summer Sale - 15% Off
          </CardTitle>
          <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
            <span
              className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
              aria-hidden="true"
            />
            Active
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          <Image
            className="w-full bg-accent rounded-lg"
            height={200}
            width={1200}
            alt="banner"
            src={"https://placehold.co/600x400"}
          />
          <p className="font-semibold text-muted-foreground mt-6">
            15% off on all headphone items{" "}
          </p>
          <div className="grid grid-cols-3 gap-2 pt-6 text-muted-foreground">
            <div className="">
              <h4 className="text-lg font-semibold ">Duration</h4>
              <p>June 1 - June 30, 2025</p>
            </div>
            <div className="">
              <h4 className="text-lg font-semibold ">Category</h4>
              <p>Electronics</p>
            </div>
            <div className="">
              <h4 className="text-lg font-semibold ">Discount</h4>
              <p>15%</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button className="px-12" variant={"outline"}>
            Edit
          </Button>
          <Button className="px-12" variant={"destructive"}>
            End Promotion
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
