export default function EcosystemPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none select-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #84cc16 0 20px, #f97316 20px 40px, #22c55e 40px 60px)", filter: "saturate(2) hue-rotate(20deg)" }} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <a
            href="https://heaven.xyz/token/9R87b2Ur7jEmTmshXjq9CWr4j4fnf2QfhZivHbaY3Zcb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-extrabold text-2xl md:text-3xl underline decoration-wavy decoration-lime-500 bg-white/90 dark:bg-black/60 rounded-xl px-4 py-2 border-4 border-primary shadow-[0_0_30px_#84cc16]"
          >
            CA: DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777
          </a>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-4 border-primary bg-white/80 dark:bg-black/50 shadow-[0_0_30px_#84cc16]">
            <span className="text-5xl animate-bounce">🥛</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-primary">Ecosystem</h1>
            <span className="text-5xl animate-spin">🐄</span>
          </div>
          <p className="mt-4 text-lg font-semibold italic">A violently silly pasture of links.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <a href="https://v0-cow-game-development.vercel.app" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border-4 border-primary bg-white/90 dark:bg-black/60 hover:rotate-2 hover:scale-[1.02] transition shadow-2xl">
            <div className="text-2xl font-extrabold flex items-center gap-2"><span>🐮</span> 3D Cow Game</div>
            <div className="mt-2 text-sm opacity-80">Move the cow. Be the cow. Hear the cow.</div>
          </a>
          <a href="https://v0-cow-tapping-game.vercel.app" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border-4 border-orange-500 bg-white/90 dark:bg-black/60 hover:-rotate-2 hover:scale-[1.02] transition shadow-2xl">
            <div className="text-2xl font-extrabold flex items-center gap-2"><span>🥛</span> Cow Tapping Game</div>
            <div className="mt-2 text-sm opacity-80">Tap to run free. Mooo intensifies.</div>
          </a>
          <a href="https://v0-cow-game-development.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border-4 border-lime-600 bg-white/90 dark:bg-black/60 hover:rotate-1 hover:scale-[1.02] transition shadow-2xl">
            <div className="text-2xl font-extrabold flex items-center gap-2"><span>🌀</span> 3D Cow Game (alt)</div>
            <div className="mt-2 text-sm opacity-80">Same cow, different vibe. Respect the slash.</div>
          </a>
          <a href="https://v0-cow-eating-game.vercel.app" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border-4 border-fuchsia-600 bg-white/90 dark:bg-black/60 hover:-rotate-1 hover:scale-[1.02] transition shadow-2xl">
            <div className="text-2xl font-extrabold flex items-center gap-2"><span>🌿</span> Cow Eating Game</div>
            <div className="mt-2 text-sm opacity-80">Consume grass. Consume ego.</div>
          </a>
          <a href="https://gizmo.party/p/8m-jY5ovTeqj2yJ2UwHDLw?_a=Rcbqaob0TmGweGfXp3Pn5w" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border-4 border-pink-600 bg-white/90 dark:bg-black/60 hover:rotate-3 hover:scale-[1.03] transition shadow-[0_0_25px_#ec4899]">
            <div className="text-2xl font-extrabold flex items-center gap-2"><span>🎉</span> Gizmo Cow Party</div>
            <div className="mt-2 text-sm opacity-80">Join Organic Runner on Gizmo. It’s unreasonably festive.</div>
          </a>
        </div>

        <div className="mt-10 text-center text-xs opacity-70">This page failed the vibe check on purpose.</div>
      </div>
    </div>
  )
}


