"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadInputProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  onCropClick: (imageSrc: string) => void;
  index?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUploadInput({
  label,
  value,
  onChange,
  onCropClick,
  index,
}: ImageUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`Invalid file type. Allowed: JPEG, PNG, WebP, GIF`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File size must be under 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      );
      return false;
    }

    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateFile(file)) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageSrc = event.target?.result as string;
      setPreview(imageSrc);
      onCropClick(imageSrc);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      if (inputRef.current) inputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedFile: File) => {
    onChange(croppedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(croppedFile);
    toast.success("Image cropped successfully");
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  React.useEffect(() => {
    if (value && !preview) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(value);
    }
  }, [value, preview]);

  return (
    <div className="space-y-3">
      <Label htmlFor={`image-upload-${index}`}>{label}</Label>

      {preview ? (
        <div className="space-y-2">
          <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden border border-border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onCropClick(preview);
              }}
              className="flex-1"
            >
              Edit Crop
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {value?.name} • {(value?.size ? value.size / 1024 : 0).toFixed(0)}KB
          </p>
        </div>
      ) : (
        <div className="relative">
          <Input
            ref={inputRef}
            id={`image-upload-${index}`}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
            <div className="text-sm text-center">
              <p className="font-medium text-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, WebP or GIF (Max 5MB)
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
