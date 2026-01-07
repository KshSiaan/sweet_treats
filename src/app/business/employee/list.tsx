import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEmployeeApi, getEmployeesApi } from "@/lib/api/business";
import { useCookies } from "react-cookie";
import AddEmployee from "./add-employee";
import UpdateEmployee from "./update-employee";
import { toast } from "sonner";

export default function List() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      return getEmployeesApi(token);
    },
    placeholderData: (prev) => prev,
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-employee"],
    mutationFn: (id: string) => {
      return deleteEmployeeApi(token, id);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-semibold text-primary">
          Employee List
        </CardTitle>
        <AddEmployee />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="divide-y">
          {data?.data?.map((item) => (
            <div
              className="w-full p-2 rounded-sm flex justify-between items-center"
              key={item.id}
            >
              <div className="flex gap-4 items-center justify-start">
                <Avatar className="size-12">
                  <AvatarImage
                    src={
                      item?.employee?.avatar_url ??
                      "https://avatar.iran.liara.run/public"
                    }
                  />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="h-full">
                  <h4 className="font-bold">{item?.employee?.full_name}</h4>
                  {item?.employee?.status === "Active" ? (
                    <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      <span
                        className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                        aria-hidden="true"
                      />
                      {item?.employee?.status}
                    </Badge>
                  ) : (
                    <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                      <span
                        className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                        aria-hidden="true"
                      />
                      {item?.employee?.status}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-x-4">
                <UpdateEmployee data={item} />
                <Button
                  variant={"destructive"}
                  disabled={isDeleting}
                  onClick={() => mutate(String(item.employee_id))}
                >
                  {isDeleting ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
