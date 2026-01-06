import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getProducts } from "@/lib/api/business";
import { PlusIcon, SearchIcon, UploadCloudIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import React, { Suspense } from "react";
import InventController from "./invent-controller";
import { base_url } from "@/lib/utils";
import AddProd from "./add-prod";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await getProducts(token);

  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Inventory Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your product inventory and stock levels.
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-primary">
            Product Inventory
          </CardTitle>
          <Suspense>
            <AddProd />
          </Suspense>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputGroup>
            <InputGroupInput />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className="divide-y">
            {data?.data?.map((item) => (
              <div
                className="w-full p-2 rounded-sm flex justify-between items-center"
                key={item.id}
              >
                <div className="flex gap-4 items-center justify-start">
                  <Image
                    src={
                      item?.product_images[0]
                        ? `${base_url}${item?.product_images[0]}`
                        : "https://picsum.photos/200"
                    }
                    height={64}
                    width={64}
                    alt="logo"
                    className="bg-accent size-12 rounded-sm"
                  />
                  <div className="h-full space-y-4">
                    <h4 className="font-bold">{item.product_name}</h4>
                    <div className="flex items-center gap-8 text-sm font-semibold text-muted-foreground">
                      <p>Stock: {item.stock ?? 0}</p>
                      <p>Price: ${item.price}</p>
                      <p>Unit: {item?.unit ?? "Unknown"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-x-4">
                  <InventController />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
