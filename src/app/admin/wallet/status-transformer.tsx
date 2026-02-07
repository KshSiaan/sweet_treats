"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  acceptWithdrawRequest,
  payWithdrawAmount,
  rejectWithdrawRequest,
} from "@/lib/api/admin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function StatusTransformer({ id }: { id: number }) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["acceptWithdrawReq"],
  //   mutationFn: () => {
  //     return acceptWithdrawRequest(token, id);
  //   },
  //   onError: (err) => {
  //     toast.error(err.message ?? "Failed to complete this request");
  //   },
  //   onSuccess: (res) => {
  //     toast.success(res.message ?? "Success!");
  //     navig.refresh();
  //   },
  // });
  // const { mutate: reject, isPending: isRejecting } = useMutation({
  //   mutationKey: ["rejectWithdrawReq"],
  //   mutationFn: () => {
  //     return rejectWithdrawRequest(token, id);
  //   },
  //   onError: (err) => {
  //     toast.error(err.message ?? "Failed to complete this request");
  //   },
  //   onSuccess: (res) => {
  //     toast.success(res.message ?? "Success!");
  //     navig.refresh();
  //   },
  // });
  const { mutate, isPending } = useMutation({
    mutationKey: ["payWithdrawAmount"],
    mutationFn: () => {
      return payWithdrawAmount(token, id);
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
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-600!" disabled={isPending}>
            {isPending ? <Spinner /> : "Accept"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to accept this withdrawal request?
          </AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-600!" disabled={isPending}>
            {isPending ? <Spinner /> : "Accept"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to accept this withdrawal request?
          </AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-600!" disabled={isRejecting}>
            {isRejecting ? <Spinner /> : "Decline"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            Are you sure you want to decline this withdrawal request?
          </AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isRejecting}
              onClick={() => {
                reject();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
