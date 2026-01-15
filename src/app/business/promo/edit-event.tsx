"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addEvent,
  addPromotion,
  editEvent,
  getProducts,
} from "@/lib/api/business";
import { Checkbox } from "@/components/ui/checkbox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toDDMMYYYY } from "@/lib/funcs";
import { EventType } from "@/types/dbs/business";

const schema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  event_date: z.string().min(1),
  starting_time: z.string().min(1),
  description: z.string().min(1),
  conference_link: z.string().optional(),
  is_online: z.boolean(),
  location: z.string().optional(),
  target_products: z.array(z.string()).optional(),
});

export default function EditEvent({ data: eve }: { data: EventType }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [isSpecificProduct, setIsSpecificProduct] = useState(false);
  const handleDrop = (files: File[]) => setFiles(files);
  const { mutate, isPending: adding } = useMutation({
    mutationKey: ["edit_event", token],
    mutationFn: (body: FormData) => {
      return editEvent(token, String(eve.id), body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["events", token] });
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: eve.title ?? "",
      type: eve.type ?? "Workshop",
      event_date: eve.event_date ?? "",
      starting_time: eve.starting_time ?? "",
      description: eve.description ?? "",
      is_online: eve.is_online ?? false,
      conference_link: eve.conference_link ?? "",
      location: eve.location ?? "",
      target_products: [],
    },
  });
  const to12Hour = (time: string): string => {
    if (!time) return "";

    const [h, m] = time.split(":").map(Number);
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";

    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("event_date", toDDMMYYYY(values.event_date));
    formData.append("starting_time", to12Hour(values.starting_time));
    formData.append("description", values.description);
    formData.append("conference_link", values.conference_link ?? "");
    formData.append("location", values.location ?? "");

    formData.append("is_online", values.is_online ? "1" : "0");

    if (files && files.length > 0) {
      formData.append("image", files[0]);
    }
    // 🔥 Console output exactly like you wanted
    formData.forEach((value, key) => {
      console.log(`${key}:${value}`);
    });
    mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-6 pb-6 max-h-[80dvh] overflow-y-auto"
        >
          <Label>Event Title</Label>
          <Input
            placeholder="Enter promotion title"
            {...form.register("title")}
          />

          <Label>Event Image</Label>
          <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
            <Dropzone
              accept={{ "image/*": [] }}
              onDrop={handleDrop}
              multiple={false}
              src={files}
            >
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
          </div>

          <div className="grid gap-2">
            <div className="space-y-2">
              <Label>Event type</Label>
              <Select
                onValueChange={(v) => form.setValue("type", v)}
                defaultValue="Workshop"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Product Launch">Product Launch</SelectItem>
                  <SelectItem value="Celebration">Celebration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...form.register("event_date")} />
            </div>
            <div className="space-y-2">
              <Label>Starting Time</Label>
              <Input type="time" {...form.register("starting_time")} />
            </div>
          </div>

          <Label>Event Venue</Label>
          <RadioGroup
            className="flex gap-4"
            onValueChange={(v) => {
              const yes = v === "yes";
              setIsSpecificProduct(yes);
              form.setValue("is_online", !yes);
            }}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="yes" className="border-primary" />
              <Label htmlFor="yes">Offline</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="no" className="border-primary" />
              <Label htmlFor="no">Online</Label>
            </div>
          </RadioGroup>

          <Label>Conference Link</Label>
          <Input
            placeholder="Enter Conference Link"
            {...form.register("conference_link")}
          />
          <Label>Location</Label>
          <Input placeholder="Enter Location" {...form.register("location")} />
          <Label>Description</Label>
          <Textarea
            placeholder="Enter event description"
            {...form.register("description")}
          />

          <DialogFooter className="pt-4">
            <DialogClose disabled={adding} asChild>
              <Button disabled={adding} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={adding}>
              {adding ? "Updating..." : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
