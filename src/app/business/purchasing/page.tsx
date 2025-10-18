import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSignIcon, FileTextIcon, PackageIcon } from "lucide-react";

export default function Page() {
  const dataset = [
    {
      title: "Today's Orders",
      amm: 142,
      desc: "↑ 12.5% from last month",
      icon: PackageIcon,
    },
    {
      title: "In-Store Purchases",
      amm: 87,
      desc: "↑ 8.2% from last month",
      icon: FileTextIcon,
    },
    {
      title: "Online Orders",
      amm: 55,
      desc: "↑ 5.7% from last month",
      icon: PackageIcon,
    },
    {
      title: "Total Sales",
      amm: "$8,742",
      desc: "↓ 2.3% from last month",
      icon: DollarSignIcon,
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Statistics Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Comprehensive analytics for your business performance.
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
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Recent Transactions
        </h2>
        <Button>View All</Button>
      </div>
      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Order ID
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Employee
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Customer
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Amount
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Type
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">#ORD-6923</TableCell>
                <TableCell className="text-center">John Smith</TableCell>
                <TableCell className="text-center">Robert Johnson</TableCell>
                <TableCell className="text-center">$142.50</TableCell>
                <TableCell className="text-center">In-Store</TableCell>
                <TableCell className="text-center">Today, 10:24 AM</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
