"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "@/lib/api/auth";
import { toast } from "sonner";

/* ---------------- schema ---------------- */

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

/* ---------------- page ---------------- */

export default function Page() {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["reset"],
    mutationFn: (val: ResetPasswordForm) => {
      return changePasswordApi({
        password: val.password,
        password_confirmation: val.confirmPassword,
        token: token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      removeCookie("token");
      router.push("/login");
    },
  });

  function onSubmit(values: ResetPasswordForm) {
    console.log(values);
    router.push("/login");
  }

  return (
    <main className="bg-primary h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 bg-background/40 border-background/40 aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="px-12 w-full">
          <CardTitle className="text-5xl font-bold flex items-center gap-3 justify-center">
            <span className="text-background">New</span>
            <span className="relative">
              Password
              <div className="absolute -bottom-2 left-0 h-2 w-full bg-gradient-to-r from-primary to-white" />
            </span>
          </CardTitle>

          <CardDescription className="text-center mt-2 text-background">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardContent className="space-y-4 px-12 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-background text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-background text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="w-full flex flex-col gap-6">
              <Button
                type="submit"
                className="w-2/3 mx-auto"
                disabled={isPending}
              >
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
