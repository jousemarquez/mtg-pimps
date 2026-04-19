"use client";

import { useCardStore, calculateScore, getPimpLabel } from "@/store/useCardStore";
import StatsCard from "@/components/StatsCard";
import PimpBadge from "@/components/PimpBadge";
import { 
  Layers, 
  CheckCircle2, 
  Percent, 
  Globe2, 
  Sparkles, 
  PenTool, 
  Flame,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { getStats } = useCardStore();
  const [stats, setStats] = useState(getStats());

  // Update stats on mount to avoid hydration mismatch if localstorage has data
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Dashboard</h1>
          <p className="text-zinc-500 font-medium">Welcome back, Collector. Your pimp status is looking strong.</p>
        </div>
        <Link 
          href="/collection" 
          className="flex items-center gap-2 text-pimp-max-start font-bold text-sm hover:gap-3 transition-all"
        >
          View Full Collection <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Cards" 
          value={total} 
          icon={Layers} 
          iconClassName="text-cyan-500"
        />
        <StatsCard 
          label="Owned Cards" 
          value={owned} 
          icon={CheckCircle2} 
          iconClassName="text-emerald-500"
        />
        <StatsCard 
          label="Completion" 
          value={`${completion}%`} 
          icon={Percent} 
          iconClassName="text-indigo-500"
        />
        <StatsCard 
          label="Pimp Ratio" 
          value={`${pimpRatio}%`} 
          icon={TrendingUp} 
          iconClassName="text-pimp-max-start"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Japanese" 
          value={jpCount} 
          icon={Globe2} 
          iconClassName="text-red-400"
          className="bg-red-500/5"
        />
        <StatsCard 
          label="Foil / Holo" 
          value={foilCount} 
          icon={Sparkles} 
          iconClassName="text-purple-400"
          className="bg-purple-500/5"
        />
        <StatsCard 
          label="Signed By Artist" 
          value={signedCount} 
          icon={PenTool} 
          iconClassName="text-blue-400"
          className="bg-blue-500/5"
        />
      </div>

      {/* Bottom Layout: Top Cards & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Cards List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-pimp-max-start" />
              Highest Score Cards
            </h2>
          </div>
          
          <div className="glass-dark rounded-3xl overflow-hidden">
            {topCards.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Card Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">Score</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {topCards.map((card) => (
                    <tr key={card.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{card.name}</span>
                          <span className="text-[10px] text-zinc-500 font-medium">{card.set}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-black text-pimp-max-start tabular-nums">
                          {calculateScore(card)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right transition-transform group-hover:scale-105">
                        <PimpBadge level={getPimpLabel(card)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center space-y-4">
                <Layers className="w-12 h-12 text-zinc-800 mx-auto" />
                <p className="text-zinc-500 text-sm font-medium">No cards in collection yet.</p>
                <Link href="/add" className="inline-block px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-colors">
                  Add Your First Card
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Insights/Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Link href="/add" className="block glass-dark p-6 rounded-3xl group hover:border-pimp-max-start/30 transition-all border border-transparent">
              <PlusCircleIcon className="w-8 h-8 text-pimp-max-start mb-3" />
              <h3 className="font-bold text-white mb-1">New Entry</h3>
              <p className="text-xs text-zinc-500">Register a new card to your pimp collection.</p>
            </Link>
            
            <div className="glass-dark p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">System Tip</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Remember: <span className="text-pimp-max-start font-bold">PIMP MAX 🔥</span> requires Have + JP + Signed. Foil and Altered are bonus points!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
