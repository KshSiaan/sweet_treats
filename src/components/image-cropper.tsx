"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { RotateCw, ZoomIn } from "lucide-react";
import { toast } from "sonner";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
  imageIndex?: number;
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const file = new File([blob], `cropped-image-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          resolve(file);
        },
        "image/jpeg",
        0.95,
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onCropComplete,
  onCancel,
  imageIndex,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropAreaChange = useCallback(
    (croppedArea: unknown, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log(
        "[v0] Cropped file created:",
        croppedFile.name,
        croppedFile.size,
      );
      onCropComplete(croppedFile);
    } catch (error) {
      console.error("[v0] Error cropping image:", error);
      toast.error("Failed to crop image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Crop Image {imageIndex ? `#${imageIndex}` : ""}
          </DialogTitle>
          <DialogDescription>
            Drag to move, scroll to zoom, and use the controls below to adjust
            your image
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cropper Container */}
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden border">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={16 / 9}
              cropShape="rect"
              showGrid
              onCropChange={setCrop}
              onCropAreaChange={onCropAreaChange}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              restrictPosition={true}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Zoom Control */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Zoom: {(zoom * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={1}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Rotation Control */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Rotation: {rotation}°
                </span>
              </div>
              <Slider
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
                min={0}
                max={360}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isProcessing}
          >
            Reset
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleCropConfirm} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Crop & Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
