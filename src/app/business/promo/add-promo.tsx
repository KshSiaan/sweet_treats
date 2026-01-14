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
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/business";
import { Checkbox } from "@/components/ui/checkbox";
export default function AddPromo() {
  const [{ token }] = useCookies(["token"]);
  const [isSpecificProduct, setIsSpecificProduct] = useState<boolean>(false);
  const { data, isPending } = useQuery({
    queryKey: ["products", token],
    queryFn: () => {
      return getProducts(token);
    },
    enabled: !!token || !!isSpecificProduct,
  });
  const [files, setFiles] = useState<File[] | undefined>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const handleDrop = (files: File[]) => setFiles(files);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Promotion
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0! ">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Create Promotion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6 pb-6 max-h-[80dvh] overflow-y-auto">
          <Label>Promotion Title</Label>
          <Input placeholder="Enter promotion title" />
          <Label>Promotion Image</Label>
          <div className="w-full border border-dashed rounded-lg flex justify-center items-center hover:bg-accent transition-colors">
            <label htmlFor="imgSel" className="cursor-pointer h-full w-full">
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={handleDrop}
                src={files}
                multiple
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
              <input type="file" className="hidden" id="imgSel" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-4">
              <Label>Promotion type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Percentage Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Discount Value</Label>
              <Input placeholder="e.g. 20 or 20%" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-4">
              <Label>Start Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-4">
              <Label>End Date</Label>
              <Input type="date" />
            </div>
          </div>
          <Label>Target Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <Label>Do you want to make an offer on a specific product?</Label>
          <RadioGroup
            className="flex-row flex"
            onValueChange={(value) => setIsSpecificProduct(value === "yes")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="yes"
                className="border-primary border-2"
              />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="no"
                className="border-primary border-2"
              />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
          {isSpecificProduct && (
            <div className="w-full">
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
                <div className="">
                  {data?.data?.data?.map((product) => (
                    <div
                      className="flex flex-row justify-start items-center gap-2 border-b last:border-0"
                      key={product.id}
                    >
                      <Checkbox
                        checked={selectedProducts.includes(String(product.id))}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts([
                              ...selectedProducts,
                              String(product.id),
                            ]);
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter(
                                (id) => id !== String(product.id)
                              )
                            );
                          }
                        }}
                      />
                      <div className="p-4 ">
                        <h4 className="font-semibold text-primary">
                          {product.product_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <Label>Description</Label>
          <Textarea placeholder="Enter promotion description" />
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Create Promotion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
