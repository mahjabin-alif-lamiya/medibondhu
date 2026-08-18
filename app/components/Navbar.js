"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "AI Chat" },
  { href: "/doctors", label: "Find Doctor" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-md text-white shrink-0">
            <Stethoscope size={18} className="sm:hidden" />
            <Stethoscope size={20} className="hidden sm:block" />
          </div>
          <div>
            <p className="font-extrabold text-gray-900 dark:text-white leading-tight text-base sm:text-lg">
              MediBondhu
            </p>
            <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-tight hidden sm:block">
              Healthcare For Everyone
            </p>
          </div>
        </Link>

        {/* Desktop/tablet: segmented pill nav — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-full p-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                pathname === item.href
                  ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          {/* Mobile: hamburger toggle — hidden on sm+ */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 pb-3 pt-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === item.href
                  ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white"
                  : "text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}