"use client";

import { useState } from "react";
import { useCardStore } from "@/store/useCardStore";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Search, 
  Flame, 
  Sparkles, 
  PenTool, 
  Cpu, 
  Globe2,
  CheckCircle2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScryfallResult {
  name: string;
  set: string;
}

export default function AddCard() {
  const router = useRouter();
  const { addCard } = useCardStore();
  
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [have, setHave] = useState(true);
  const [jp, setJp] = useState(false);
  const [foil, setFoil] = useState(false);
  const [signed, setSigned] = useState(false);
  const [altered, setAltered] = useState(false);

  const [searchResults, setSearchResults] = useState<ScryfallResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setName(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const resp = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(query)}`);
      const data = await resp.json();
      if (data.data) {
        setSearchResults(data.data.map((n: string) => ({ name: n, set: "" })));
      }
    } catch (err) {
      console.error("Scryfall search error", err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectCard = (cardName: string) => {
    setName(cardName);
    setSearchResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCard({
      name,
      set: set || "Default Set",
      have,
      jp,
      foil,
      signed,
      altered,
    });

    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-white mb-2">Add New Card</h1>
        <p className="text-zinc-500 font-medium">Expand your collection with a new premium asset.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Set */}
        <div className="glass-dark p-8 rounded-3xl space-y-6 border border-white/5">
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 px-1">Card Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Black Lotus..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-pimp-max-start/50 transition-all"
                required
              />
              <Search className={cn("absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600", isSearching && "animate-pulse")} />
            </div>

            {/* Scryfall Auto-complete */}
            {searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.name}
                    type="button"
                    onClick={() => selectCard(result.name)}
                    className="w-full text-left px-5 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-0"
                  >
                    {result.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 px-1">Set Name</label>
            <input
              type="text"
              value={set}
              onChange={(e) => setSet(e.target.value)}
              placeholder="Alpha, Modern Horizons 3..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
            />
          </div>
        </div>

        {/* Pimp Attributes */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Pimp Attributes</label>
          <div className="grid grid-cols-2 gap-4">
            <Toggle 
              label="Owned" 
              icon={CheckCircle2} 
              active={have} 
              onClick={() => setHave(!have)} 
              activeClass="border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
            />
            <Toggle 
              label="Japanese" 
              icon={Globe2} 
              active={jp} 
              onClick={() => setJp(!jp)} 
              activeClass="border-red-500/50 bg-red-500/10 text-red-500"
            />
            <Toggle 
              label="Foil" 
              icon={Sparkles} 
              active={foil} 
              onClick={() => setFoil(!foil)} 
              activeClass="border-purple-500/50 bg-purple-500/10 text-purple-500"
            />
            <Toggle 
              label="Signed" 
              icon={PenTool} 
              active={signed} 
              onClick={() => setSigned(!signed)} 
              activeClass="border-blue-500/50 bg-blue-500/10 text-blue-500"
            />
            <Toggle 
              label="Altered" 
              icon={Cpu} 
              active={altered} 
              onClick={() => setAltered(!altered)} 
              activeClass="border-pimp-max-start/50 bg-pimp-max-start/10 text-pimp-max-start"
            />
          </div>
        </div>

        {/* Pimp Status Preview */}
        {have && jp && signed && (
          <div className="glass p-6 rounded-3xl bg-gradient-to-r from-pimp-max-start/20 to-pimp-max-end/20 border-pimp-max-start/30 flex items-center justify-between border-2 border-dashed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pimp-max-start flex items-center justify-center">
                <Flame className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-pimp-max-start tracking-tighter">Status Predicted</p>
                <p className="text-lg font-black text-white italic">PIMP MAX DETECTED 🔥</p>
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-pimp-max-start animate-pulse" />
          </div>
        )}

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-white text-black py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
          >
            Add To Collection
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="p-5 rounded-3xl glass-dark hover:bg-white/5 transition-all"
          >
            <X className="w-6 h-6 text-zinc-500" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Toggle({ label, icon: Icon, active, onClick, activeClass }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-5 py-4 rounded-2xl border border-white/5 glass-dark transition-all duration-300",
        active ? activeClass : "text-zinc-500 grayscale opacity-60"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-xs font-bold">{label}</span>
      </div>
      <div className={cn(
        "w-2 h-2 rounded-full",
        active ? "bg-current shadow-[0_0_8px_currentColor]" : "bg-zinc-800"
      )} />
    </button>
  );
}
