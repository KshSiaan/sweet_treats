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

const TAB_VALUES = [
  "Pending",
  "Canceled",
  "In Progress",
  "Ready",
  "On The Way",
  "Delivery Accepted",
] as const;

type TabValue = (typeof TAB_VALUES)[number];

export default function Recent() {
  const [{ token }] = useCookies(["token"]);
  const [activeTab, setActiveTab] = React.useState<TabValue>("Pending");
  const { data, isPending } = useQuery({
    queryKey: ["recent-orders", activeTab],
    queryFn: () => {
      return getRecentOrders(token, activeTab);
    },
  });

  const renderContent = () => (
    <>
      {isPending ? (
        <div className={`flex justify-center items-center h-24 mx-auto`}>
          <Loader2Icon className={`animate-spin`} />
        </div>
      ) : (
        <Orders data={data?.data ?? []} />
      )}
    </>
  );

  return (
    <div className="w-full">
      <Tabs
        defaultValue="Pending"
        onValueChange={(val) => setActiveTab(val as TabValue)}
      >
        <TabsList>
          {TAB_VALUES.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_VALUES.map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderContent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
