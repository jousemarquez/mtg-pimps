"use client";

import { useState, useMemo } from "react";
import { useCardStore, calculateScore, getPimpLabel } from "@/store/useCardStore";
import PimpBadge from "@/components/PimpBadge";
import { 
  Search, 
  Filter, 
  Trash2, 
  Scroll,
  ChevronDown,
  Map,
  Sparkles,
  PenTool,
  ShieldCheck,
  Flame,
  Sword,
  Target
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-[#3d342f] pb-8">
        <div className="space-y-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#d9d4c7] font-sans italic">The Vault</h1>
          <p className="text-[#9a784d] font-black uppercase tracking-[0.3em] text-[10px]">Registry of Primordial Artifacts</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5d4628] group-hover:text-[#9a784d] transition-colors" />
            <input 
              type="text" 
              placeholder="Seek in archives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1a1614] border-2 border-[#3d342f] pl-11 pr-4 py-3 rounded text-sm text-[#d9d4c7] placeholder:text-[#3d342f] focus:outline-none focus:border-[#9a784d] transition-all w-full sm:w-72 font-serif font-bold italic"
            />
          </div>

          <div className="flex bg-[#13110f] p-1.5 rounded border-2 border-[#3d342f] w-full sm:w-auto overflow-x-auto no-scrollbar">
            <FilterButton active={filterMode === 'ALL'} onClick={() => setFilterMode('ALL')}>All</FilterButton>
            <FilterButton active={filterMode === 'PIMP'} onClick={() => setFilterMode('PIMP')}>Pimp</FilterButton>
            <FilterButton active={filterMode === 'MAX'} onClick={() => setFilterMode('MAX')}>
              <Flame className={cn("w-3 h-3 transition-colors", filterMode === 'MAX' ? "text-[#d9d4c7]" : "text-[#5d4628]")} />
            </FilterButton>
          </div>
        </div>
      </header>

      {/* Ancient Ledger */}
      <div className="old-frame-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#1a1614] border-b-2 border-[#3d342f]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d]">Relic Desc.</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-center">Inscriptions</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-center">Essence</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-right">Seal</th>
                <th className="px-8 py-6 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#3d342f]">
              {filteredCards.map((card) => (
                <tr key={card.id} className="group hover:bg-[#2b2522] transition-colors relative">
                  <td className="px-8 py-8">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-black text-[#d9d4c7] group-hover:text-[#9a784d] transition-colors font-sans uppercase tracking-tight italic">{card.name}</span>
                      <span className="text-[10px] text-[#5d4628] font-black uppercase tracking-widest leading-none">{card.set}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center justify-center gap-1">
                      <CompactToggle 
                        icon={ShieldCheck} 
                        active={card.have} 
                        onClick={() => toggleAttribute(card.id, 'have', card.have)}
                        activeColor="text-mana-green"
                        label="HAVE"
                      />
                      <CompactToggle 
                        icon={Map} 
                        active={card.jp} 
                        onClick={() => toggleAttribute(card.id, 'jp', card.jp)}
                        activeColor="text-mana-red"
                        label="JP"
                      />
                      <CompactToggle 
                        icon={Sparkles} 
                        active={card.foil} 
                        onClick={() => toggleAttribute(card.id, 'foil', card.foil)}
                        activeColor="text-mana-blue"
                        label="FOIL"
                      />
                      <CompactToggle 
                        icon={PenTool} 
                        active={card.signed} 
                        onClick={() => toggleAttribute(card.id, 'signed', card.signed)}
                        activeColor="text-[#9a784d]"
                        label="SIG"
                      />
                      <CompactToggle 
                        icon={Target} 
                        active={card.altered} 
                        onClick={() => toggleAttribute(card.id, 'altered', card.altered)}
                        activeColor="text-[#5d4628]"
                        label="ALT"
                      />
                    </div>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <div className="parchment-text p-0 w-12 h-12 flex items-center justify-center border-2 border-[#3d342f] shadow-inner mx-auto">
                      <span className={cn(
                        "text-xl font-black tabular-nums transition-colors",
                        calculateScore(card) >= 5 ? "text-mana-red" : "text-[#1a1614]"
                      )}>
                        {calculateScore(card)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <PimpBadge level={getPimpLabel(card)} />
                  </td>
                  <td className="px-8 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => removeCard(card.id)}
                      className="p-3 rounded bg-[#1a1614] border border-[#3d342f] text-[#5d4628] hover:text-mana-red hover:border-mana-red/50 transition-all active:scale-90"
                      title="Exterminate entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCards.length === 0 && (
            <div className="p-32 text-center space-y-6">
              <Scroll className="w-20 h-20 text-[#3d342f] mx-auto opacity-10" />
              <div className="space-y-2">
                <p className="text-[#d9d4c7] text-xl font-black italic">Archival Vacuum</p>
                <p className="text-[#9a784d] text-[10px] font-black uppercase tracking-[0.2em] max-w-xs mx-auto">No relics match your seekers inquiry. Redefine your search or inscribe new history.</p>
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
        "px-5 py-2.5 rounded text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-[#9a784d] text-[#1a1614] shadow-lg" : "text-[#5d4628] hover:text-[#d9d4c7]"
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
        "group/toggle flex flex-col items-center gap-2 p-3 rounded border-2 border-transparent transition-all",
        active ? cn("bg-[#1a1614] border-[#3d342f]", activeColor) : "text-[#3d342f] grayscale opacity-40 hover:opacity-60"
      )}
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] font-black tracking-tighter hidden sm:block italic uppercase">{label}</span>
      <div className={cn(
        "w-1.5 h-1.5 rounded-sm transition-all duration-300",
        active ? "bg-current shadow-[0_0_8px_currentColor] scale-100" : "bg-[#13110f] scale-50"
      )} />
    </button>
  );
}
