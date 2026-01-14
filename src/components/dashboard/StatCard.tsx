import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "bg-card",
  primary: "gradient-primary text-primary-foreground",
  success: "gradient-success text-success-foreground",
  warning: "gradient-warning text-warning-foreground",
  danger: "gradient-danger text-destructive-foreground",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-warning-foreground/20 text-warning-foreground",
  danger: "bg-destructive-foreground/20 text-destructive-foreground",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const isColored = variant !== "default";

  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-card border transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
        variantStyles[variant],
        isColored ? "border-transparent" : "border-border/50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p
            className={cn(
              "text-stat-label",
              isColored ? "opacity-90" : "text-muted-foreground"
            )}
          >
            {title}
          </p>
          <p className="text-stat">{value}</p>
          {subtitle && (
            <p
              className={cn(
                "text-sm",
                isColored ? "opacity-80" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "+" : "-"}{trend.value}% geçen aya göre
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
