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
    <div className={cn("old-frame-panel p-6 group hover:scale-[1.02] transition-all duration-300", className)}>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Icon className="w-20 h-20 text-[#d9d4c7]" />
      </div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-[#9a784d] text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
          <div className="parchment-text py-1 px-3 mt-1 inline-block border-2 border-[#3d342f] shadow-inner">
             <h3 className="text-3xl font-black text-[#1a1614] tabular-nums font-sans leading-none">{value}</h3>
          </div>
        </div>
        <div className={cn("p-2 rounded bg-[#1a1614] border border-[#9a784d]/30 shadow-lg", iconClassName)}>
          <Icon className="w-5 h-5 text-[#9a784d]" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <span className={cn(
            "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border border-current shadow-sm",
            trend.isUp ? "bg-emerald-900/20 text-emerald-600" : "bg-rose-900/20 text-rose-600"
          )}>
            {trend.isUp ? 'Superior' : 'Inferior'} {trend.value}%
          </span>
          <span className="text-[9px] text-[#5d4628] font-black uppercase tracking-widest italic">vs past cycle</span>
        </div>
      )}
    </div>
  );
}
