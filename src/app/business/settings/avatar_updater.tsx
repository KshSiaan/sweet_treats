"use client";

import { Input } from "@/components/ui/input";
import { updateAvatar } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function AvatarUpdater() {
  const [{ token }] = useCookies(["token"]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useMutation({
    mutationKey: ["profile_update"],
    mutationFn: (body: FormData) => updateAvatar(token, body),
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      toast.success(res?.message ?? "Success!");
      router.refresh();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    mutate(formData);

    // 🔑 THIS LINE FIXES EVERYTHING
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Input
      ref={inputRef}
      id="imageUpload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
  );
}
