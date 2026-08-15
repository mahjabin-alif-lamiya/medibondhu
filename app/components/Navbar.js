"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "AI Chat" },
  { href: "/doctors", label: "Find Doctor" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-md text-white">
            <Stethoscope size={20} />
          </div>
          <div>
            <p className="font-extrabold text-gray-900 dark:text-white leading-tight text-lg">
              MediBondhu
            </p>
            <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-tight hidden sm:block">
              Health For Everyone
            </p>
          </div>
        </Link>

        {/* Segmented pill nav — mirrors the KrishiDisha nav pattern */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-full p-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-2.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                pathname === item.href
                  ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}