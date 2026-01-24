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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, getCategories } from "@/lib/api/business";
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
// ----- Zod Schema -----
const addItemSchema = z.object({
  business_category_id: z.string().min(1, "Category is required"),
  product_category_id: z.string().min(1, "Category is required"),
  product_name: z.string().min(1, "Product name is required"),
  price: z.string().optional(),
  unit: z.string().optional(),
  stock: z.string().optional(),
  availability: z.string().optional(),
  description: z.string().optional(),
});

type AddItemForm = z.infer<typeof addItemSchema>;

export default function AddProd() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const navig = useRouter();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories(token),
  });

  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = (files: File[]) => setFiles(files);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
  } = useForm<AddItemForm>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      product_name: "",
      business_category_id: "",
      product_category_id: "",
      stock: "",
      price: "",
      unit: "",
      description: "",
      availability: "Available",
    },
  });
  const businessCategory = watch("business_category_id");
  const unit = watch("unit");
  const stock = watch("stock");

  // Ensure unit and stock are mutually exclusive and drive visibility
  React.useEffect(() => {
    if (unit && unit !== "") {
      setValue("stock", "");
    }
  }, [unit, setValue]);

  React.useEffect(() => {
    if (stock && stock !== "") {
      setValue("unit", "");
      setValue("availability", "");
    }
  }, [stock, setValue]);

  // Map selected business category to the correct child categories key
  const categoryKeyMap: Record<string, string> = {
    "1": "retail",
    "2": "labor_service",
    "3": "food_service",
    "4": "rental",
    "5": "ecommerce",
  };

  const selectedCategoryKey = categoryKeyMap[businessCategory ?? ""];
  const productCategories = selectedCategoryKey
    ? ((data?.data as any)?.[selectedCategoryKey] ?? [])
    : [];

  // When business category changes, clear previously chosen product category
  React.useEffect(() => {
    setValue("product_category_id", "");
  }, [businessCategory, setValue]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (body: FormData) => {
      return addProduct(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({
        queryKey: ["products"],
      });
      resetForm();
      setFiles([]);
      setValue("unit", "");
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
          {productCategories.length > 0 && (
            <div>
              <Label>Product Category</Label>
              <Select
                onValueChange={(value) =>
                  setValue("product_category_id", value)
                }
                value={watch("product_category_id")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product Category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category: any) => (
                    <SelectItem value={String(category.id)} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {unit !== "" ? (
              <div>
                <Label>Availablity</Label>
                <Select
                  onValueChange={(value) => setValue("availability", value)}
                  value={watch("availability")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Availablity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not-available">Not-available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <Label>Stock</Label>
                <Input
                  placeholder="Enter quantity"
                  type="number"
                  {...register("stock")}
                />
              </div>
            )}
            <div>
              <Label>Price</Label>
              <Input
                placeholder="Enter price"
                type="number"
                {...register("price")}
              />
            </div>
          </div>
          {stock === "" && (
            <div>
              <Label>Unit</Label>
              <Select
                value={watch("unit")}
                onValueChange={(value) => setValue("unit", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Select unit"} />
                </SelectTrigger>
                <SelectContent>
                  {businessCategory === "4" || businessCategory === "2" ? (
                    <>
                      <SelectItem value="hour">Hour</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="gm">Gram (gm)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

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
            <Button
              variant={"ghost"}
              type="button"
              onClick={() => {
                resetForm();
                setFiles([]);
                setValue("unit", "");
              }}
            >
              Reset
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
