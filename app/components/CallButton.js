"use client";

import { useState, useRef } from "react";
import { Phone } from "lucide-react";

// Wraps any "call" action with a brief, honest "Connecting..." transition
// before firing the real tel: link — gives a polished on-screen moment
// (nice for demos/video) without ever claiming a call connected when it
// didn't. The real dial attempt still fires after the transition (unless
// cancelled), so this stays fully functional for real users in production.
export default function CallButton({ number, label, className, children }) {
  const [connecting, setConnecting] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    setConnecting(true);
    timeoutRef.current = setTimeout(() => {
      window.location.href = "tel:" + number;
      setConnecting(false);
    }, 1800);
  };

  const handleCancel = () => {
    clearTimeout(timeoutRef.current);
    setConnecting(false);
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>

      {connecting && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-pop-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
              <Phone className="text-red-600 dark:text-red-400 animate-pulse" size={28} />
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400 mb-1">
              Connecting
            </p>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {number}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{label}</p>

            <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Connecting — please hold
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Opening your phone's dialer for {number}...
              </p>
            </div>

            <button
              onClick={handleCancel}
              className="mt-5 w-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}