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
  CloudLightning
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Library },
  { name: 'The Vault', href: '/collection', icon: Scroll },
  { name: 'Register', href: '/add', icon: PenTool },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a1614] border-r border-[#3d342f] flex flex-col h-screen sticky top-0 shadow-2xl z-20">
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-[#9a784d] to-[#5d4628] flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-[#3d342f]">
          <BookOpen className="text-[#d9d4c7] w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-[#d9d4c7] font-sans">THE TOMES</h1>
          <p className="text-[10px] text-[#9a784d] font-black uppercase tracking-widest leading-none">Pimp Library</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-3 mt-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-4 rounded transition-all duration-300 group",
                isActive 
                  ? "bg-[#2b2522] text-[#d9d4c7] border border-[#9a784d]/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" 
                  : "text-[#9a784d] hover:text-[#d9d4c7] hover:bg-[#2b2522]/50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-[#d9d4c7]" : "text-[#9a784d] group-hover:text-[#d9d4c7]")} />
              <span className="text-sm font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="p-5 rounded border border-[#9a784d]/20 bg-[#2b2522]/50 space-y-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#9a784d]/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2 relative z-10">
            <CloudLightning className="w-4 h-4 text-[#9a784d]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#d9d4c7]">Archmage Access</span>
          </div>
          <p className="text-[10px] text-[#9a784d] leading-relaxed relative z-10 italic">
            "Knowledge is limited only by the ink in one's soul."
          </p>
          <button className="w-full py-2 bg-[#9a784d] text-[#1a1614] text-[10px] font-black uppercase tracking-widest rounded hover:bg-[#c4b5a2] transition-colors relative z-10">
            Ascend
          </button>
        </div>
      </div>

      <div className="p-6 border-t border-[#3d342f] flex items-center gap-3 bg-[#13110f]">
        <div className="w-9 h-9 rounded bg-[#2b2522] flex items-center justify-center border border-[#9a784d]/20">
          <User className="w-4 h-4 text-[#9a784d]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#d9d4c7] truncate">Sage #774</p>
          <p className="text-[10px] text-[#9a784d] uppercase font-black">Elder Circle</p>
        </div>
        <Settings className="w-4 h-4 text-[#3d342f] hover:text-[#9a784d] cursor-pointer transition-colors" />
      </div>
    </aside>
  );
}
