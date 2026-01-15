"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BusinessDashboardType } from "@/types/dbs/business";

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
  data?: BusinessDashboardType["sales_performance"];
}) {
  const chartData = [
    { month: "E-Commerce", desktop: data?.ecommerce_total_sales },
    { month: "Rental", desktop: data?.rental_total_sales },
    { month: "Retail", desktop: data?.retail_total_sales },
    { month: "Labour", desktop: data?.labor_Service_total_sales },
    { month: "Food", desktop: data?.food_Service_total_sales },
    // { month: "June", desktop:  },
  ];
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
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
