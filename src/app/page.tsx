"use client";

import { useCardStore, calculateScore, getPimpLabel } from "@/store/useCardStore";
import StatsCard from "@/components/StatsCard";
import PimpBadge from "@/components/PimpBadge";
import { 
  Library, 
  ShieldCheck, 
  Zap, 
  Map, 
  Sparkles, 
  PenTool, 
  Flame,
  ChevronRight,
  TrendingUp,
  History
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { getStats } = useCardStore();
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    setStats(getStats());
  }, [getStats]);

  const {
    total,
    owned,
    completion,
    jpCount,
    foilCount,
    signedCount,
    pimpRatio,
    topCards
  } = stats;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Ancient Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#3d342f] pb-8 relative">
        <div className="absolute -bottom-1 left-0 w-24 h-1 bg-[#9a784d]" />
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#d9d4c7] font-sans italic">Grand Library</h1>
          <p className="text-[#9a784d] font-black uppercase tracking-[0.3em] text-[10px]">Restoring the archives of classic power</p>
        </div>
        <Link 
          href="/collection" 
          className="flex items-center gap-2 text-[#d9d4c7] font-black text-xs uppercase tracking-widest hover:text-[#9a784d] transition-all group"
        >
          Consult the Vault <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Primordial KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <StatsCard 
          label="Total Archives" 
          value={total} 
          icon={Library} 
          iconClassName="border-mana-white/30"
        />
        <StatsCard 
          label="Sanctified" 
          value={owned} 
          icon={ShieldCheck} 
          iconClassName="border-mana-green/30"
        />
        <StatsCard 
          label="Restoration" 
          value={`${completion}%`} 
          icon={History} 
          iconClassName="border-mana-blue/30"
        />
        <StatsCard 
          label="Pimp Essence" 
          value={`${pimpRatio}%`} 
          icon={TrendingUp} 
          iconClassName="border-pimp-max-start/30"
        />
      </div>

      {/* Elemental Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <StatsCard 
          label="Far Eastern" 
          value={jpCount} 
          icon={Map} 
          iconClassName="border-mana-red/30"
          className="border-mana-red/10"
        />
        <StatsCard 
          label="Prismatic" 
          value={foilCount} 
          icon={Sparkles} 
          iconClassName="border-mana-blue/30"
          className="border-mana-blue/10"
        />
        <StatsCard 
          label="Artist Sealed" 
          value={signedCount} 
          icon={PenTool} 
          iconClassName="border-pimp-max-end/30"
          className="border-pimp-max-end/10"
        />
      </div>

      {/* The Scriptorium: Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black text-[#d9d4c7] flex items-center gap-3 font-sans uppercase tracking-tight">
            <Flame className="w-6 h-6 text-[#9a784d]" />
            Relics of High Power
          </h2>
          
          <div className="old-frame-panel overflow-hidden">
            {topCards.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-[#3d342f] bg-[#1a1614]">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#9a784d]">Relic Identity</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#9a784d] text-center">Score</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#9a784d] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#3d342f]">
                    {topCards.map((card) => (
                      <tr key={card.id} className="group hover:bg-[#2b2522] transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-base font-black text-[#d9d4c7] font-sans group-hover:text-[#9a784d] transition-colors">{card.name}</span>
                            <span className="text-[10px] text-[#5d4628] font-black uppercase tracking-widest">{card.set}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="parchment-text py-1 px-4 inline-block border border-[#3d342f] shadow-inner">
                             <span className="text-xl font-black text-[#1a1614] tabular-nums">{calculateScore(card)}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right transition-transform group-hover:scale-105">
                          <PimpBadge level={getPimpLabel(card)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-20 text-center space-y-6">
                <Library className="w-16 h-16 text-[#3d342f] mx-auto opacity-20" />
                <p className="text-[#9a784d] text-sm font-black uppercase tracking-widest italic">The archives are empty, seeker.</p>
                <Link href="/add" className="inline-block px-10 py-3 bg-[#9a784d] text-[#1a1614] text-xs font-black uppercase tracking-widest rounded hover:bg-[#c4b5a2] transition-all">
                  Inscribe First Entry
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Scroll of Discovery */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-[#d9d4c7] font-sans uppercase tracking-tight">Tasks</h2>
          <div className="space-y-6">
            <Link href="/add" className="block old-frame-panel p-8 group hover:border-[#9a784d] transition-all">
               <div className="w-12 h-12 rounded bg-[#1a1614] border border-[#9a784d]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="w-6 h-6 text-[#9a784d]" />
              </div>
              <h3 className="text-lg font-black text-[#d9d4c7] font-sans mb-2">New Inscription</h3>
              <p className="text-xs text-[#9a784d] leading-relaxed italic">Seal a new card into the official collection triptych.</p>
            </Link>
            
            <div className="old-frame-panel p-8 space-y-4 border-dashed">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9a784d] flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Sages Wisdom
              </h3>
              <p className="text-xs text-[#9a784d] leading-relaxed italic">
                "To achieve <span className="text-[#d9d4c7] font-black">TRUE ASCENSION</span>, one must possess the card, its original Japanese ink, and the master's signature."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
