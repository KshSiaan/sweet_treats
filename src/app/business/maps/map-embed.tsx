"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPinnedIcon } from "lucide-react";
import DOMPurify from "dompurify";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBusinessMap } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface MapEmbedProps {
  embedCode: string;
}

export default function MapEmbed({ embedCode }: MapEmbedProps) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const [value, setValue] = useState("");
  const sanitizedEmbed = useMemo(() => {
    if (!embedCode) return "";
    return DOMPurify?.sanitize(embedCode, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "src",
        "width",
        "height",
        "loading",
        "referrerpolicy",
      ],
    });
  }, [embedCode]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["update_map"],
    mutationFn: () => {
      return updateBusinessMap(token, { google_map_embed_code: value });
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
    <div className="space-y-4 w-full">
      <Label>Google Maps Embed Code</Label>

      <Textarea
        className="resize-none max-w-[80dvw]"
        placeholder="Paste your Google Maps embed code here........"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button onClick={() => mutate()} disabled={isPending}>
        Save Location
      </Button>

      <div className="w-full bg-secondary rounded-lg flex justify-center items-center overflow-hidden">
        {sanitizedEmbed ? (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: sanitizedEmbed }}
          />
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon" className="size-[64px]">
                <MapPinnedIcon className="text-muted-foreground size-[38px]" />
              </EmptyMedia>
            </EmptyHeader>
            <EmptyContent>
              <EmptyTitle className="text-muted-foreground">
                Paste your Google Maps embed code here........
              </EmptyTitle>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}
