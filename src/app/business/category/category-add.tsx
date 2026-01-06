"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addCategory } from "@/lib/api/business";
import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function CategoryAdd({ id }: { id: number }) {
  const [value, setValue] = React.useState("");
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_cat", id],
    mutationFn: () => {
      return addCategory(token, { name: value, business_category_id: id });
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
      <Input
        placeholder="Add sub-category.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={isPending || value.trim() === ""}
        onClick={() => mutate()}
        size={"icon"}
      >
        {isPending ? <Spinner /> : <PlusIcon />}
      </Button>
    </>
  );
}
