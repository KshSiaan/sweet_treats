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
import { deletePromotion } from "@/lib/api/business";
import { PromotionType } from "@/types/dbs/business";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function DelPromo({ data }: { data: PromotionType }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["del_promo"],
    mutationFn: () => {
      return deletePromotion(token, String(data?.id));
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["promotions"] });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-12" variant={"destructive"}>
          End Promotion
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to end the promotion "{data.title}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The promotion will be removed from
            your active promotions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
            asChild
          >
            <Button variant="destructive">Yes, End Promotion</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
