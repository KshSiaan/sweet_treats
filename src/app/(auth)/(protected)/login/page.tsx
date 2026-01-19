"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

/* ---------------- schema ---------------- */

const loginSchema = z.object({
  role: z.string(),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

/* ---------------- page ---------------- */

export default function Page() {
  const router = useRouter();
  const [{ token }, setCookie] = useCookies(["token"]);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: undefined,
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: LoginForm) => {
      return loginApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });

  function onSubmit(values: LoginForm) {
    if (values.role === "admin") {
      mutate(
        {
          ...values,
          role: "ADMIN",
        },
        {
          onSuccess: (res) => {
            setCookie("token", res.data.token);
            router.push("/admin");
          },
        },
      );
    }
    if (values.role === "owner") {
      mutate(
        {
          ...values,
          role: "BUSINESS",
        },
        {
          onSuccess: (res) => {
            setCookie("token", res.data.token);
            router.push("/business");
          },
        },
      );
    }
    if (values.role === "employee") {
      mutate(
        {
          ...values,
          role: "EMPLOYEE",
        },
        {
          onSuccess: (res) => {
            setCookie("token", res.data.token);
            router.push("/employee");
          },
        },
      );
    }
  }

  return (
    <main className="bg-primary h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 bg-background/40 border-background/40 shadow-white! aspect-square flex flex-col justify-center gap-12">
        <CardHeader>
          <CardTitle className="text-5xl font-bold flex justify-center gap-3">
            <span className="text-background">Admin</span>
            <span className="relative">
              Portal
              <div className="absolute -bottom-2 left-0 h-2 w-full bg-gradient-to-r from-primary to-white" />
            </span>
          </CardTitle>
          <CardDescription className="text-center text-xl text-background">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 px-12">
              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Label>Role</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="owner">Business Owner</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>E-mail</Label>
                    <FormControl>
                      <Input {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-2/3 mx-auto mt-6"
                type="submit"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <Button
                className="w-2/3 mx-auto"
                variant="ghost"
                type="button"
                onClick={() => router.push("/forgot")}
              >
                Forgot Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
