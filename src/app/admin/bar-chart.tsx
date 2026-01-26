"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AdminDashboardApiType } from "@/types/admin";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "value: ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault({
  data,
}: {
  data: AdminDashboardApiType["business_category_bar"];
}) {
  const chartData = [
    { month: "Rental", value: data?.rental ?? 0 },
    { month: "Retail", value: data?.retail ?? 0 },
    { month: "Labour Services", value: data?.labor_service ?? 0 },
    { month: "Food Service", value: data?.food_service ?? 0 },
    { month: "E-Commerce", value: data?.ecommerce ?? 0 },
  ];
  return (
    <ChartContainer config={chartConfig} className="h-[200px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          // content={<ChartTooltipContent />}
          // formatter={(value) => [
          //   value,
          //   chartData.find((d) => d.desktop === value)?.month || "Unknown",
          // ]}
        />
        <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
