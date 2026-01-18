"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "18-24",
    color: "var(--chart-1)",
  },
  safari: {
    label: "25-34",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "35-44",
    color: "var(--chart-3)",
  },
  edge: {
    label: "45-54",
    color: "var(--chart-4)",
  },
  other: {
    label: "55+",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function PieChartBlock({
  data,
}: {
  data: {
    age_18to24: number;
    age_25to34: number;
    age_35to44: number;
    age_45to54: number;
    age_55toup: number;
  };
}) {
  const chartData = [
    {
      browser: "chrome",
      visitors: data["age_18to24"],
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: data["age_25to34"],
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: data["age_35to44"],
      fill: "var(--color-firefox)",
    },
    {
      browser: "edge",
      visitors: data["age_45to54"],
      fill: "var(--color-edge)",
    },
    {
      browser: "other",
      visitors: data["age_55toup"],
      fill: "var(--color-other)",
    },
  ];
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] w-full"
    >
      <PieChart>
        <Pie data={chartData} dataKey="visitors" />
        <ChartLegend
          content={<ChartLegendContent nameKey="browser" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
