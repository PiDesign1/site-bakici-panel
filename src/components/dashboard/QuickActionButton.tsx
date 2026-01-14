import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "secondary";
}

export function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: QuickActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant === "primary" ? "default" : "outline"}
      className={cn(
        "h-auto py-4 px-5 flex flex-col items-center gap-2 flex-1",
        variant === "primary" && "gradient-primary border-transparent"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}
