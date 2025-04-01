
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpsellResults } from "@/utils/calculatorUtils";
import { formatCurrency, formatPercentage } from "@/utils/calculatorUtils";
import { ArrowUp, ArrowDown, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface CalculatorResultsProps {
  results: UpsellResults | null;
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({ results }) => {
  if (!results) return null;

  // Prepare data for pie chart
  const pieData = [
    { name: "Baseline Revenue", value: results.baselineRevenue, color: "#245e4f" },
    { name: "Upsell Revenue", value: results.upsellRevenue, color: "#7ac9a7" }
  ];

  // Prepare data for bar chart - use only a subset of months if there are many
  const chartData = results.monthlyData
    .filter((_, index) => {
      // If more than 12 months, show every other month or every third month
      if (results.monthlyData.length > 24) return index % 3 === 0;
      if (results.monthlyData.length > 12) return index % 2 === 0;
      return true;
    })
    .map(item => ({
      month: `Month ${item.month}`,
      "Baseline Revenue": item.baselineRevenue,
      "Upsell Revenue": item.upsellRevenue
    }));

  // Helper function for custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 w-full animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Baseline Revenue</CardDescription>
            <CardTitle className="text-2xl font-bold text-charcoal">
              {formatCurrency(results.baselineRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>After {results.monthlyData.length} months</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-gradient-to-br from-primary/90 to-primary text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-white/80">Upsell Revenue</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              {formatCurrency(results.upsellRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-white/80 flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              <span>{formatPercentage(results.upsellPercentage)} of total revenue</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-bold text-charcoal">
              {formatCurrency(results.totalRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Projected final revenue</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
            <CardDescription>
              Distribution of baseline and upsell revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Revenue Projection</CardTitle>
            <CardDescription>
              Growth of revenue streams over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                      return value;
                    }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Baseline Revenue" fill="#245e4f" />
                  <Bar dataKey="Upsell Revenue" fill="#7ac9a7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorResults;
