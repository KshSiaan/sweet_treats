import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import AddPromo from "./add-promo";
import EditPromo from "./edit-promo";
import { useCookies } from "react-cookie";
import { getPromotions } from "@/lib/api/business";
import { base_url } from "@/lib/utils";
export default function Promos() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => {
      return getPromotions(token);
    },
    placeholderData: (prev) => prev,
  });
  return (
    <>
      <div className="w-full flex justify-between items-center pb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Active Promotions
        </h3>
        <AddPromo />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {isPending ? (
          <div>Loading...</div>
        ) : (
          data?.data?.map((item) => (
            <Card className="pt-0! overflow-hidden">
              <CardHeader className="flex justify-between items-center bg-accent py-4">
                <CardTitle className="text-2xl font-semibold text-primary">
                  {item?.title}
                </CardTitle>
                {/* <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                <span
                  className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                  aria-hidden="true"
                />
                Active
              </Badge> */}
              </CardHeader>
              <CardContent className="space-y-2">
                <Image
                  className="w-full bg-accent rounded-lg aspect-[3/1] object-cover"
                  height={200}
                  width={1200}
                  alt="banner"
                  src={
                    item?.image
                      ? `${base_url}${item.image}`
                      : "https://placehold.co/600x400"
                  }
                />
                <p className="font-semibold text-muted-foreground mt-6">
                  {item?.description}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-6 text-muted-foreground">
                  <div className="">
                    <h4 className="text-lg font-semibold ">Duration</h4>
                    <p>{new Date(item?.ending_date).toLocaleDateString()}</p>
                  </div>
                  <div className="">
                    <h4 className="text-lg font-semibold ">Discount</h4>
                    <p>{item?.discount_value}%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="space-x-4">
                <EditPromo />
                <Button className="px-12" variant={"destructive"}>
                  End Promotion
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
