"use client"

import { useEffect, useRef, useState } from "react"

type PlaysCounterProps = {
  min?: number
  max?: number
  intervalMs?: number
}

export function PlaysCounter({ min = 100, max = 999, intervalMs = 1500 }: PlaysCounterProps) {
  const headroom = Math.max(20, Math.floor((max - min) * 0.3))
  const initialMin = min
  const initialMax = Math.max(min, max - headroom)
  const [count, setCount] = useState(() =>
    Math.floor(Math.random() * (initialMax - initialMin + 1)) + initialMin
  )
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    function scheduleNext() {
      const jitter = Math.floor(Math.random() * 600) // 0-600ms
      const delay = intervalMs + jitter
      timerRef.current = window.setTimeout(() => {
        setCount((c) => {
          if (c >= max) return max
          const step = 1 + Math.floor(Math.random() * 3) // 1-3
          return Math.min(max, c + step)
        })
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [intervalMs, max])

  return <span>{count.toLocaleString()}</span>
}


