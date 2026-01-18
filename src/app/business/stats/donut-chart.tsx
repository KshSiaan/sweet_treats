"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Male",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Female",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DonutChart({
  data,
}: {
  data: { male: number; female: number };
}) {
  const chartData = [
    { browser: "chrome", visitors: data.male, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: data.female, fill: "var(--color-safari)" },
  ];
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] w-full"
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
          innerRadius={30}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="browser" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
