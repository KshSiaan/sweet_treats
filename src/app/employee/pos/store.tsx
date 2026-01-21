"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getEmployeeCategories, getEmployeeProducts } from "@/lib/api/employee";
import { BusinessCategory } from "@/types/dbs/business";
import { Button } from "@/components/ui/button";
import { base_url } from "@/lib/utils";
import { ProductType } from "@/types/dbs/employee";
import { CreditCardIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type CartItem = ProductType & {
  quantity: number;
  count: number;
};

export default function Store() {
  const [{ token }] = useCookies(["token"]);
  const [cart, setCart] = useState<CartItem[]>([]);
  // 👇 MATCHES AddPromo PATTERN
  const [businessCategoryId, setBusinessCategoryId] = useState<string | null>(
    null,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // fetch ONCE
  const { data, isError } = useQuery({
    queryKey: ["employee-categories", token, businessCategoryId],
    queryFn: () => getEmployeeCategories(token, businessCategoryId!),
    enabled: !!token && !!businessCategoryId,
  });
  const { data: productsData } = useQuery({
    queryKey: ["employee-products", token, selectedSubCategory?.id],
    queryFn: () => getEmployeeProducts(token, selectedSubCategory!.id),
    enabled: !!token && !!selectedSubCategory,
  });

  const handleAddToCart = (product: ProductType) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, count: item.count + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1, count: 1 }];
    });
  };

  const handleIncrementQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrementQuantity = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleIncrementCount = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const handleDecrementCount = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0),
    );
  };

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

          {/* {isPending && (
            <p className="text-muted-foreground mt-2">Loading categories…</p>
          )} */}

          {isError && (
            <p className="text-red-500 mt-2">Failed to load categories</p>
          )}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data?.data?.map((x) => (
              <Button
                variant={
                  String(x.id) === selectedSubCategory?.id
                    ? "default"
                    : "outline"
                }
                key={x.id}
                onClick={() => {
                  setSelectedSubCategory({
                    id: String(x.id),
                    name: x.name,
                  });
                }}
              >
                {x.name}
              </Button>
            ))}
          </div>
          <div className="">
            {selectedSubCategory && (
              <h1 className="text-2xl font-semibold text-primary mt-4">
                {selectedSubCategory ? selectedSubCategory.name : "Unknown"}{" "}
                Item
              </h1>
            )}
            <div className="w-full grid grid-cols-3 gap-4 mt-4">
              {productsData?.data?.map((product) => (
                <Card key={product.id} className="cursor-pointer">
                  <CardContent>
                    <div className="w-full aspect-video relative">
                      <Image
                        src={
                          product.product_images[0]
                            ? `${base_url}${product.product_images[0]}`
                            : "/placeholder_image.png"
                        }
                        alt={product.product_name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mt-2">
                      {product.product_name}
                    </h4>
                    <p className=" text-xl font-semibold text-primary">
                      ${product.price}
                    </p>
                    {product?.discount ? (
                      <p>
                        <span className="line-through text-muted-foreground">
                          ${product.price}
                        </span>
                        <sub>{product.discount}</sub>
                      </p>
                    ) : (
                      <p>&nbsp;</p>
                    )}
                    <div className="text-muted-foreground text-sm">
                      {product?.rating} ⭐ ({product?.rating_count} Reviews)
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        product.id ===
                        cart.find((item) => item.id === product.id)?.id
                      }
                    >
                      {product.id ===
                      cart.find((item) => item.id === product.id)?.id
                        ? "Added to cart"
                        : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-3">
        <div className=" max-h-dvh sticky top-4 space-y-4">
          <h1 className="text-2xl font-semibold text-primary">Cart</h1>
          <div className="space-y-4 max-h-[30dvh] overflow-y-auto">
            {cart.length === 0 && (
              <p className="text-muted-foreground">Cart is empty</p>
            )}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center border-b pb-2 gap-2"
              >
                <div className="w-1/5 aspect-square relative">
                  <Image
                    src={
                      item.product_images[0]
                        ? `${base_url}${item.product_images[0]}`
                        : "/placeholder_image.png"
                    }
                    alt={item.product_name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 h-full flex flex-col justify-between items-start">
                  <h4 className="text-sm font-semibold text-muted-foreground ">
                    {item.product_name}
                  </h4>
                  <p className="text-primary text-lg font-semibold">
                    ${item.price}
                  </p>

                  <div className="flex-1 w-full grid grid-cols-2 gap-4 pr-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4 pr-4 text-xs">
                      <p>Quantity:</p>
                      <p>
                        {item?.business_category_id === 2 ||
                          (item?.business_category_id === 4 &&
                            `${item.unit} :`)}
                      </p>
                    </div>
                    <div className="w-full h-full bg-primary/20 rounded-lg flex justify-between items-center p-1">
                      <Button
                        size={"icon-sm"}
                        onClick={() => handleIncrementQuantity(item.id)}
                        className="size-6 rounded-full"
                        variant={"outline"}
                      >
                        <PlusIcon />
                      </Button>
                      <span className="w-full flex-1 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size={"icon-sm"}
                        className="size-6 rounded-full"
                        variant={"outline"}
                        onClick={() => handleDecrementQuantity(item.id)}
                      >
                        <MinusIcon />
                      </Button>
                    </div>

                    {item.business_category_id === 2 ||
                      (item.business_category_id === 4 && (
                        <div className="w-full h-full bg-primary/20 rounded-lg flex justify-between items-center">
                          <Button
                            size={"icon-sm"}
                            onClick={() => handleIncrementCount(item.id)}
                          >
                            <PlusIcon />
                          </Button>
                          <span className="w-full flex-1 text-center">
                            {item.count}
                          </span>
                          <Button
                            size={"icon-sm"}
                            onClick={() => handleDecrementCount(item.id)}
                          >
                            <MinusIcon />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Card className="">
            <CardContent>
              <p className="flex justify-between items-center font-semibold">
                <span>Subtotal:</span>
                <span className="">
                  $
                  {cart
                    .reduce(
                      (acc, item) =>
                        acc + parseFloat(item.price) * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </p>
            </CardContent>
            <CardFooter className="border-t">
              <p className="flex justify-between w-full text-xl items-center font-semibold">
                <span>Total:</span>
                <span className="">
                  $
                  {cart
                    .reduce(
                      (acc, item) =>
                        acc + parseFloat(item.price) * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </p>
            </CardFooter>
          </Card>
          <h1 className="text-2xl font-semibold text-primary">Customer Info</h1>
          <Card>
            <CardContent className="space-y-2">
              <Label>Name:</Label>
              <Input placeholder="Customer Name" />
              <Label className="mt-2">Contact:</Label>
              <Input placeholder="Customer Contact" />
              <Label>Address:</Label>
              <Input placeholder="Customer Address" />
            </CardContent>
          </Card>
          <div className="">
            <Card>
              <CardContent className="flex flex-col justify-center items-center gap-2">
                <CreditCardIcon />
                <p>Card</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
