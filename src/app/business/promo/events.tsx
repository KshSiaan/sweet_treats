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
import EditPromo from "./edit-promo";
import { useCookies } from "react-cookie";
import { getEvents } from "@/lib/api/business";
import { base_url, cn } from "@/lib/utils";
import AddEvent from "./add-event";
import EditEvent from "./edit-event";

export default function Events() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      return getEvents(token);
    },
    placeholderData: (prev) => prev,
  });
  return (
    <>
      <div className="w-full flex justify-between items-center pb-6">
        <h3 className="text-2xl font-semibold text-primary ">Active Events</h3>
        <AddEvent />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {isPending ? (
          <div>Loading...</div>
        ) : (
          data?.data?.map((item) => (
            <Card className="pt-0! overflow-hidden" key={item.id}>
              <CardHeader className="flex justify-between items-center bg-accent py-4">
                <CardTitle className="text-2xl font-semibold text-primary">
                  {item?.title}
                </CardTitle>
                <Badge
                  className={cn(
                    "rounded-full border-none",
                    item?.is_online
                      ? "bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5"
                      : "bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5",
                  )}
                >
                  {item?.is_online ? (
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                      aria-hidden="true"
                    />
                  )}
                  {item?.is_online ? "Online" : "Offline"}
                </Badge>
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
                    <h4 className="text-lg font-semibold ">Starting</h4>
                    <p>
                      {new Date(item?.event_date).toLocaleDateString()} at{" "}
                      {item?.starting_time}
                    </p>
                  </div>
                  {/* <div className="">
                    <h4 className="text-lg font-semibold ">Discount</h4>
                    <p>{item?.}%</p>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="space-x-4">
                <EditEvent data={item} />
                <Button className="px-12" variant={"destructive"}>
                  End Event
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
