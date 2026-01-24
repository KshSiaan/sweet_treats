"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom-tabs";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getRecentOrders } from "@/lib/api/employee";
import Orders from "./pending";
import { Loader2Icon } from "lucide-react";

export default function Recent() {
  const [{ token }] = useCookies(["token"]);
  const [activeTab, setActiveTab] = React.useState<
    | "Pending"
    | "Canceled"
    | "In Progress"
    | "Ready"
    | "On The Way"
    | "Delivery Accepted"
  >("Pending");
  const { data, isPending } = useQuery({
    queryKey: ["recent-orders", activeTab],
    queryFn: () => {
      return getRecentOrders(token, activeTab);
    },
  });
  return (
    <div className="w-full">
      <Tabs>
        <TabsList>
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Canceled">Canceled</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="Ready">Ready</TabsTrigger>
          <TabsTrigger value="On The Way">On The Way</TabsTrigger>
          <TabsTrigger value="Delivery Accepted">Delivery Accepted</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending">
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            <Orders
            // data={data}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
