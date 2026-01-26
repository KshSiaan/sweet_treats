import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { getPage } from "@/lib/api/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getPage("terms");

  const cleanHTML = DOMPurify.sanitize(data?.data?.content || "");

  return (
    <main
      className="p-6 text-center w-full"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
