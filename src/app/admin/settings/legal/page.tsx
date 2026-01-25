import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl">Legal Settings</h1>
      <div className="mt-4 space-y-4 space-x-4">
        <Button variant={"outline"} asChild>
          <Link href="/admin/settings/legal/terms">Terms and Conditions</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/admin/settings/legal/privacy">Privacy Policy</Link>
        </Button>
      </div>
    </section>
  );
}
