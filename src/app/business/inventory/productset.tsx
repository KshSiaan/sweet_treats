import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getProducts } from "@/lib/api/business";
import { Loader2Icon, SearchIcon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import InventController from "./invent-controller";
import { base_url } from "@/lib/utils";
import AddProd from "./add-prod";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
export default function ProductSet() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["products", token],
    queryFn: () => {
      return getProducts(token);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
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
                <Suspense>
                  <InventController data={item} />
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
