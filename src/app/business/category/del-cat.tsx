"use client";
import React from "react";
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
import { Trash2Icon } from "lucide-react";
import { CategoryItem } from "@/types/dbs/business";
import { useMutation } from "@tanstack/react-query";
import { delCategory } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function DelCat({ cat }: { cat: CategoryItem }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: [""],
    mutationFn: () => {
      return delCategory(token, cat.id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      navig.refresh();
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon-sm"} variant={"ghost"} className="text-destructive">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {cat.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
