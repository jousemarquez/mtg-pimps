import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export default function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  className,
  iconClassName
}: StatsCardProps) {
  return (
    <div className={cn("glass-dark p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300", className)}>
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-white tabular-nums">{value}</h3>
        </div>
        <div className={cn("p-2 rounded-lg bg-zinc-800/50 border border-white/5", iconClassName)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded",
            trend.isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
          <span className="text-[10px] text-zinc-600 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
}
