import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertTriangleIcon,
  DollarSignIcon,
  FileBadgeIcon,
  FileTextIcon,
  FlagIcon,
  GavelIcon,
  TrophyIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { ChartPieDonut } from "./pie-chart";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBarDefault } from "./bar-chart";
import { AreaChartBlock } from "./_default/area-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { AdminDashboardApi } from "@/lib/api/admin";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await AdminDashboardApi(token);
  const dataset = [
    {
      title: "Total Users",
      amm: data?.data?.users?.total || 0,
      desc: "+12% from last month",
      icon: FileTextIcon,
    },
    {
      title: "Total Customer",
      amm: data?.data?.users?.customers || 0,
      desc: "Require attention",
      icon: AlertTriangleIcon,
    },
    {
      title: "Total Balance",
      amm: data?.data?.wallet?.total_balance || 0,
      desc: "+8 new this week",
      icon: DollarSignIcon,
    },
    {
      title: "Total Earning",
      amm: data?.data?.wallet?.total_earning || 0,
      desc: "Need moderation",
      icon: FlagIcon,
    },
    {
      title: "Active Users",
      amm: data?.data?.users?.active || 0,
      desc: "+12% from last month",
      icon: UserPlusIcon,
    },
    {
      title: "Total Businesses",
      amm: data?.data?.users?.businesses || 0,
      desc: "+15% from previous period",
      icon: FileBadgeIcon,
    },
    {
      title: "Total Withdraw",
      amm: data?.data?.wallet?.total_withdraw || 0,
      desc: "+8 new this week",
      icon: UsersIcon,
    },
    {
      title: "Customer Satisfaction",
      amm: data?.data?.customer_satisfaction?.max_rating || 0,
      desc: "+8 new this week",
      icon: GavelIcon,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h3 className="text-2xl font-semibold text-primary ">Dashboard</h3>
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
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="flex-1 rounded-xl p-6 border bg-background! h-full">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Business Categories</h3>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center items-center pt-6">
            <ChartBarDefault data={data?.data?.business_category_bar} />
          </div>
        </div>
        <div className="flex-1 rounded-xl p-6 border bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Earning Curve</h3>
            </div>
          </div>
          <div className="w-full gap-6 items-center">
            <div className="">
              <AreaChartBlock data={data?.data?.earning_curve} />
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl p-6 border bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Category Distribution</h3>
            </div>
          </div>
          <div className="w-full gap-6 items-center">
            <div className="">
              <ChartPieDonut data={data?.data?.business_involved_pie} />
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Recent Activity
        </h3>
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">Time</TableHead>
              <TableHead className="text-primary! text-center">User</TableHead>
              <TableHead className="text-primary! text-center">
                Action
              </TableHead>
              <TableHead className="text-primary! text-center">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.recent_activities?.map((activity, index) => (
              <TableRow>
                <TableCell className="text-center">
                  {new Date(activity?.date).toDateString()}
                </TableCell>
                <TableCell className="text-center">{activity?.user}</TableCell>
                <TableCell className="text-center">
                  {activity?.action}
                </TableCell>
                <TableCell className="text-center">
                  {activity?.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
