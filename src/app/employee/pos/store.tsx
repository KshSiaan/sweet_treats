import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Store() {
  return (
    <section className="py-4 grid grid-cols-10 gap-6">
      <div className="col-span-7 ">
        <h1 className="text-2xl font-semibold text-primary">Choose Category</h1>
        <div className="mt-4 grid grid-cols-5 gap-4">
          <Card className="aspect-square">
            <CardContent className="h-full w-full"></CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-3">
        <h1 className="text-2xl font-semibold text-primary">Cart</h1>
      </div>
    </section>
  );
}
