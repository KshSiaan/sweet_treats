"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const days = [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
] as const;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useMutation } from "@tanstack/react-query";
import { updateRules } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// Zod validation schema
const updateRuleSchema = z.object({
  activity_name: z.string().min(1, "Activity name is required"),
  points_per_dollar: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) >= 0, "Must be a positive number")
    .transform((val) => String(Number(val))),
  days: z.array(z.string()).min(1, "Select at least one day"),
  status: z.enum(["Active", "Inactive"]),
});

type UpdateRuleFormValues = z.infer<typeof updateRuleSchema>;
export default function UpdateRule({
  rule,
}: {
  rule?: {
    id: number;
    activity_name: string;
    days: string[];
    points_per_dollar: number;
    status: string;
    created_at: string;
    updated_at: string;
  };
}) {
  const navig = useRouter();
  const anchor = useComboboxAnchor();
  const [{ token }] = useCookies(["token"]);
  const [open, setOpen] = React.useState(false);

  const form = useForm<UpdateRuleFormValues>({
    resolver: zodResolver(updateRuleSchema),
    defaultValues: {
      activity_name: rule?.activity_name || "",
      points_per_dollar: String(rule?.points_per_dollar || 0),
      days: rule?.days || [],
      status: (rule?.status as "Active" | "Inactive") || "Active",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_rule"],
    mutationFn: (body: any) => {
      return updateRules(token, rule?.id ?? "", body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Success!");
      setOpen(false);
      navig.refresh();
      form.reset();
    },
  });

  function onSubmit(values: UpdateRuleFormValues) {
    mutate({
      activity_name: values.activity_name,
      points_per_dollar: values.points_per_dollar,
      days: values.days,
      status: values.status,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent className="p-0!">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Update Rule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4!"
          >
            <FormField
              control={form.control}
              name="activity_name"
              render={({ field }) => (
                <FormItem>
                  <Label>Activity</Label>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="points_per_dollar"
              render={({ field }) => (
                <FormItem>
                  <Label>Point per $1</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      onChange={(e) => field.onChange(String(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <Label>Days</Label>
                  <FormControl>
                    <Combobox
                      multiple
                      autoHighlight
                      items={days}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <ComboboxChips ref={anchor} className="w-full">
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Label>Status</Label>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="p-4! -mx-4 -mb-4 flex justify-end gap-2 border-t pt-4">
              <DialogClose asChild>
                <Button className="px-12" variant={"outline"} size={"lg"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="px-12"
                size={"lg"}
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
