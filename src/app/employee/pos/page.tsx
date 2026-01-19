import {
  Tabs,
  TabsTrigger,
  TabsList,
  TabsContent,
} from "@/components/custom-tabs";

import React from "react";
import Store from "./store";

export default function page() {
  return (
    <main>
      <Tabs defaultValue="1">
        <TabsList className="border-b">
          <TabsTrigger value="1">In Store</TabsTrigger>
          <TabsTrigger value="2">History</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Store />
        </TabsContent>
        <TabsContent value="2"></TabsContent>
      </Tabs>
    </main>
  );
}
