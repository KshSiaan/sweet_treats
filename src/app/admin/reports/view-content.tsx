import { AdminContenttype } from "@/types/admin";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
export default function ViewContent({ data }: { data: AdminContenttype }) {
  //     AdminContenttype{
  //     id: number
  //     business_id: number
  //     product_id: number
  //     customer_id: number
  //     title: string
  //     rating: number
  //     experience: string
  //     status: string
  //     created_at: string
  //     updated_at: string
  //     customer: {
  //       id: number
  //       full_name: string
  //       role: string
  //       avatar_url: string
  //     }
  //   }
  return (
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
              Customer name
            </h5>
            <p className="text-muted-foreground text-sm">
              {data.customer.full_name}
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-muted-foreground">
              Post Date
            </h5>
            <p className="text-muted-foreground text-sm">
              {new Date(data?.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-muted-foreground">
              Product Name
            </h5>
            <p className="text-muted-foreground text-sm">{data.title}</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-muted-foreground">
              Product Rating
            </h5>
            <p className="text-muted-foreground text-sm">{data.rating}</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-muted-foreground">
              Status
            </h5>
            <Badge>{data.status}</Badge>
          </div>
          <div className="col-span-2 space-y-2">
            <h5 className="text-xl font-semibold text-muted-foreground">
              Comment
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
  );
}
