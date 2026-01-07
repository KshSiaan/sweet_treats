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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restockApi } from "@/lib/api/business";
import { StockType } from "@/types/dbs/business";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function UpdateRestock({ data }: { data: StockType }) {
  const [{ token }] = useCookies(["token"]);
  const [restockAmount, setRestockAmount] = React.useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateStock"],
    mutationFn: () => {
      return restockApi(token, String(data?.id), restockAmount);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="bg-primary text-background p-4 rounded-lg">
          <DialogTitle>Update Restock Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <Label>Required stock</Label>
          <div className="">{data?.required_stock}</div>
          <Label>Restock Quantity</Label>
          <Input
            placeholder="00"
            type="number"
            value={restockAmount}
            onChange={(e) => setRestockAmount(e.target.value)}
          />
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={() => mutate()}>
            Update Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
