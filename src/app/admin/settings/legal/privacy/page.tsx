"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPage, updatePage } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [text, setText] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["legal-privacy"],
    queryFn: () => {
      return getPage("privacy");
    },
  });
  useEffect(() => {
    if (!isPending) {
      setText(data?.data?.content || "");
    }
  }, [isPending]);

  const { mutate, isPending: updating } = useMutation({
    mutationKey: ["update_privacy"],
    mutationFn: () => {
      return updatePage(token, "privacy", {
        title: "Privacy Policy",
        content: text,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });

  return (
    <section className="space-y-6">
      <h1 className="font-semibold text-3xl">Privacy Policy</h1>
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue as string)}
        style={{ height: "320px" }}
      />
      <Button onClick={() => mutate()} disabled={updating || isPending}>
        Save Changes
      </Button>
    </section>
  );
}
