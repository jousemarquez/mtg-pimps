import { cn } from "@/lib/utils";
import { PimpLevel } from "@/store/useCardStore";
import { Flame, Sparkles, ShieldCheck } from "lucide-react";

interface PimpBadgeProps {
  level: PimpLevel;
  className?: string;
}

export default function PimpBadge({ level, className }: PimpBadgeProps) {
  if (level === 'PIMP MAX') {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-4 py-1 rounded border-2 border-[#9a784d] text-[10px] font-black uppercase tracking-widest tabular-nums",
        "bg-gradient-to-br from-[#9a784d] to-[#5d4628] text-[#d9d4c7] shadow-[0_4px_10px_rgba(0,0,0,0.4)] animate-glimmer",
        className
      )}>
        <Flame className="w-3 h-3 fill-current" />
        PIMP MAX
      </div>
    );
  }

  if (level === 'PIMP') {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-4 py-1 rounded border-2 border-[#4a4a4a] text-[10px] font-black uppercase tracking-widest tabular-nums",
        "bg-gradient-to-br from-[#7d7d7d] to-[#4a4a4a] text-[#d9d4c7]",
        className
      )}>
        <Sparkles className="w-3 h-3 text-[#d9d4c7]" />
        PIMP
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-4 py-1 rounded border border-[#3d342f] text-[10px] font-black uppercase tracking-widest tabular-nums text-[#5d4628] bg-[#1a1614]",
      className
    )}>
      <ShieldCheck className="w-3 h-3" />
      COMMON
    </div>
  );
}
