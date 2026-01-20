"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getEmployeeCategories } from "@/lib/api/employee";
import { BusinessCategory } from "@/types/dbs/business";
import { Button } from "@/components/ui/button";

export default function Store() {
  const [{ token }] = useCookies(["token"]);

  // 👇 MATCHES AddPromo PATTERN
  const [businessCategoryId, setBusinessCategoryId] = useState<string | null>(
    null,
  );

  // fetch ONCE
  const { data, isPending, isError } = useQuery({
    queryKey: ["employee-categories", token, businessCategoryId],
    queryFn: () => getEmployeeCategories(token, businessCategoryId!),
    enabled: !!token && !!businessCategoryId,
  });

  return (
    <section className="py-4 grid grid-cols-10 gap-6">
      {/* LEFT */}
      <div className="col-span-7">
        <h1 className="text-2xl font-semibold text-primary">Choose Category</h1>

        <div className="mt-4 grid grid-cols-5 gap-4">
          {[
            {
              id: "1",
              name: "Retail",
              img: "/cat_cart.svg",
              color: "bg-purple-500/10",
            },
            {
              id: "2",
              name: "Labour Services",
              img: "/cat_tools.svg",
              color: "bg-yellow-500/10",
            },
            {
              id: "3",
              name: "Food Services",
              img: "/cat_food.svg",
              color: "bg-red-500/10",
            },
            {
              id: "4",
              name: "Rental",
              img: "/cat_key.svg",
              color: "bg-green-500/10",
            },
            {
              id: "5",
              name: "E-commerce",
              img: "/cat_ecommerce.svg",
              color: "bg-blue-500/10",
            },
          ].map((item) => {
            const isActive = businessCategoryId === item.id;

            return (
              <Card
                key={item.id}
                onClick={() => setBusinessCategoryId(item.id)}
                className={`aspect-square cursor-pointer transition
                  hover:scale-[1.02]
                  ${isActive ? "ring-2 ring-primary" : ""}
                `}
              >
                <CardContent className="h-full w-full flex flex-col gap-2 justify-center items-center">
                  <div
                    className={`size-[40%] ${item.color} flex justify-center items-center rounded-md`}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="size-[70%]"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-muted-foreground">
                    {item.name}
                  </h4>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* SUB-CATEGORIES */}
        <div className="mt-6">
          <h1 className="text-2xl font-semibold text-primary">
            Choose Sub-category
          </h1>

          {!businessCategoryId && (
            <p className="text-muted-foreground mt-2">
              Select a category first
            </p>
          )}

          {isPending && (
            <p className="text-muted-foreground mt-2">Loading categories…</p>
          )}

          {isError && (
            <p className="text-red-500 mt-2">Failed to load categories</p>
          )}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data?.data?.map((x) => (
              <Button variant={"outline"} key={x.id}>
                {x.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-3">
        <h1 className="text-2xl font-semibold text-primary">Cart</h1>
      </div>
    </section>
  );
}
