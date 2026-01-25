import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { getPage } from "@/lib/api/admin";

export default async function Page() {
  const data = await getPage("privacy");

  const cleanHTML = DOMPurify.sanitize(data?.data?.content || "");

  return (
    <main
      className="p-6 text-center w-full"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
