"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Layers, 
  PlusCircle, 
  Settings, 
  User, 
  Zap,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Collection', href: '/collection', icon: Layers },
  { name: 'Add Card', href: '/add', icon: PlusCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-dark border-r border-border-subtle flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pimp-max-start to-pimp-max-end flex items-center justify-center shadow-lg shadow-pimp-max-start/20">
          <Flame className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-white">MTG PIMP</h1>
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-pimp-max-start" : "text-zinc-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-pimp-max-start" />
            <span className="text-xs font-bold text-white">Pro Status</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Unleash the full potential of your MTG collection.
          </p>
          <button className="w-full py-2 bg-white text-black text-[11px] font-bold rounded-lg hover:bg-zinc-200 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
          <User className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">Collector #001</p>
          <p className="text-[10px] text-zinc-500 truncate">Free Plan</p>
        </div>
        <Settings className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer" />
      </div>
    </aside>
  );
}
