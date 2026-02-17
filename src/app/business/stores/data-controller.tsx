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
import ImageUploadInput from "@/components/image-upload-input";
import ImageCropperModal from "@/components/image-cropper";

export default function DataController() {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const [images, setImages] = React.useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [videos, setVideos] = React.useState<(File | null)[]>([null]);
  const [cropperOpen, setCropperOpen] = React.useState(false);
  const [cropperImage, setCropperImage] = React.useState<string | null>(null);
  const [cropperImageIndex, setCropperImageIndex] = React.useState<
    number | null
  >(null);

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

  const handleCropClick = (imageSrc: string, index: number) => {
    setCropperImage(imageSrc);
    setCropperImageIndex(index);
    setCropperOpen(true);
  };

  const handleCropComplete = (croppedFile: File) => {
    if (cropperImageIndex !== null) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[cropperImageIndex] = croppedFile;
        return newImages;
      });
    }
    setCropperOpen(false);
    setCropperImage(null);
    setCropperImageIndex(null);
  };

  const validateForm = (): boolean => {
    if (images.every((img) => img === null)) {
      toast.error("Please upload at least one image");
      return false;
    }
    return true;
  };

  function onSubmit() {
    if (!validateForm()) return;

    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images[${index}]`, image);
      }
      console.log(`images[${index}]`, image);
    });

    if (videos[0]) {
      formData.append(`video`, videos[0]);
    }
    mutate(formData);
  }

  return (
    <>
      <Card>
        <CardContent>
          <h3 className="text-2xl font-semibold text-primary mt-6">
            Store Images (Up to 3)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array(3)
              .fill("")
              .map((_, i) => (
                <ImageUploadInput
                  key={i}
                  index={i + 1}
                  label={`Image ${i + 1}`}
                  value={images[i]}
                  onChange={(file) => {
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[i] = file;
                      return newImages;
                    });
                  }}
                  onCropClick={(imageSrc) => handleCropClick(imageSrc, i)}
                />
              ))}
          </div>
        </CardContent>
        <Separator />
        <CardContent>
          <h3 className="text-2xl font-semibold text-primary mt-6">
            Store Video (Max 30s)
          </h3>
          <div className="space-y-4 mt-4 max-w-xs">
            <Label>Video</Label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file && file.size > 100 * 1024 * 1024) {
                  toast.error("Video file must be under 100MB");
                  return;
                }
                setVideos([file]);
              }}
            />
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

      <ImageCropperModal
        isOpen={cropperOpen}
        imageSrc={cropperImage || ""}
        onCropComplete={handleCropComplete}
        onCancel={() => {
          setCropperOpen(false);
          setCropperImage(null);
          setCropperImageIndex(null);
        }}
        imageIndex={cropperImageIndex ? cropperImageIndex + 1 : undefined}
      />
    </>
  );
}
