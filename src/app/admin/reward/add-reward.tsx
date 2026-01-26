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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { addRewards } from "@/lib/api/admin";
import { useRouter } from "next/navigation";

// Zod validation schema
const addRewardSchema = z.object({
  points: z
    .string()
    .min(1, "Points is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0")
    .transform((val) => String(Number(val))),
  amount_usd: z
    .string()
    .min(1, "Dollar amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0")
    .transform((val) => String(Number(val))),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["Active", "Inactive"]),
});

type AddRewardFormValues = z.infer<typeof addRewardSchema>;

export default function AddReward() {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const [open, setOpen] = React.useState(false);

  const form = useForm<AddRewardFormValues>({
    resolver: zodResolver(addRewardSchema),
    defaultValues: {
      points: "",
      amount_usd: "",
      description: "",
      status: "Active",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_reward"],
    mutationFn: async (body: any) => {
      return addRewards(token, body);
    },
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to add reward");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Reward added successfully!");
      setOpen(false);
      navig.refresh();
      form.reset();
    },
  });

  function onSubmit(values: AddRewardFormValues) {
    mutate({
      points: Number(values.points),
      amount_usd: Number(values.amount_usd),
      description: values.description,
      status: values.status,
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Reward</Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-lg overflow-hidden!">
        <DialogHeader className="bg-primary p-4 text-background">
          <DialogTitle>Add New Reward</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-4 pt-4!"
          >
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <Label>Points</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter points"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount_usd"
              render={({ field }) => (
                <FormItem>
                  <Label>Dollar ($)</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="Enter dollar amount"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter description" />
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

            <DialogFooter className="pt-4 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Reward"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
