"use client";

import { useCardStore } from "@/store/useCardStore";
import StatsCard from "@/components/StatsCard";
import { 
  Library, 
  Flame, 
  LayoutGrid, 
  Trash2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function DecksPage() {
  const { decks, removeDeck, getStats } = useCardStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#3d342f] pb-8 relative">
        <div className="absolute -bottom-1 left-0 w-24 h-1 bg-[#9a784d]" />
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter text-[#d9d4c7] font-sans italic">The Archives</h1>
          <p className="text-[#9a784d] font-black uppercase tracking-[0.3em] text-[10px]">Managed Decks & Holy Tomes</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {decks.map((deck) => {
          const stats = getStats(deck.id);
          return (
            <div key={deck.id} className="old-frame-panel group flex flex-col h-full hover:scale-[1.02] transition-all duration-300">
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#d9d4c7] font-sans italic group-hover:text-[#9a784d] transition-colors">{deck.name}</h2>
                    <p className="text-[10px] text-[#5d4628] font-black uppercase tracking-widest">Constructed Artifact</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm(`Incite a purge of "${deck.name}" and all its records?`)) removeDeck(deck.id);
                    }}
                    className="p-2 text-[#3d342f] hover:text-mana-red transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="parchment-text p-3 border border-[#3d342f] text-center">
                    <p className="text-[9px] font-black text-[#5d4628] uppercase mb-1">Status</p>
                    <p className="text-xl font-black text-[#1a1614] tabular-nums">{stats.completion}%</p>
                  </div>
                  <div className="parchment-text p-3 border border-[#3d342f] text-center">
                    <p className="text-[9px] font-black text-[#5d4628] uppercase mb-1">Essence</p>
                    <p className="text-xl font-black text-[#1a1614] tabular-nums">{stats.pimpRatio}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#9a784d]">
                      <span>Seal Status</span>
                      <span>{stats.owned} / {stats.total}</span>
                   </div>
                   <div className="h-2 bg-[#13110f] border border-[#3d342f] rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-[#9a784d] transition-all duration-1000 shadow-[0_0_10px_#9a784d]" 
                        style={{ width: `${stats.completion}%` }}
                      />
                   </div>
                </div>
              </div>

              <Link 
                href={`/decks/${deck.id}`}
                className="bg-[#1a1614] border-t border-[#3d342f] p-5 flex items-center justify-center gap-2 group-hover:bg-[#2b2522] transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d]">Consult Ledger</span>
                <ChevronRight className="w-3 h-3 text-[#9a784d]" />
              </Link>
            </div>
          );
        })}

        {/* Create Card */}
        <button 
          onClick={() => {
             const name = prompt("Name your new archive (Deck):");
             if (name) useCardStore.getState().addDeck(name);
          }}
          className="old-frame-panel border-dashed border-2 flex flex-col items-center justify-center p-12 gap-4 hover:border-[#9a784d] group transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-[#13110f] border border-[#3d342f] flex items-center justify-center group-hover:scale-110 transition-transform">
             <LayoutGrid className="w-8 h-8 text-[#5d4628] group-hover:text-[#9a784d]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5d4628] group-hover:text-[#9a784d]">Found New Library</p>
        </button>
      </div>

      {decks.length === 0 && (
         <div className="p-24 text-center space-y-6 max-w-lg mx-auto">
            <BookOpen className="w-20 h-20 text-[#3d342f] mx-auto opacity-10" />
            <div className="space-y-2">
              <h2 className="text-[#d9d4c7] text-2xl font-black italic">The Archive is Silent</h2>
              <p className="text-[#9a784d] text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed"> No constructs have been registered. Inscribe your first deck to begin the ritual tracking. </p>
            </div>
         </div>
      )}
    </div>
  );
}
