"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { acceptClaim, cancelClaim } from "@/lib/api/admin";
import { claimType } from "@/types/admin";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function ClaimController({ data }: { data: claimType }) {
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["accept-claim", data.id],
    mutationFn: () => {
      return acceptClaim(token, data.id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: reject, isPending: rejecting } = useMutation({
    mutationKey: ["reject-claim", data.id],
    mutationFn: () => {
      return cancelClaim(token, data.id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-green-600!" disabled={isPending}>
            Confirm
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Claim</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm this claim?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} disabled={rejecting}>
            Reject
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Claim</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this claim?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={rejecting} onClick={() => reject()}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
