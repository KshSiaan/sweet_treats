import React from "react";
import OverAll from "./overall";

export default async function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Inventory Management
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your product inventory and stock levels.
        </p>
      </div>
      <OverAll />
    </section>
  );
}
