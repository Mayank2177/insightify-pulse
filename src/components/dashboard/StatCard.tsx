import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  sentiment?: "negative" | "positive" | "neutral";
  icon: LucideIcon;
  className?: string;
}

const StatCard = ({ title, value, trend, sentiment, icon: Icon, className }: StatCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const sentimentColors = {
    negative: "border-destructive/20 bg-destructive/5",
    positive: "border-success/20 bg-success/5",
    neutral: "border-warning/20 bg-warning/5",
  };

  const trendColors = {
    up: "text-destructive",
    down: "text-success",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "p-6 rounded-xl border-2 bg-gradient-card shadow-md hover:shadow-lg transition-all",
        sentiment && sentimentColors[sentiment],
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-background/50">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1", trendColors[trend])}>
            <TrendIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

export default StatCard;
