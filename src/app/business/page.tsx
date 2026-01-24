"use client";
import {
  DollarSignIcon,
  FileTextIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";
import { ChartBarDefault } from "./bar-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getBusinessDashboard } from "@/lib/api/business";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["business-dashboard"],
    queryFn: () => {
      return getBusinessDashboard(token);
    },
  });
  const dataset = [
    {
      title: "Total Sales",
      amm: `$${data?.data.total_sales?.total ?? 0}`,
      desc: data?.data.total_sales?.label ?? "N/A",
      icon: DollarSignIcon,
    },
    {
      title: "Orders",
      amm: data?.data.total_orders?.total ?? 0,
      desc: data?.data.total_orders?.label ?? "N/A",
      icon: FileTextIcon,
    },
    {
      title: "Total Orders",
      amm: data?.data.total_orders?.total ?? 0,
      desc: data?.data.total_orders?.label ?? "N/A",
      icon: PackageIcon,
    },
    {
      title: "Pending Orders",
      amm: data?.data.pending_orders?.total ?? 0,
      desc: data?.data?.pending_orders?.label ?? "N/A",
      icon: UsersIcon,
    },
    {
      title: "Completed Orders",
      amm: data?.data.completed_orders?.total ?? 0,
      desc: data?.data?.completed_orders?.label ?? "N/A",
      icon: UsersIcon,
    },
    {
      title: "Satisfaction Rate",
      amm: data?.data.satisfaction_rate?.total ?? 0,
      desc: data?.data.satisfaction_rate?.label ?? "N/A",
      icon: UsersIcon,
    },
  ];
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
      <div className="grid auto-rows-min gap-4 md:grid-cols-6">
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
          Recent Order Activity
        </h3>
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">
                Order ID
              </TableHead>
              <TableHead className="text-primary! text-center">
                Customer
              </TableHead>
              <TableHead className="text-primary! text-center">Items</TableHead>
              <TableHead className="text-primary! text-center">
                Order Date
              </TableHead>
              <TableHead className="text-primary! text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.recent_order_activity?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-center">
                  {order.order_number}
                </TableCell>
                <TableCell className="text-center">
                  {order?.shipping_info?.name}
                </TableCell>
                <TableCell className="text-center">
                  {order?.order_item?.map((x) => x.product_name).join(", ")}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(order?.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {/* ['Pending', 'Canceled', 'In Progress', 'Ready', 'On The Way', 'Delivery Accepted'] */}
                  {order?.status === "Pending" ||
                  order?.status === "In Progress" ||
                  order?.status === "On The Way" ||
                  order?.status === "Ready" ? (
                    <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                      <span
                        className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"
                        aria-hidden="true"
                      />
                      {order?.status}
                    </Badge>
                  ) : order?.status === "Delivery Accepted" ? (
                    <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      <span
                        className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                        aria-hidden="true"
                      />
                      {order?.status}
                    </Badge>
                  ) : (
                    <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                      <span
                        className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                        aria-hidden="true"
                      />
                      {order?.status}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Sales Performance
        </h3>
        {/* <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="30">This month</SelectItem>
            <SelectItem value="360">This Year</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex justify-center items-center gap-6">
        <span className="h-6 w-16 bg-primary rounded-sm"></span>
        <p>Sales ($)</p>
      </div>
      <div className="w-full grid grid-cols-1 gap-6">
        <div className="flex-1 rounded-xl p-6 border bg-background! h-full">
          <div className="flex-1 w-full flex justify-center items-center pt-6">
            <ChartBarDefault data={data?.data?.sales_performance} />
          </div>
        </div>
      </div>
    </div>
  );
}
