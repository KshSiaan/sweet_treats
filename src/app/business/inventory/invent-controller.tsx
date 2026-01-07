"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import EditProd from "./edit-prod";
import { ProductType } from "@/types/dbs/business";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api/business";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function InventController({ data }: { data: ProductType }) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-prod"],
    mutationFn: () => {
      return deleteProduct(token, String(data.id));
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
      <EditProd data={data} />
      <Button
        variant={"destructive"}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}
