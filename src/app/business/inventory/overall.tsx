"use client";
import React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/custom-tabs";
import ProductSet from "./productset";
import Stock from "./stock";
export default function OverAll() {
  const [activeTab, setActiveTab] = React.useState("1");
  return (
    <>
      <div className="pb-6">
        <Tabs defaultValue="1" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="1">Products</TabsTrigger>
            <TabsTrigger value="2">Stock Request</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {activeTab === "1" && <ProductSet />}
      {activeTab === "2" && <Stock />}
    </>
  );
}
