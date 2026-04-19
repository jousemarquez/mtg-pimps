"use client";

import { useCardStore, calculateScore, getPimpLabel } from "@/store/useCardStore";
import PimpBadge from "@/components/PimpBadge";
import StatsCard from "@/components/StatsCard";
import { 
  Trash2, 
  Map,
  Sparkles,
  PenTool,
  ShieldCheck,
  Target,
  ArrowLeft,
  LayoutGrid,
  Library,
  History,
  TrendingUp,
  Flame,
  Plus,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

export default function DeckDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { decks, cards, updateCard, removeCard, getStats } = useCardStore();

  const deck = decks.find(d => d.id === id);
  const deckCards = useMemo(() => cards.filter(c => c.deckId === id), [cards, id]);
  const stats = useMemo(() => getStats(id), [getStats, id]);

  const toggleAttribute = (cardId: string, attr: string, value: boolean) => {
    updateCard(cardId, { [attr]: !value });
  };

  if (!deck) {
    return (
      <div className="p-20 text-center space-y-4">
        <LayoutGrid className="w-16 h-16 text-[#3d342f] mx-auto opacity-20" />
        <h2 className="text-[#d9d4c7] text-2xl font-black italic">Archive Lost</h2>
        <p className="text-[#9a784d] text-xs font-black uppercase tracking-widest">The requested tome could not be found in the vault.</p>
        <Link href="/decks" className="inline-block text-[#9a784d] hover:text-[#d9d4c7] font-black text-[10px] uppercase tracking-[0.3em]">Return to Archives</Link>
      </div>
    );
  }

  // Split into Main and Side
  const mainboard = deckCards.filter(c => c.position === 'MAIN').sort((a,b) => a.name.localeCompare(b.name) || a.copyNumber - b.copyNumber);
  const sideboard = deckCards.filter(c => c.position === 'SIDE').sort((a,b) => a.name.localeCompare(b.name) || a.copyNumber - b.copyNumber);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="space-y-6">
        <Link 
          href="/decks" 
          className="inline-flex items-center gap-2 text-[#5d4628] hover:text-[#9a784d] font-black text-[10px] uppercase tracking-[0.3em] transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          The Archives
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#3d342f] pb-8 relative">
           <div className="absolute -bottom-1 left-0 w-24 h-1 bg-[#9a784d]" />
           <div className="space-y-1 text-center lg:text-left">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#d9d4c7] font-sans italic">{deck.name}</h1>
             <p className="text-[#9a784d] font-black uppercase tracking-[0.3em] text-[10px]">Granular Registry & Power Assessment</p>
           </div>
           <Link 
            href="/add" 
            className="w-full lg:w-auto text-center px-8 py-4 bg-[#9a784d] text-[#1a1614] font-black text-[10px] uppercase tracking-[0.3em] rounded hover:bg-[#c4b5a2] transition-all shadow-xl flex items-center justify-center gap-2"
           >
             <Plus className="w-4 h-4" />
             Inscribe New Copy
           </Link>
        </div>
      </header>

      {/* Deck KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard 
          label="Deck Size" 
          value={stats.total} 
          icon={Library} 
        />
        <StatsCard 
          label="Possessed" 
          value={stats.owned} 
          icon={ShieldCheck} 
          iconClassName="border-mana-green/30"
        />
        <StatsCard 
          label="Archive %" 
          value={`${stats.completion}%`} 
          icon={History} 
          iconClassName="border-mana-blue/30"
        />
        <StatsCard 
          label="Pimp Essence" 
          value={`${stats.pimpRatio}%`} 
          icon={TrendingUp} 
          iconClassName="border-pimp-max-start/30"
        />
      </div>

      {/* Mainboard Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-[#d9d4c7] flex items-center gap-3 font-sans uppercase tracking-tight">
          <BookOpen className="w-6 h-6 text-[#9a784d]" />
          Mainboard Protocol
        </h2>
        <DeckTable cards={mainboard} toggleAttribute={toggleAttribute} removeCard={removeCard} />
      </section>

      {/* Sideboard Table */}
      {sideboard.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-[#d9d4c7] flex items-center gap-3 font-sans uppercase tracking-tight">
            <LayoutGrid className="w-6 h-6 text-[#5d4628]" />
            Supplemental Cache (Sideboard)
          </h2>
          <DeckTable cards={sideboard} toggleAttribute={toggleAttribute} removeCard={removeCard} />
        </section>
      )}

      {deckCards.length === 0 && (
         <div className="old-frame-panel p-24 text-center space-y-6">
            <History className="w-16 h-16 text-[#3d342f] mx-auto opacity-10" />
            <div className="space-y-2">
              <p className="text-[#d9d4c7] text-xl font-black italic">Scroll of Emptiness</p>
              <p className="text-[#9a784d] text-[10px] font-black uppercase tracking-[0.2em] max-w-sm mx-auto">No card copies have been inscribed into this deck ledger. Use 'Inscribe New Copy' to begin.</p>
            </div>
         </div>
      )}
    </div>
  );
}

function DeckTable({ cards, toggleAttribute, removeCard }: any) {
  return (
    <div className="old-frame-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#1a1614] border-b-2 border-[#3d342f]">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] w-16 text-center">Copy</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d]">Relic Identity</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-center">Manifestation</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-center">Score</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] text-right">Seal</th>
              <th className="px-8 py-5 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[#3d342f]">
            {cards.map((card: any) => (
              <tr key={card.id} className="group hover:bg-[#2b2522] transition-colors">
                <td className="px-8 py-6 text-center">
                   <div className="w-8 h-8 rounded-full border border-[#3d342f] flex items-center justify-center text-[10px] font-black text-[#5d4628] bg-[#13110f] shadow-inner tabular-nums group-hover:border-[#9a784d] group-hover:text-[#d9d4c7] transition-all">
                     #{card.copyNumber}
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-black text-[#d9d4c7] group-hover:text-[#9a784d] transition-colors font-sans uppercase tracking-tight italic">{card.name}</span>
                    <span className="text-[10px] text-[#5d4628] font-black uppercase tracking-widest leading-none">{card.set}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
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
                <td className="px-8 py-6 text-center">
                  <div className="parchment-text p-0 w-12 h-12 flex items-center justify-center border-2 border-[#3d342f] shadow-inner mx-auto">
                    <span className={cn(
                      "text-xl font-black tabular-nums transition-colors",
                      calculateScore(card) >= 5 ? "text-mana-red" : "text-[#1a1614]"
                    )}>
                      {calculateScore(card)}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <PimpBadge level={getPimpLabel(card)} />
                </td>
                <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeCard(card.id)}
                    className="p-3 rounded bg-[#1a1614] border border-[#3d342f] text-[#5d4628] hover:text-mana-red hover:border-mana-red/50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompactToggle({ icon: Icon, active, onClick, activeColor, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group/toggle flex flex-col items-center gap-2 p-3 rounded border-2 border-transparent transition-all",
        active ? cn("bg-[#1a1614] border-[#3d342f]", activeColor) : "text-[#3d342f] grayscale opacity-40 hover:opacity-100"
      )}
      title={label}
    >
      <Icon className="w-3.5 h-3.5" />
      <div className={cn(
        "w-1 h-1 rounded-sm mt-1 transition-all duration-300",
        active ? "bg-current shadow-[0_0_8px_currentColor] scale-100" : "bg-[#13110f] scale-50"
      )} />
    </button>
  );
}
