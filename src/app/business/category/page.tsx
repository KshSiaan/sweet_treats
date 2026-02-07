import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/lib/api/business";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";
import CategoryAdd from "./category-add";

import DelCat from "./del-cat";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getCategories(token!);

  return (
    <section className="space-y-4">
      {/* <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre> */}
      <h1 className="text-2xl font-semibold text-primary">
        Product Categories
      </h1>
      <p className="text-sm text-muted-foreground font-semibold">
        Manage Sub-categories of their main category
      </p>
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(data?.data || {}).map(
          ([categoryKey, categories], i) => (
            <Card key={categoryKey} className="justify-between">
              <CardHeader className="border-b">
                <CardTitle className="font-bold">
                  {categoryKey
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-semibold text-muted-foreground flex-1">
                {categories.map((category) => (
                  <div
                    className="p-2 px-4 bg-secondary rounded-lg shadow flex justify-between items-center"
                    key={category.id}
                  >
                    <div className="">{category.name}</div>
                    <div className="">
                      <DelCat cat={category} />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t flex justify-between items-center gap-4">
                <CategoryAdd
                  id={categories[0]?.business_category_id ?? i + 1}
                />
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  );
}
