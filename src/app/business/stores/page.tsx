import { getStoreFronts } from "@/lib/api/business";
import { base_url } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";

import React, { Suspense } from "react";
import DataController from "./data-controller";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const { data } = await getStoreFronts(token);
  return (
    <section>
      {data?.video_path && (
        <div className="mb-6 space-y-4">
          <h3 className="text-2xl font-semibold text-primary ">Store Video</h3>
          <video width="320" height="240" controls>
            <source src={`${base_url}${data?.video_path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {data?.images.length > 0 && (
        <div className="mb-6 space-y-4">
          <h3 className="text-2xl font-semibold text-primary ">Store Images</h3>
          <div className="w-full grid grid-cols-3 gap-6">
            {data?.images.map((image, i) => (
              <Image
                className="w-full aspect-video rounded-lg shadow object-contain"
                src={`${base_url}${image}`}
                width={500}
                height={500}
                alt={`image${i}`}
                key={i}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Store Front Customization
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize how your store appears to customers.
        </p>
      </div>
      <Suspense>
        <DataController />
      </Suspense>
    </section>
  );
}
