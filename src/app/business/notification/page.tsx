import { getNotifications } from "@/lib/api/global";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import Notif from "./notif";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import ReadAll from "./read-all";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const notifications = await getNotifications(token);
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">Notifications</h1>
        <Suspense
          fallback={
            <Button disabled size={"sm"}>
              <BellIcon />
            </Button>
          }
        >
          <ReadAll />
        </Suspense>
      </div>
      <div className="space-y-4 mt-4">
        {notifications?.data?.data?.map((notif) => (
          <Suspense key={notif.id}>
            <Notif data={notif} />
          </Suspense>
        )) || <p className="text-muted-foreground">No notifications found.</p>}
      </div>
    </section>
  );
}
