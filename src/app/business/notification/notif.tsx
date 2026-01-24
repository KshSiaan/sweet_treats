"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { markNotifAsRead } from "@/lib/api/global";
import { useRouter } from "next/navigation";
export default function Notif({
  data,
}: {
  data: {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: {
      title: string;
      is_body_use: boolean;
      body: string;
    };
    read_at: any;
    created_at: string;
    updated_at: string;
  };
}) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { mutate } = useMutation({
    mutationKey: ["readNotif", data.id],
    mutationFn: () => {
      return markNotifAsRead(token, data.id);
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
    <Card
      className={data.read_at ? "" : "border-primary"}
      onClick={() => {
        if (!data.read_at) {
          mutate();
        }
      }}
    >
      <CardContent className="">
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{data.data.title}</CardTitle>
          <div className="">{new Date(data?.created_at).toDateString()}</div>
        </div>
        <div className="h-full flex justify-between items-end">
          <CardDescription>{data.data.body}</CardDescription>
          {!data?.read_at && (
            <div className="">
              <div className="size-3 bg-primary rounded-full" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
