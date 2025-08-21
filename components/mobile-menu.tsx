"use client"

import { useEffect, useState } from "react"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onEsc)
    return () => document.removeEventListener("keydown", onEsc)
  }, [])

  return (
    <div className="sm:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white shadow-md active:scale-95"
      >
        <span className="sr-only">Menu</span>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute right-3 top-16 w-[88vw] max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 grid grid-cols-1 gap-2">
              <a href="/ecosystem" className="px-4 py-3 rounded-xl bg-gradient-to-r from-lime-100 to-green-100 font-semibold text-green-700 text-sm">🎮 Ecosystem</a>
              <a href="https://organicrunner-shop.fourthwall.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-100 to-lime-100 font-semibold text-emerald-700 text-sm">🛍️ Merch Store</a>
              <a href="https://dexscreener.com/solana/9r87b2ur7jemtmshxjq9cwr4j4fnf2qfhzivhbay3zcb" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-gradient-to-r from-sky-100 to-cyan-100 font-semibold text-cyan-700 text-sm">📈 DexScreener</a>
              <a href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold text-sm">💰 Buy ORGANIC</a>
              <a href="https://x.com/organicrunner_" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-black text-white font-semibold text-sm">𝕏 Follow</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


