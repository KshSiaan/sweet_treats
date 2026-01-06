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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/business";
import { useCookies } from "react-cookie";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormDescription } from "@/components/ui/form";

// ----- Zod Schema -----
const addItemSchema = z.object({
  business_category_id: z.string().min(1, "Category is required"),
  product_name: z.string().min(1, "Product name is required"),
  price: z.string().optional(),
  unit: z.string().optional(),
  stock: z.string().optional(),
  description: z.string().optional(),
});

type AddItemForm = z.infer<typeof addItemSchema>;

export default function AddProd() {
  const [{ token }] = useCookies(["token"]);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories(token),
  });

  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = (files: File[]) => setFiles(files);

  const { register, handleSubmit, watch, setValue } = useForm<AddItemForm>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      product_name: "",
      business_category_id: "",
      stock: "",
      price: "",
      unit: "",
      description: "",
    },
  });

  const onSubmit = (values: AddItemForm) => {
    console.log(values);

    // FormData style
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (files) {
      files.forEach((file, i) => {
        formData.append(`image[${i}]`, file);
      });
    }
    //TODO: Handle form submission logic here
    //TODO: DATE TODAY : 2026-01-06
    // Log all key/value pairs
    console.log("FormData entries:");
    // formData.forEach((value, key) => console.log(`${key}:`, value));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Item
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Item name</Label>
            <Input
              placeholder="Enter item name"
              {...register("product_name")}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setValue("business_category_id", value)}
              value={watch("business_category_id")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(data?.data || {}).map(
                  ([categoryKey, categories]) =>
                    categories.map((category) => (
                      <SelectItem value={String(category.id)} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Stock</Label>
              <Input
                placeholder="Enter quantity"
                type="number"
                {...register("stock")}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                placeholder="Enter price"
                type="number"
                {...register("price")}
              />
            </div>
          </div>
          <div>
            <Label>Unit</Label>
            <Input placeholder="Enter unit" type="text" {...register("unit")} />
            <p className="text-sm text-muted-foreground mt-1">
              Rental: hour, day, month | Retailer: kg, gm
            </p>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter description"
              {...register("description")}
            />
          </div>

          <div>
            <Label>Promotion Image</Label>
            <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={handleDrop}
                src={files}
                multiple
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </div>
          </div>

          <DialogFooter className="p-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
