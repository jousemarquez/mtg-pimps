"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Library, 
  Scroll, 
  PenTool, 
  Settings, 
  User, 
  BookOpen,
  CloudLightning,
  Plus,
  LayoutGrid,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCardStore } from '@/store/useCardStore';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Library },
  { name: 'The Vault', href: '/collection', icon: Scroll },
  { name: 'Decks', href: '/decks', icon: LayoutGrid },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { decks, addDeck } = useCardStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddDeck = () => {
    const name = prompt("Name your new archive (Deck):");
    if (name) addDeck(name);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#1a1614] border-b border-[#3d342f] sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-3">
          <BookOpen className="text-[#9a784d] w-5 h-5" />
          <h1 className="font-bold text-sm tracking-tight text-[#d9d4c7] font-sans">THE TOMES</h1>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-[#9a784d]"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-[#1a1614] border-r border-[#3d342f] flex flex-col h-screen transition-transform duration-300 z-50 lg:z-20 lg:sticky lg:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#9a784d] to-[#5d4628] flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-[#3d342f]">
              <BookOpen className="text-[#d9d4c7] w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-[#d9d4c7] font-sans">THE TOMES</h1>
              <p className="text-[10px] text-[#9a784d] font-black uppercase tracking-widest leading-none">Pimp Library</p>
            </div>
          </div>
          <button 
            onClick={closeMenu}
            className="lg:hidden p-2 text-[#9a784d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6 overflow-y-auto">
          <p className="px-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#5d4628] mb-4">Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded transition-all duration-300 group",
                  isActive 
                    ? "bg-[#2b2522] text-[#d9d4c7] border border-[#9a784d]/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" 
                    : "text-[#9a784d] hover:text-[#d9d4c7] hover:bg-[#2b2522]/50"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-[#d9d4c7]" : "text-[#9a784d] group-hover:text-[#d9d4c7]")} />
                <span className="text-xs font-bold tracking-wide">{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-8 pb-4 flex items-center justify-between px-5">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d4628]">Active Decks</p>
             <button 
              onClick={handleAddDeck}
              className="p-1 hover:bg-[#2b2522] rounded text-[#9a784d] hover:text-[#d9d4c7] transition-colors"
             >
               <Plus className="w-3 h-3" />
             </button>
          </div>
          
          <div className="space-y-1">
            {decks.map((deck) => {
              const isActive = pathname === `/decks/${deck.id}`;
              return (
                <Link
                  key={deck.id}
                  href={`/decks/${deck.id}`}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 rounded transition-all duration-300 group",
                    isActive 
                      ? "bg-[#2b2522] text-[#d9d4c7] border border-[#9a784d]/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" 
                      : "text-[#5d4628] hover:text-[#d9d4c7] hover:bg-[#2b2522]/20"
                  )}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-sm transition-all",
                    isActive ? "bg-[#d9d4c7] shadow-[0_0_8px_#d9d4c7]" : "bg-[#3d342f] group-hover:bg-[#9a784d]"
                  )} />
                  <span className="text-[11px] font-black uppercase tracking-widest truncate">{deck.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-5 rounded border border-[#9a784d]/20 bg-[#2b2522]/50 space-y-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#9a784d]/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 relative z-10">
              <CloudLightning className="w-4 h-4 text-[#9a784d]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#d9d4c7]">Archmage Access</span>
            </div>
            <p className="text-[10px] text-[#9a784d] leading-relaxed relative z-10 italic">
              "Knowledge is limited."
            </p>
            <button className="w-full py-2 bg-[#9a784d] text-[#1a1614] text-[10px] font-black uppercase tracking-widest rounded hover:bg-[#c4b5a2] transition-colors relative z-10">
              Ascend
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-[#3d342f] flex items-center gap-3 bg-[#13110f]">
          <div className="w-8 h-8 rounded bg-[#2b2522] flex items-center justify-center border border-[#9a784d]/20">
            <User className="w-4 h-4 text-[#9a784d]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#d9d4c7] truncate">Sage #774</p>
          </div>
          <Settings className="w-4 h-4 text-[#3d342f] hover:text-[#9a784d] cursor-pointer transition-colors" />
        </div>
      </aside>
    </>
  );
}
