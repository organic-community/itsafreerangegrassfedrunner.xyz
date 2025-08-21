"use client"

import { useState } from "react"
import { LINKS } from "@/config/links"

export function CopyCAButton({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(LINKS.CA)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className={
        compact
          ? "inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/70 text-xs border border-gray-200"
          : "inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 text-sm border border-gray-200 shadow-sm"
      }
      aria-label="Copy contract address"
    >
      <span>📋</span>
      <span className="font-mono">{LINKS.CA.slice(0, 6)}…{LINKS.CA.slice(-6)}</span>
      {copied && <span className="text-emerald-600 font-semibold">Copied!</span>}
    </button>
  )
}


