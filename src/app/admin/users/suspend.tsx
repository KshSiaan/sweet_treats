import React from "react";
import { AlertTriangleIcon, PlusIcon } from "lucide-react";
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
import { UserType } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSuspendToggle } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { cn } from "@/lib/utils";
export default function Suspend({ data }: { data: UserType }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["suspend_user"],
    mutationFn: () => {
      return adminSuspendToggle(token, data.id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["admin-user-management"] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            data.status === "Active" ? "bg-orange-500!" : "bg-green-500!",
            "text-white",
          )}
        >
          {data.status === "Active" ? "Suspend" : "Activate"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3">
          <AlertTriangleIcon className="text-yellow-500 size-16" />
          <h4 className="text-muted-foreground text-xl font-bold">
            {data.status === "Active" ? "Suspend User" : "Activate User"}
          </h4>
          <p className="text-sm text-center text-muted-foreground">
            Are you sure you want to{" "}
            {data.status === "Active" ? "suspend" : "activate"} this user?
          </p>
          <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={() => mutate()} disabled={isPending}>
              {data.status === "Active" ? "Suspend" : "Activate"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
