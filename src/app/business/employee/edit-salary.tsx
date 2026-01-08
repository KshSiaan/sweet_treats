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
import { addSalary, getEmployeesApi, updateSalary } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { salaryType } from "@/types/dbs/business";

const formSchema = z.object({
  employee_id: z.string().min(1, "Select employee"),
  month: z.string().min(1, "Select month"),
  year: z.string().min(1, "Year required"),
  amount: z.string().min(1, "Amount required"),
});

export default function EditSalary({ data: current }: { data: salaryType }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: current.employee_id.toString() ?? "",
      month: current.month ?? "January",
      year: current.year.toString() ?? new Date().getFullYear().toString(),
      amount: current.amount.toString() ?? "",
    },
  });
  const { data } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      return getEmployeesApi(token);
    },
    placeholderData: (prev) => prev,
  });
  const { mutate } = useMutation({
    mutationKey: ["update-salary"],
    mutationFn: (body: z.infer<typeof formSchema>) => {
      return updateSalary(token, String(current.id), body);
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
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <DialogHeader className="rounded-lg bg-primary p-6 text-background">
          <DialogTitle>Edit Salary in Employee Wallet</DialogTitle>
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
                <Button type="submit">Edit Salary</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
