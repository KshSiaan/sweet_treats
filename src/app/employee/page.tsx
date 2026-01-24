import {
  AlertTriangleIcon,
  DollarSignIcon,
  FileTextIcon,
  HandCoinsIcon,
} from "lucide-react";

import { cookies } from "next/headers";
import { employeeDashboardStats } from "@/lib/api/employee";
import Recent from "./_home/recent";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await employeeDashboardStats(token);
  const dataset = [
    {
      title: "Total Sales",
      amm: data?.data?.total_sales || 0,
      desc: "Total sales made",
      icon: HandCoinsIcon,
    },
    {
      title: "Incoming Orders",
      amm: data?.data?.incoming_orders || 0,
      desc: "Orders received",
      icon: FileTextIcon,
    },
    {
      title: "Pending Orders",
      amm: data?.data?.pending_orders || 0,
      desc: "Orders pending",
      icon: DollarSignIcon,
    },
    {
      title: "Completed Orders",
      amm: data?.data?.conpleted_orders || 0,
      desc: "Orders completed",
      icon: AlertTriangleIcon,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h3 className="text-2xl font-semibold text-primary">Dashboard</h3>
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
          Recent Orders
        </h3>
        <Recent />
      </div>
    </div>
  );
}
