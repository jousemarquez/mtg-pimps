import { cn } from "@/lib/utils";
import { PimpLevel } from "@/store/useCardStore";
import { Flame, Sparkles, CheckCircle2 } from "lucide-react";

interface PimpBadgeProps {
  level: PimpLevel;
  className?: string;
}

export default function PimpBadge({ level, className }: PimpBadgeProps) {
  if (level === 'PIMP MAX') {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase tabular-nums glass border-pimp-max-start/30",
        "bg-gradient-to-r from-pimp-max-start to-pimp-max-end text-white shadow-lg shadow-pimp-max-start/20 animate-pulse",
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
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase tabular-nums glass border-pimp-start/30",
        "bg-gradient-to-r from-pimp-start to-pimp-end text-zinc-100",
        className
      )}>
        <Sparkles className="w-3 h-3 text-cyan-400 group-hover:animate-spin" />
        PIMP
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase tabular-nums glass text-zinc-500 border-white/5",
      className
    )}>
      <CheckCircle2 className="w-3 h-3" />
      NORMAL
    </div>
  );
}
