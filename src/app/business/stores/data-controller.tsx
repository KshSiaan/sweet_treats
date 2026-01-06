"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { base_api, base_url } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
export default function DataController() {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const [images, setImages] = React.useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [videos, setVideos] = React.useState<(File | null)[]>([null]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["udpdate_stores"],
    mutationFn: async (data: FormData) => {
      return fetch(`${base_url}${base_api}/business/store-or-update-files`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });
  function onSubmit() {
    console.log(images);
    console.log(videos);
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images[${index}]`, image);
      }
    });

    if (videos[0]) {
      formData.append(`video`, videos[0]);
    }
    mutate(formData);
  }

  return (
    <Card>
      <CardContent>
        <h3 className="text-2xl font-semibold text-primary ">
          Store Images (Up to 3)
        </h3>
        {Array(3)
          .fill("")
          .map((_, i) => (
            <div className="space-y-4 mt-4" key={i + 1}>
              <Label>Image {i + 1}</Label>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[i] = file;
                    return newImages;
                  });
                }}
              />
              {/* <Input placeholder={`Caption for image ${i + 1}`} /> */}
            </div>
          ))}
      </CardContent>
      <Separator />
      <CardContent>
        <h3 className="text-2xl font-semibold text-primary ">
          Store Video (Max 30s)
        </h3>
        <div className="space-y-4 mt-4">
          <Label>Video</Label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setVideos([file]);
            }}
          />
          {/* <Input placeholder={`Caption for video`} /> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="px-12"
          size={"lg"}
          disabled={isPending}
          onClick={onSubmit}
        >
          {isPending ? "Uploading..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}
