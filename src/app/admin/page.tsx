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

const dataset = [
  {
    title: "Total Users",
    amm: 1247,
    desc: "+12% from last month",
    icon: FileTextIcon,
  },
  {
    title: "Pending Approvals",
    amm: 23,
    desc: "Require attention",
    icon: AlertTriangleIcon,
  },
  {
    title: "Active Businesses",
    amm: 342,
    desc: "+8 new this week",
    icon: DollarSignIcon,
  },
  {
    title: "Content Flags",
    amm: 17,
    desc: "Need moderation",
    icon: FlagIcon,
  },
  {
    title: "New Registrations",
    amm: 142,
    desc: "+12% from last month",
    icon: UserPlusIcon,
  },
  {
    title: "Content Published",
    amm: 2073,
    desc: "+15% from previous period",
    icon: FileBadgeIcon,
  },
  {
    title: "Active Sessions",
    amm: 342,
    desc: "+8 new this week",
    icon: UsersIcon,
  },
  {
    title: "Moderation Actions",
    amm: 324,
    desc: "+8 new this week",
    icon: GavelIcon,
  },
];

export default function Page() {
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
            <ChartBarDefault />
          </div>
        </div>
        <div className="flex-1 rounded-xl p-6 border bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Moderation Activity</h3>
            </div>
          </div>
          <div className="w-full gap-6 items-center">
            <div className="">
              <AreaChartBlock />
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl p-6 border bg-background!">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Content Distribution</h3>
            </div>
          </div>
          <div className="w-full gap-6 items-center">
            <div className="">
              <ChartPieDonut />
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
              <TableHead className="text-primary! text-center">Items</TableHead>
              <TableHead className="text-primary! text-center">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">10:24 AM</TableCell>
              <TableCell className="text-center">Sarah Johnson</TableCell>
              <TableCell className="text-center">
                Business Registration
              </TableCell>
              <TableCell className="text-center">
                "Coffee Corner" - Pending review
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
