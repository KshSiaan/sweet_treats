"use client";
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
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { approveAdminContent } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
export default function Approve({ data }: { data: { id: string } }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["approve_content"],
    mutationFn: () => {
      return approveAdminContent(token, parseInt(data.id));
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
        <Button className="bg-amber-100! text-amber-600">Approve</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3">
          <AlertTriangleIcon className="text-yellow-500 size-16" />
          <h4 className="text-muted-foreground text-xl font-bold">
            Approve Content
          </h4>
          <p className="text-sm text-center text-muted-foreground">
            Are you sure you want to approve this content?
          </p>
          <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={() => mutate()} disabled={isPending}>
              {isPending ? "Processing..." : "Approve"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
