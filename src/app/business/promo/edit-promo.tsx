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
  addPromotion,
  editPromotion,
  getCategories,
  getProducts,
} from "@/lib/api/business";
import { Checkbox } from "@/components/ui/checkbox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toDDMMYYYY } from "@/lib/funcs";
import { BusinessCategory, PromotionType } from "@/types/dbs/business";

const schema = z.object({
  title: z.string().min(1),
  business_category_id: z.string().min(1),
  type: z.string().min(1),
  discount_value: z.string().min(1),
  starting_date: z.string().min(1),
  ending_date: z.string().min(1),
  description: z.string().min(1),
  target_category_id: z.string().min(1),
  is_specific: z.boolean(),
  target_products: z.array(z.string()).optional(),
});

export default function EditPromo({ data: promo }: { data: PromotionType }) {
  const [{ token }] = useCookies(["token"]);
  const [files, setFiles] = useState<File[] | undefined>([]);
  const handleDrop = (files: File[]) => setFiles(files);
  const qcl = useQueryClient();
  const [isSpecificProduct, setIsSpecificProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ["products", token],
    queryFn: () => getProducts(token),
    enabled: !!token,
  });

  const { mutate, isPending: adding } = useMutation({
    mutationKey: ["edit_promotion", token, promo.id],
    mutationFn: (body: FormData) => {
      return editPromotion(token, String(promo.id), body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["promotions"] });
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      business_category_id: String(promo.business_category_id) ?? "1",
      title: promo.title,
      type: promo.type,
      discount_value: String(promo.discount_value),
      starting_date: promo.starting_date,
      ending_date: promo.ending_date,
      description: promo.description,
      target_category_id: String(promo.target_category_id),
      is_specific: promo.is_specific,
      target_products: promo.target_products ?? [],
    },
  });
  const business_cat = form.watch("business_category_id");
  const BUSINESS_CATEGORY_MAP: Record<string, BusinessCategory> = {
    "1": "retail",
    "2": "labor_service",
    "3": "food_service",
    "4": "rental",
    "5": "ecommerce",
  };

  const categoryKey: BusinessCategory | undefined = business_cat
    ? BUSINESS_CATEGORY_MAP[business_cat]
    : undefined;

  const { data: cats, isPending: catPending } = useQuery({
    queryKey: ["categories", token],
    queryFn: () => getCategories(token),
    enabled: !!token && !!business_cat,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const formData = new FormData();

    formData.append("business_category_id", values.business_category_id ?? "1");
    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("discount_value", values.discount_value);
    formData.append("starting_date", toDDMMYYYY(values.starting_date));
    formData.append("ending_date", toDDMMYYYY(values.ending_date));
    formData.append("description", values.description);
    formData.append("target_category_id", values.target_category_id ?? "");
    formData.append("is_specific", values.is_specific ? "1" : "0");

    if (values.is_specific && selectedProducts.length > 0) {
      selectedProducts.forEach((id, index) => {
        formData.append(`target_products[${index}]`, id);
      });
    }

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
          <DialogTitle>Create Promotion</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-6 pb-6 max-h-[80dvh] overflow-y-auto"
        >
          <Label>Promotion Title</Label>
          <Input
            placeholder="Enter promotion title"
            {...form.register("title")}
          />

          <Label>Promotion Image</Label>
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

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>Promotion type</Label>
              <Select onValueChange={(v) => form.setValue("type", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Discount">Discount</SelectItem>
                  <SelectItem value="Coupon">Coupon</SelectItem>
                  <SelectItem value="Voucher">Voucher</SelectItem>
                  <SelectItem value="Buy1Get1">Buy 1 Get 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Discount Value</Label>
              <Input
                placeholder="e.g. 20"
                {...form.register("discount_value")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Start Date</Label>
              <Input type="date" {...form.register("starting_date")} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="date" {...form.register("ending_date")} />
            </div>
          </div>

          <Label>Business Category</Label>
          <Select
            onValueChange={(v) => form.setValue("business_category_id", v)}
            defaultValue="1"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Retail</SelectItem>
              <SelectItem value="2">Labor Service</SelectItem>
              <SelectItem value="3">Food Service</SelectItem>
              <SelectItem value="4">Rental</SelectItem>
              <SelectItem value="5">Ecommerce</SelectItem>
            </SelectContent>
          </Select>
          <Label>Target Category</Label>
          <Select
            onValueChange={(v) => form.setValue("target_category_id", v)}
            defaultValue="1"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {!catPending &&
                categoryKey &&
                cats?.data?.[categoryKey]?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Label>Do you want specific product offer?</Label>
          <RadioGroup
            className="flex gap-4"
            onValueChange={(v) => {
              const yes = v === "yes";
              setIsSpecificProduct(yes);
              form.setValue("is_specific", yes);
            }}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="yes" className="border-primary" />
              <Label htmlFor="yes">Yes</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="no" className="border-primary" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>

          {isSpecificProduct && (
            <div>
              <Label>Select Product</Label>

              {isPending ? (
                <div>Loading...</div>
              ) : data?.data?.data?.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia>
                      <UploadCloudIcon className="w-12 h-12 text-muted-foreground" />
                    </EmptyMedia>
                    <EmptyTitle>No Products Found</EmptyTitle>
                  </EmptyHeader>
                </Empty>
              ) : (
                data?.data?.data?.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 border-b p-2"
                  >
                    <Checkbox
                      checked={selectedProducts.includes(String(product.id))}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const arr = [...selectedProducts, String(product.id)];
                          setSelectedProducts(arr);
                          form.setValue("target_products", arr);
                        } else {
                          const arr = selectedProducts.filter(
                            (id) => id !== String(product.id)
                          );
                          setSelectedProducts(arr);
                          form.setValue("target_products", arr);
                        }
                      }}
                    />

                    <div>
                      <p className="font-semibold text-primary">
                        {product.product_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <Label>Description</Label>
          <Textarea
            placeholder="Enter promotion description"
            {...form.register("description")}
          />

          <DialogFooter className="pt-4">
            <DialogClose disabled={adding} asChild>
              <Button disabled={adding} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={adding}>
              {adding ? "Updating..." : "Update Promotion"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
