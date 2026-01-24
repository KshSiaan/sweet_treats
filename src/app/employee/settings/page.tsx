import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";
import ProfUpdateForm from "./prof-update-form";

import { cookies } from "next/headers";
import { getMeApi } from "@/lib/api/auth";
import AvatarUpdater from "./avatar_updater";
import { base_url } from "@/lib/utils";
import PassUpdater from "./pass-updater";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const me = await getMeApi(token);
  return (
    <div className="!pb-12 !py-12 border rounded-xl">
      <div className="flex flex-row justify-center items-center">
        <Avatar className="size-[140px] relative overflow-visible">
          <AvatarImage
            src={
              me?.data?.user?.avatar
                ? `${base_url}${me?.data?.user?.avatar}`
                : "https://placehold.co/400"
            }
            className="object-cover rounded-full"
          />
          <AvatarFallback>AV</AvatarFallback>
          <Button
            className="absolute bottom-0 right-0 z-30"
            variant="outline"
            size="icon"
          >
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              <EditIcon />
            </label>
            <AvatarUpdater />
          </Button>
        </Avatar>
      </div>
      <div className="">
        <ProfUpdateForm data={me?.data?.user} />
        <div className="px-6 w-full">
          <PassUpdater />
        </div>
      </div>
    </div>
  );
}
