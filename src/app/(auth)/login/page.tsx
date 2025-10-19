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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [role, setRole] = useState<String>("");
  return (
    <main className="bg-primary h-dvh w-dvw flex justify-center items-center">
      <Card className="min-w-1/3 text-background bg-background/40 border-background/40 shadow-white! aspect-square flex flex-col justify-center items-center gap-12">
        <CardHeader className="w-full">
          <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
            <span className="text-background">Admin</span>{" "}
            <span className="relative">
              Portal
              <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
            </span>
          </CardTitle>
          <CardDescription className="text-center text-xl w-full text-background">
            Secure access to your administration dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-12 w-full">
          <Label>Role</Label>
          <Select
            onValueChange={(e) => {
              setRole(e);
            }}
          >
            <SelectTrigger className="w-full bg-background text-foreground">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="owner">Business Owner</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          <Label>E-mail</Label>
          <Input className="bg-background text-foreground" />
          <Label>Password</Label>
          <Input className="bg-background text-foreground" type="password" />
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-6">
          {role === "admin" ? (
            <Button className="w-2/3 mx-auto" asChild>
              <Link href={"/admin"}>Log in</Link>
            </Button>
          ) : role === "owner" ? (
            <Button className="w-2/3 mx-auto" asChild>
              <Link href={"/business"}>Log in</Link>
            </Button>
          ) : role === "employee" ? (
            <Button className="w-2/3 mx-auto" asChild>
              <Link href={"/employee"}>Log in</Link>
            </Button>
          ) : (
            <Button className="w-2/3 mx-auto" disabled>
              Select a role first
            </Button>
          )}
          <Button className="w-2/3 mx-auto" variant={"ghost"} asChild>
            <Link href={"/forgot"}>Forgot Password</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
