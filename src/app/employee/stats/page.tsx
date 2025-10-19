import {
  AlertTriangleIcon,
  BadgeDollarSignIcon,
  DollarSignIcon,
  FileTextIcon,
  PackageIcon,
  StarIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
// import { ChartBarDefault } from "./bar-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const dataset = [
  {
    title: "Total Sales",
    amm: "$12,458",
    desc: "All time",
    icon: BadgeDollarSignIcon,
  },
  {
    title: "Orders Handled",
    amm: 342,
    desc: "This month",
    icon: FileTextIcon,
  },
  {
    title: "Customer Rating",
    amm: "4.7/5",
    desc: "Based on 128 reviews",
    icon: StarIcon,
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="">
        <h3 className="text-2xl font-semibold text-primary ">
          Business Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {dataset.map((x) => (
          <div
            className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex justify-between items-center"
            key={x.title}
          >
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold text-muted-foreground">
                {x.title}
              </h2>
              <p className="text-xl font-semibold text-primary">{x.amm}</p>
              <p className="text-muted-foreground text-xs">{x.desc}</p>
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <div className="bg-accent p-4 rounded-lg">
                  <x.icon className="size-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Recent Activity
        </h3>
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">Date</TableHead>
              <TableHead className="text-primary! text-center">
                Activity
              </TableHead>
              <TableHead className="text-primary! text-center">
                Details
              </TableHead>
              <TableHead className="text-primary! text-center">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">Today</TableCell>
              <TableCell className="text-center">Payroll Deposit</TableCell>
              <TableCell className="text-center">
                #ORD-7841 - Michael Brown
              </TableCell>
              <TableCell className="text-center">$42.50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
