import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { salaryType } from "@/types/dbs/business";
import React from "react";
import EditSalary from "./edit-salary";
import { useMutation } from "@tanstack/react-query";
import { confirmSalary, deleteSalary } from "@/lib/api/business";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SalaryController({ data }: { data: salaryType }) {
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_salary"],
    mutationFn: () => {
      return deleteSalary(token, String(data?.id));
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: confirm, isPending: confirming } = useMutation({
    mutationKey: ["confirm_salary"],
    mutationFn: () => {
      return confirmSalary(token, String(data?.id));
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <>
      {data?.status !== "Processing" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View</Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <DialogHeader className="bg-primary p-6 rounded-lg text-background">
              <DialogTitle>Salary Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4 p-6 pt-0">
              <div>
                <h4 className="font-semibold">Employee ID:</h4>
                <p>{data.employee_id}</p>
              </div>
              <div>
                <h4 className="font-semibold">Month:</h4>
                <p>{data.month}</p>
              </div>
              <div>
                <h4 className="font-semibold">Year:</h4>
                <p>{data.year}</p>
              </div>
              <div>
                <h4 className="font-semibold">Amount:</h4>
                <p>{data.amount}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {data?.status === "Processing" && (
        <>
          <EditSalary data={data} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} disabled={isPending}>
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this salary record?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  salary record from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate()}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Confirm"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Confirm Payment of ${data.amount}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to confirm this payment of $
                  {data.amount}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => confirm()}
                  disabled={confirming}
                >
                  {confirming ? "Processing..." : "Confirm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
