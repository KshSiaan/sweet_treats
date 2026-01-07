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
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, getCategories, updateProduct } from "@/lib/api/business";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/dbs/business";
// ----- Zod Schema -----
const addItemSchema = z.object({
  business_category_id: z.string().min(1, "Category is required"),
  product_category_id: z.string().min(1, "Category is required"),
  product_name: z.string().min(1, "Product name is required"),
  price: z.string().optional(),
  unit: z.string().optional(),
  stock: z.string().optional(),
  description: z.string().optional(),
});

type AddItemForm = z.infer<typeof addItemSchema>;

export default function EditProd({ data: currData }: { data: ProductType }) {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories(token),
  });

  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = (files: File[]) => setFiles(files);

  const { register, handleSubmit, watch, setValue } = useForm<AddItemForm>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      product_name: currData.product_name ?? "",
      business_category_id: String(currData.business_category_id),
      product_category_id: String(currData.product_category_id),
      stock: String(currData.stock),
      price: String(currData.price),
      unit: currData.unit ?? "",
      description: currData.description ?? "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: (body: FormData) => {
      return updateProduct(token, body, String(currData.id));
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
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
        formData.append(`product_images[${i}]`, file);
      });
    }
    console.log("FormData entries:");
    formData.forEach((value, key) => console.log(`${key}:`, value));
    mutate(formData);
    // Log all key/value pairs
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>

      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Edit Item</DialogTitle>
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
            <Label>Business Category</Label>
            <Select
              onValueChange={(value) => setValue("business_category_id", value)}
              value={watch("business_category_id")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Business Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Retailer</SelectItem>
                <SelectItem value="2">Service</SelectItem>
                <SelectItem value="3">Food</SelectItem>
                <SelectItem value="4">Rental</SelectItem>
                <SelectItem value="5">E-commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Product Category</Label>
            <Select
              onValueChange={(value) => setValue("product_category_id", value)}
              value={watch("product_category_id")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product Category" />
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
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
