"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BarChart3, User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Recherche", href: "/search", icon: Search },
  { name: "Analytiques", href: "/analytics", icon: BarChart3 },
  { name: "Profil", href: "/profile", icon: User },
];

export default function BottomNav({ onPaletteOpen }: { onPaletteOpen?: (open: boolean) => void }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#121212]/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 md:hidden">
      <div className="flex items-center justify-around w-full">
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors relative",
                isActive ? "text-[#00FF9F]" : "text-white/50"
              )}
            >
              <item.icon size={24} />
              <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute top-0 w-1 h-1 bg-[#00FF9F] rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => onPaletteOpen?.(true)}
        className="relative flex items-center justify-center w-12 h-12 mx-2 bg-gradient-to-br from-[#00FF9F] to-[#00B37E] rounded-full shadow-lg shadow-[#00FF9F]/20 active:scale-90 transition-transform"
        aria-label="Command Palette"
      >
        <div className="absolute inset-0 rounded-full animate-pulse bg-[#00FF9F]/30 blur-sm" />
        <Zap size={24} className="text-black fill-black" />
      </button>

      <div className="flex items-center justify-around w-full">
        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors relative",
                isActive ? "text-[#00FF9F]" : "text-white/50"
              )}
            >
              <item.icon size={24} />
              <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute top-0 w-1 h-1 bg-[#00FF9F] rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
