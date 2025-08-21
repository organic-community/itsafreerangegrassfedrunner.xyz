"use client"

import { useEffect, useMemo, useState } from "react"
import { LINKS } from "@/config/links"
import { PlaysCounter } from "@/components/plays-counter"

type BannerItem = {
  href: string
  label: string
  emoji: string
  from: string
  to: string
}

const DEFAULT_ITEMS: BannerItem[] = [
  { href: "https://v0-cow-game-development.vercel.app", label: "3D Cow", emoji: "🐮", from: "from-emerald-500", to: "to-lime-500" },
  { href: "https://v0-cow-tapping-game.vercel.app", label: "Tap Cow", emoji: "🥛", from: "from-amber-500", to: "to-orange-500" },
  { href: "https://v0-cow-eating-game.vercel.app", label: "Eat Grass", emoji: "🌿", from: "from-fuchsia-500", to: "to-purple-500" },
  { href: LINKS.MOON, label: "Cow Casino", emoji: "🎰", from: "from-amber-500", to: "to-emerald-500" },
]

export function GameBanner({ items = DEFAULT_ITEMS, rotateMs = 6000 }: { items?: BannerItem[]; rotateMs?: number }) {
  const safeItems = useMemo(() => (items.length ? items : DEFAULT_ITEMS), [items])
  const [index, setIndex] = useState(() => Math.floor(Math.random() * safeItems.length))

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length)
    }, rotateMs)
    return () => window.clearInterval(id)
  }, [rotateMs, safeItems.length])

  const current = safeItems[index]

  return (
    <div className="mx-auto max-w-6xl px-4">
      <a
        href={current.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block overflow-hidden rounded-3xl p-[2px] shadow-2xl transition-all hover:scale-[1.01] hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,.5)] bg-gradient-to-r ${current.from} ${current.to}`}
      >
        <div className="relative rounded-[22px] bg-white/80 backdrop-blur-xl">
          {/* glow blobs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-lime-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-48 w-48 rounded-full bg-emerald-400/30 blur-3xl" />

          <div className="relative z-10 p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-white/60 shadow-md text-2xl">
                {current.emoji}
              </div>
              <div className="flex-1">
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-emerald-800">Play {current.label}</div>
                <div className="mt-1 text-xs sm:text-sm text-emerald-700/80">Organic mini‑games • free‑range entertainment</div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-xs bg-white/80 border border-emerald-200 text-emerald-700 rounded-full px-3 py-1">
                  <span className="mr-1">🔥</span>
                  <PlaysCounter min={150} max={999} />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold px-4 py-2 shadow-md group-hover:translate-x-0.5 transition-transform">
                  <span>Play Now</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* mobile CTA */}
            <div className="mt-4 sm:hidden flex items-center justify-between">
              <div className="text-xs bg-white/80 border border-emerald-200 text-emerald-700 rounded-full px-3 py-1">
                <span className="mr-1">🔥</span>
                <PlaysCounter min={150} max={999} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold px-4 py-2 shadow-md">
                <span>Play Now</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}


