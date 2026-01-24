"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { updatePass } from "@/lib/api/auth";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const passSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your new password"),
  })
  .refine((vals) => vals.newPassword === vals.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type PassFormValues = z.infer<typeof passSchema>;

export default function PassUpdater() {
  const [{ token }] = useCookies(["token"]);
  const form = useForm<PassFormValues>({
    resolver: zodResolver(passSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update_pass"],
    mutationFn: (body: {
      current_password: string;
      password: string;
      password_confirmation: string;
    }) => {
      return updatePass(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      form.reset();
    },
  });

  const onSubmit = async (values: PassFormValues) => {
    mutate({
      current_password: values.currentPassword,
      password: values.newPassword,
      password_confirmation: values.confirmPassword,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Update password from here
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4 border-b">
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
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
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Updating..."
                  : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
