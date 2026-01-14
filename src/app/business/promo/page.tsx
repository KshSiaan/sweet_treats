"use client";
import Image from "next/image";
import React from "react";
import Promos from "./promos";
import { Tabs, TabsList, TabsTrigger } from "@/components/custom-tabs";
import Events from "./events";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("1");
  return (
    <section className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Promotions Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Create and manage promotions to attract more customers.
        </p>
      </div>
      <div className="pb-6 ">
        <Tabs defaultValue="1" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="1">Active Promotions</TabsTrigger>
            <TabsTrigger value="2">Active Events</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {activeTab === "1" && <Promos />}
      {activeTab === "2" && <Events />}
      {/* <Promos /> */}
    </section>
  );
}
