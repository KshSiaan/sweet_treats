"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateMeApi } from "@/lib/api/auth";
import { UserType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  full_name: z.string(),
  // store_location: z.string(),
});
export default function ProfUpdateForm({ data }: { data: UserType }) {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: data.full_name || "",
      // store_location: data?.profile?.store_location || data?.address || "",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: (body: { full_name?: string; store_location?: string }) => {
      return updateMeApi(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });

  function submitter(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div
      className="!mt-12 w-full
     !p-6"
    >
      <Form {...form}>
        <form className="!space-y-6" onSubmit={form.handleSubmit(submitter)}>
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label>Email</Label>
            <Input readOnly value={data.email} />
          </div>
          {/* <FormField
            control={form.control}
            name="store_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button
            className="w-full !mt-6"
            type="submit"
            disabled={!form.formState.isDirty}
          >
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
