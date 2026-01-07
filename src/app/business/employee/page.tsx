"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/custom-tabs";

import React from "react";
import List from "./list";
import Salary from "./salary";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("1");
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Employee Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your team and their access to business operations.
        </p>
      </div>

      <div className="pb-6">
        <Tabs defaultValue="1" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="1">Employee List</TabsTrigger>
            <TabsTrigger value="2">Employee Salary</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {activeTab === "1" && <List />}
      {activeTab === "2" && <Salary />}
    </section>
  );
}
