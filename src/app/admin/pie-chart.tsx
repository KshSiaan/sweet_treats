"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AdminDashboardApiType } from "@/types/admin";

export const description = "A donut chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieDonut({
  data,
}: {
  data: AdminDashboardApiType["business_involved_pie"];
}) {
  const chartData = data?.map((item, index) => ({
    browser: item.name,
    visitors: item.business,
    fill:
      index === 0
        ? "var(--color-chrome)"
        : index === 1
          ? "var(--color-safari)"
          : index === 2
            ? "var(--color-firefox)"
            : index === 3
              ? "var(--color-edge)"
              : "var(--color-other)",
  }));

  // [
  //   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  //   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  //   { browser: "other", visitors: 90, fill: "var(--color-other)" },
  // ];
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
}
