"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  BarChart3,
  User,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Recherche", href: "/search", icon: Search },
  { name: "Analytiques", href: "/analytics", icon: BarChart3 },
  { name: "Profil", href: "/profile", icon: User },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 64 }}
      className="hidden md:flex fixed left-0 top-0 h-screen z-40 bg-[#121212] border-r border-white/10 flex-col transition-colors duration-300"
    >
      <div className="p-4 flex items-center justify-between overflow-hidden">
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-white tracking-tight"
          >
            BEATRIX
          </motion.span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-2 rounded-lg transition-all group relative",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={22} className={cn("min-w-[22px]", isActive && "text-[#00FF9F]")} />
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 text-sm font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-white/10">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <p className="text-xs font-medium text-white truncate">Utilisateur</p>
              <p className="text-[10px] text-white/40 truncate">Pro Account</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
