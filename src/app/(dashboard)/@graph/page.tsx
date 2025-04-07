"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardBody, CardHeader } from "@heroui/react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <h3>Chart ACtive</h3>
      </CardHeader>
      <CardBody>
        <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey={"mobile"} type={"natural"} />
          </AreaChart>
        </ChartContainer>
      </CardBody>
    </Card>
  );
}
