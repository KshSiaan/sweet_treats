"use client";
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
import { AlertTriangleIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteReward } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
export default function DeleteReward({ id }: { id: number | string }) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_reward"],
    mutationFn: () => {
      return deleteReward(token, String(id));
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Reward</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3">
          <AlertTriangleIcon className="text-yellow-500 size-16" />
          <h4 className="text-muted-foreground text-xl font-bold">
            Delete Reward
          </h4>
          <p className="text-sm text-center text-muted-foreground">
            Are you sure you want to delete this reward? This action cannot be
            undone.
          </p>
          <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={() => mutate()} disabled={isPending}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
