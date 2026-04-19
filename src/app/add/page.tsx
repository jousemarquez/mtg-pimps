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
  Target, 
  Map,
  ShieldCheck,
  X,
  History,
  BookOpen,
  LayoutGrid,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScryfallResult {
  name: string;
  set: string;
}

export default function AddCard() {
  const router = useRouter();
  const { addCard, decks } = useCardStore();
  
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [have, setHave] = useState(true);
  const [jp, setJp] = useState(false);
  const [foil, setFoil] = useState(false);
  const [signed, setSigned] = useState(false);
  const [altered, setAltered] = useState(false);
  
  // Deck specific
  const [deckId, setDeckId] = useState<string>("");
  const [position, setPosition] = useState<'MAIN' | 'SIDE'>('MAIN');
  const [count, setCount] = useState(1);

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
      set: set || "Classic Edition",
      have,
      jp,
      foil,
      signed,
      altered,
      deckId: deckId || undefined,
      position,
      copyNumber: 1, // Store will handle incrementing if count > 1
    }, count);

    router.push(deckId ? `/decks/${deckId}` : "/collection");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="border-b-2 border-[#3d342f] pb-8 relative text-center md:text-left">
         <div className="absolute -bottom-1 lg:left-0 left-1/2 -translate-x-1/2 lg:translate-x-0 w-24 h-1 bg-[#9a784d]" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#d9d4c7] font-sans italic mb-1">New Inscription</h1>
        <p className="text-[#9a784d] font-black uppercase tracking-[0.3em] text-[10px]">Adding a relic to the eternal archives</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10 pb-24">
        {/* Destination Scroll */}
        <div className="space-y-6">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] px-2 text-center md:text-left">Destination Tome</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative group">
              <LayoutGrid className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5d4628]" />
              <select 
                value={deckId}
                onChange={(e) => setDeckId(e.target.value)}
                className="w-full bg-[#1a1614] border-2 border-[#3d342f] rounded px-12 py-5 text-sm text-[#d9d4c7] focus:outline-none focus:border-[#9a784d] transition-all font-serif italic font-bold appearance-none cursor-pointer"
              >
                <option value="">General Collection (Loose)</option>
                {decks.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5d4628] pointer-events-none" />
            </div>

            <div className="flex bg-[#13110f] p-1.5 rounded border-2 border-[#3d342f]">
              <button 
                type="button"
                onClick={() => setPosition('MAIN')}
                className={cn(
                  "flex-1 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-all",
                  position === 'MAIN' ? "bg-[#9a784d] text-[#1a1614]" : "text-[#5d4628] hover:text-[#9a784d]"
                )}
              >
                Mainboard
              </button>
              <button 
                type="button"
                onClick={() => setPosition('SIDE')}
                className={cn(
                  "flex-1 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-all",
                  position === 'SIDE' ? "bg-[#9a784d] text-[#1a1614]" : "text-[#5d4628] hover:text-[#9a784d]"
                )}
              >
                Sideboard
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Information */}
        <div className="old-frame-panel p-10 space-y-8">
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] mb-3">Relic Identity (Name)</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Black Lotus..."
                className="w-full bg-[#1a1614] border-2 border-[#3d342f] rounded px-6 py-5 text-[#d9d4c7] placeholder:text-[#3d342f] focus:outline-none focus:border-[#9a784d] transition-all font-serif italic text-lg shadow-inner"
                required
              />
              <Search className={cn("absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d342f]", isSearching && "animate-pulse")} />
            </div>

            {/* Ancient Suggestions */}
            {searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-[#1a1614] rounded border-2 border-[#9a784d]/50 shadow-2xl overflow-hidden max-h-72 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.name}
                    type="button"
                    onClick={() => selectCard(result.name)}
                    className="w-full text-left px-6 py-4 text-sm text-[#9a784d] hover:bg-[#2b2522] hover:text-[#d9d4c7] transition-colors border-b border-[#3d342f] last:border-0 font-bold italic"
                  >
                    {result.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] mb-3">Era of Manifestation (Set)</label>
              <input
                type="text"
                value={set}
                onChange={(e) => setSet(e.target.value)}
                placeholder="Alpha, Antiquities, Arabian Nights..."
                className="w-full bg-[#1a1614] border-2 border-[#3d342f] rounded px-6 py-5 text-[#d9d4c7] placeholder:text-[#3d342f] focus:outline-none focus:border-[#9a784d] transition-all font-serif font-bold italic shadow-inner"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] mb-3">Multiplicity (Copies)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full bg-[#1a1614] border-2 border-[#3d342f] rounded px-6 py-5 text-[#d9d4c7] focus:outline-none focus:border-[#9a784d] transition-all font-sans font-black text-xl text-center"
              />
            </div>
          </div>
        </div>

        {/* Mystical Attributes */}
        <div className="space-y-6">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#9a784d] px-2 text-center md:text-left">Elemental Signatures</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Toggle 
              label="Possessed" 
              icon={ShieldCheck} 
              active={have} 
              onClick={() => setHave(!have)} 
              activeClass="border-mana-green text-mana-green bg-mana-green/10"
            />
            <Toggle 
              label="Eastern Origin" 
              icon={Map} 
              active={jp} 
              onClick={() => setJp(!jp)} 
              activeClass="border-mana-red text-mana-red bg-mana-red/10"
            />
            <Toggle 
              label="Prismatic" 
              icon={Sparkles} 
              active={foil} 
              onClick={() => setFoil(!foil)} 
              activeClass="border-mana-blue text-mana-blue bg-mana-blue/10"
            />
            <Toggle 
              label="Master Signed" 
              icon={PenTool} 
              active={signed} 
              onClick={() => setSigned(!signed)} 
              activeClass="border-[#9a784d] text-[#9a784d] bg-[#9a784d]/10"
            />
            <Toggle 
              label="Altered Soul" 
              icon={Target} 
              active={altered} 
              onClick={() => setAltered(!altered)} 
              activeClass="border-[#5d4628] text-[#5d4628] bg-[#5d4628]/10"
            />
          </div>
        </div>

        {/* Prediction Seal */}
        {have && jp && signed && (
          <div className="old-frame-panel p-6 sm:p-8 bg-gradient-to-r from-[#9a784d]/10 to-[#5d4628]/10 border-2 border-[#9a784d] flex flex-col sm:flex-row items-center justify-between gap-6 border-dashed animate-glimmer">
            <div className="flex items-center gap-5 text-center sm:text-left border-mana-white/10">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-[#9a784d] to-[#5d4628] flex items-center justify-center shadow-lg border border-[#3d342f] shrink-0">
                <Flame className="text-[#d9d4c7] w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#9a784d] tracking-[0.3em] mb-1">Ritual Insight</p>
                <p className="text-xl sm:text-2xl font-black text-[#d9d4c7] italic font-sans leading-none">PIMP MAX DETECTED 🔥</p>
              </div>
            </div>
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#9a784d] opacity-50" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
          <button
            type="submit"
            className="w-full sm:flex-1 bg-[#9a784d] text-[#1a1614] py-6 rounded border-2 border-[#5d4628] font-black text-xs uppercase tracking-[0.4em] hover:bg-[#c4b5a2] transition-all active:scale-95 shadow-2xl"
          >
            Inscribe into Eternal Registry
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto p-6 rounded old-frame-panel hover:bg-[#2b2522] transition-all group flex items-center justify-center"
          >
            <X className="w-6 h-6 text-[#5d4628] group-hover:text-[#9a784d]" />
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
        "flex items-center justify-between px-6 py-5 rounded border-2 border-[#3d342f] bg-[#1a1614] transition-all duration-300",
        active ? activeClass : "text-[#3d342f] grayscale opacity-40 hover:opacity-60"
      )}
    >
      <div className="flex items-center gap-4">
        <Icon className={cn("w-5 h-5", active ? "text-current" : "text-[#3d342f]")} />
        <span className="text-[10px] font-black uppercase tracking-widest leading-none">{label}</span>
      </div>
      <div className={cn(
        "w-2 h-2 rounded-sm transition-all duration-300",
        active ? "bg-current shadow-[0_0_8px_currentColor]" : "bg-[#13110f]"
      )} />
    </button>
  );
}
