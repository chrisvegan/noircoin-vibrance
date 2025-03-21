
import React from "react";
import {
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data - in a real app, this would come from an API
const data = [
  { date: "Apr 01", price: 0.000001 },
  { date: "Apr 02", price: 0.0000012 },
  { date: "Apr 03", price: 0.0000018 },
  { date: "Apr 04", price: 0.0000015 },
  { date: "Apr 05", price: 0.0000025 },
  { date: "Apr 06", price: 0.0000021 },
  { date: "Apr 07", price: 0.0000028 },
  { date: "Apr 08", price: 0.0000038 },
  { date: "Apr 09", price: 0.0000042 },
  { date: "Apr 10", price: 0.0000039 },
  { date: "Apr 11", price: 0.0000045 },
  { date: "Apr 12", price: 0.0000052 },
  { date: "Apr 13", price: 0.0000048 },
  { date: "Apr 14", price: 0.0000055 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "#ffffff",
  },
};

const PriceChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full h-[400px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9ca3af' }}
            tickMargin={10}
            tickCount={isMobile ? 5 : 10}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            domain={['dataMin', 'dataMax']}
            tickMargin={10}
            width={70}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => [`$${value}`, "Price"]} 
              />
            }
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#FFFFFF" 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default PriceChart;
