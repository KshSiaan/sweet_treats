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
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault({
  data,
}: {
  data: AdminDashboardApiType["business_category_bar"];
}) {
  const chartData = [
    { month: "Rental", desktop: data?.rental ?? 0 },
    { month: "Retail", desktop: data?.retail ?? 0 },
    { month: "Labour Services", desktop: data?.labor_service ?? 0 },
    { month: "Food Service", desktop: data?.food_service ?? 0 },
    { month: "E-Commerce", desktop: data?.ecommerce ?? 0 },
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
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
