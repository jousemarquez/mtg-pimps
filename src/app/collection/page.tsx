"use client";

import { useState, useMemo } from "react";
import { useCardStore, calculateScore, getPimpLabel } from "@/store/useCardStore";
import PimpBadge from "@/components/PimpBadge";
import { 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink,
  ChevronDown,
  Globe2,
  Sparkles,
  PenTool,
  Cpu,
  CheckCircle2,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Collection() {
  const { cards, updateCard, removeCard } = useCardStore();
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<'ALL' | 'PIMP' | 'FOIL' | 'JP' | 'MAX'>('ALL');

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) || 
                            card.set.toLowerCase().includes(search.toLowerCase());
      
      const pimpLabel = getPimpLabel(card);
      let matchesFilter = true;
      if (filterMode === 'PIMP') matchesFilter = pimpLabel !== 'NORMAL';
      if (filterMode === 'FOIL') matchesFilter = card.foil;
      if (filterMode === 'JP') matchesFilter = card.jp;
      if (filterMode === 'MAX') matchesFilter = pimpLabel === 'PIMP MAX';

      return matchesSearch && matchesFilter;
    });
  }, [cards, search, filterMode]);

  const toggleAttribute = (id: string, attr: string, value: boolean) => {
    updateCard(id, { [attr]: !value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 text-balance">The Vault</h1>
          <p className="text-zinc-500 font-medium">Your personal treasury of high-end Magic assets.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter collection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/5 pl-11 pr-4 py-3 rounded-2xl text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all w-64"
            />
          </div>

          <div className="flex bg-zinc-900/50 p-1 rounded-2xl border border-white/5">
            <FilterButton active={filterMode === 'ALL'} onClick={() => setFilterMode('ALL')}>All</FilterButton>
            <FilterButton active={filterMode === 'PIMP'} onClick={() => setFilterMode('PIMP')}>Pimp</FilterButton>
            <FilterButton active={filterMode === 'MAX'} onClick={() => setFilterMode('MAX')}>
              <Flame className={cn("w-3 h-3", filterMode === 'MAX' ? "text-pimp-max-start" : "text-zinc-600")} />
            </FilterButton>
          </div>
        </div>
      </header>

      {/* Main Table Container */}
      <div className="glass-dark rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Asset Detail</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-center">Attributes</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-center">Score</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Label</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCards.map((card) => (
                <tr key={card.id} className="group hover:bg-white/[0.03] transition-colors relative">
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white group-hover:text-pimp-max-start transition-colors uppercase tracking-tight">{card.name}</span>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{card.set}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-center gap-1">
                      <CompactToggle 
                        icon={CheckCircle2} 
                        active={card.have} 
                        onClick={() => toggleAttribute(card.id, 'have', card.have)}
                        activeColor="text-emerald-500"
                        label="HAVE"
                      />
                      <CompactToggle 
                        icon={Globe2} 
                        active={card.jp} 
                        onClick={() => toggleAttribute(card.id, 'jp', card.jp)}
                        activeColor="text-red-500"
                        label="JP"
                      />
                      <CompactToggle 
                        icon={Sparkles} 
                        active={card.foil} 
                        onClick={() => toggleAttribute(card.id, 'foil', card.foil)}
                        activeColor="text-purple-500"
                        label="FOIL"
                      />
                      <CompactToggle 
                        icon={PenTool} 
                        active={card.signed} 
                        onClick={() => toggleAttribute(card.id, 'signed', card.signed)}
                        activeColor="text-blue-500"
                        label="SIGNED"
                      />
                      <CompactToggle 
                        icon={Cpu} 
                        active={card.altered} 
                        onClick={() => toggleAttribute(card.id, 'altered', card.altered)}
                        activeColor="text-amber-500"
                        label="ALTER"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 shadow-inner">
                      <span className={cn(
                        "text-sm font-black tabular-nums transition-colors",
                        calculateScore(card) >= 5 ? "text-pimp-max-start" : "text-white"
                      )}>
                        {calculateScore(card)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <PimpBadge level={getPimpLabel(card)} />
                  </td>
                  <td className="px-6 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => removeCard(card.id)}
                        className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-600 hover:text-rose-500 transition-all active:scale-90"
                        title="Delete asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCards.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl glass-dark flex items-center justify-center mx-auto text-zinc-700">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white font-bold">No assets found</p>
                <p className="text-zinc-500 text-xs">Try adjusting your filters or adding a new card.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      {children}
    </button>
  );
}

function CompactToggle({ icon: Icon, active, onClick, activeColor, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group/toggle flex flex-col items-center gap-1.5 p-2 rounded-xl border border-transparent transition-all hover:bg-white/5",
        active ? cn("bg-white/[0.03] border-white/5", activeColor) : "text-zinc-700 grayscale"
      )}
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] font-black tracking-tighter hidden sm:block">{label}</span>
      <div className={cn(
        "w-1 h-1 rounded-full transition-all duration-300",
        active ? "bg-current shadow-[0_0_8px_currentColor] scale-100" : "bg-zinc-800 scale-50"
      )} />
    </button>
  );
}
