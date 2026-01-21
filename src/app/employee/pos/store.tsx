"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import {
  createInvoiceApi,
  getEmployeeCategories,
  getEmployeeProducts,
} from "@/lib/api/employee";
import { BusinessCategory } from "@/types/dbs/business";
import { Button } from "@/components/ui/button";
import { base_url, cn } from "@/lib/utils";
import { ProductType } from "@/types/dbs/employee";
import {
  CreditCardIcon,
  HandCoinsIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { set } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "cash" | undefined
  >();
  const [customer, setCustomer] = React.useState({
    name: "",
    contact: "",
    address: "",
  });

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
  // ...existing code...
  const { mutate } = useMutation({
    mutationKey: ["create_invoice"],
    mutationFn: (body: {
      business_id: number;
      amount_info: {
        sub_total: number;
        discount: number;
        total_amount: number;
      };
      order_item: Array<{
        product_id: number;
        product_name: string;
        product_price: number;
        quantity: number;
        unit?: string;
        count?: number;
      }>;
      payment_method: string;
    }) => createInvoiceApi(token, body),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      setCart([]);
      setCustomer({
        name: "",
        contact: "",
        address: "",
      });
      setPaymentMethod(undefined);
      setSelectedSubCategory(null);
      setBusinessCategoryId(null);
    },
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmitOrder() {
    const subTotal = cart.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0,
    );

    const payload = {
      business_id: cart[0]?.business_id,
      amount_info: {
        sub_total: subTotal,
        discount: 0,
        total_amount: subTotal,
      },
      customer_info: {
        name: customer.name,
        address: customer.address,
        phone_number: customer.contact,
      },
      order_item: cart.map((item) => ({
        product_id: item.id,
        product_name: item.product_name,
        product_price: parseFloat(item.price),
        quantity: item.quantity,
        unit: item.unit,
        count: item.count,
        business_category_id: item.business_category_id,
        product_category_id: item.product_category_id,
      })),
      payment_method: paymentMethod === "card" ? "Card" : "Cash",
    };
    mutate(payload);
  }

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
        <div className="sticky top-4 space-y-4">
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
                        onClick={() => handleIncrementQuantity(item.id)}
                        size={"icon-sm"}
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
                        <div className="w-full h-full bg-primary/20 rounded-lg flex justify-between items-center p-1">
                          <Button
                            size={"icon-sm"}
                            variant={"outline"}
                            className="size-6 rounded-full"
                            onClick={() => handleIncrementCount(item.id)}
                          >
                            <PlusIcon />
                          </Button>
                          <span className="w-full flex-1 text-center">
                            {item.count}
                          </span>
                          <Button
                            size={"icon-sm"}
                            variant={"outline"}
                            className="size-6 rounded-full"
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
              <Input
                name="name"
                placeholder="Customer Name"
                value={customer.name}
                onChange={handleChange}
              />

              <Label className="mt-2">Contact:</Label>
              <Input
                name="contact"
                placeholder="Customer Contact"
                value={customer.contact}
                onChange={handleChange}
              />

              <Label>Address:</Label>
              <Input
                name="address"
                placeholder="Customer Address"
                value={customer.address}
                onChange={handleChange}
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card
              onClick={() => setPaymentMethod("card")}
              className={cn(
                paymentMethod === "card" &&
                  "bg-primary/10 border border-primary",
              )}
            >
              <CardContent className="flex flex-col text-primary justify-center items-center gap-2">
                <CreditCardIcon className="size-8" />
                <p>Card</p>
              </CardContent>
            </Card>
            <Card
              onClick={() => setPaymentMethod("cash")}
              className={cn(
                paymentMethod === "cash" &&
                  "bg-primary/10 border border-primary",
              )}
            >
              <CardContent className="flex flex-col text-primary justify-center items-center gap-2">
                <HandCoinsIcon className="size-8" />
                <p>Hand Cash</p>
              </CardContent>
            </Card>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full"
                disabled={cart.length === 0 || !paymentMethod}
              >
                Create Invoice
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to create this invoice?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please confirm that all the details are correct before
                  proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleSubmitOrder();
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
}
