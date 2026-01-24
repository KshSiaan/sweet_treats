"use client";
import { Button } from "@/components/ui/button";
import { markAllNotifAsRead } from "@/lib/api/global";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function ReadAll() {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate } = useMutation({
    mutationKey: ["readNotif"],
    mutationFn: () => {
      return markAllNotifAsRead(token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });
  return <Button onClick={() => mutate()}>Mark All as Read</Button>;
}
