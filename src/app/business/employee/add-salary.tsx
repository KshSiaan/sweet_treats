"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSalary, getEmployeesApi } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const formSchema = z.object({
  employee_id: z.string().min(1, "Select employee"),
  month: z.string().min(1, "Select month"),
  year: z.string().min(1, "Year required"),
  amount: z.string().min(1, "Amount required"),
});

export default function AddSalary() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: "",
      month: "",
      year: new Date().getFullYear().toString(),
      amount: "",
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      return getEmployeesApi(token);
    },
    placeholderData: (prev) => prev,
  });
  const { mutate } = useMutation({
    mutationKey: ["add_salary"],
    mutationFn: (body: z.infer<typeof formSchema>) => {
      return addSalary(token, body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["employee_wallets"] });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Salary Payload:", values);
    mutate(values);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Salary</Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <DialogHeader className="rounded-lg bg-primary p-6 text-background">
          <DialogTitle>Add Salary to Employee Wallet</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Employee */}
              <FormField
                control={form.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.data?.map((emp) => (
                          <SelectItem
                            key={emp.employee_id}
                            value={String(emp.employee_id)}
                          >
                            {emp.employee?.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Month */}
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount to Add</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Salary</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
