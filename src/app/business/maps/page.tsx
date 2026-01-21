import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessMap } from "@/lib/api/business";
import { cookies } from "next/headers";
import MapEmbed from "./map-embed";
import { Suspense } from "react";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const map = await getBusinessMap(token);

  return (
    <section className="overflow-hidden">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">
          Google Maps Integration
        </h3>
        <p className="text-sm text-muted-foreground">
          Add and manage your store location on Google Maps.
        </p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold text-primary">
            Store Location
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Suspense>
            <MapEmbed embedCode={map?.data?.google_map_embed_code ?? ""} />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
