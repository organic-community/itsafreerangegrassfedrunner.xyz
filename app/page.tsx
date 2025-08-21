import { Card } from "@/components/ui/card"

export default function OrganicTokenLanding() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-green-400/10 to-emerald-400/10 animate-pulse" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-300/20 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-300/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-300/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2384cc16' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Fun Navigation header */}
      <nav className="relative z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  🐄
                </div>
                <span className="text-lg font-black bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
                  ORGANIC
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-4">
                <a
                  href="/ecosystem"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 hover:from-lime-200 hover:to-green-200 rounded-full text-sm font-bold text-green-700 transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-sm hover:shadow-md"
                >
                  <span className="group-hover:animate-bounce">🎮</span>
                  <span>Ecosystem</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-lime-400/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
                
                <div className="w-px h-6 bg-gray-300" />
                
                <a
                  href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-xl"
                >
                  <span className="group-hover:animate-pulse">💰</span>
                  <span>Buy $ORGANIC</span>
                  <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>

                <a
                  href="https://x.com/organicrunner_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Featured Games Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">🎮</span>
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Play Now</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href="https://v0-cow-game-development.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-lime-400 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10">🐮 3D Cow</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://v0-cow-tapping-game.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10">🥛 Tap Cow</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://v0-cow-eating-game.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10">🌿 Eat Grass</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://gizmo.party/p/8m-jY5ovTeqj2yJ2UwHDLw?_a=Rcbqaob0TmGweGfXp3Pn5w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10">🎉 Gizmo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 rounded-full border border-green-300 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-700">100% Organic • Free Range • Grass Fed</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                $O
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black bg-gradient-to-br from-green-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                ORGANIC
              </h1>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light tracking-wide">
              A free range grass fed runner
            </p>
          </div>

          {/* Description Card */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <div className="p-10">
                <div className="flex justify-center mb-6">
                  <div className="flex gap-2">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>🐄</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '200ms' }}>🥛</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '400ms' }}>🌿</span>
                  </div>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center">
                  Our cows aren't just cows - they're angels. Raised under heavenly blue skies, grazing on the greenest
                  pastures, and frolicking like nobody's watching, each one pours their heart (and milk) into every carton.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">100%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Grass Fed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-lime-600">Free</div>
                    <div className="text-xs sm:text-sm text-gray-600">Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-600">Zero</div>
                    <div className="text-xs sm:text-sm text-gray-600">Additives</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-500">Pure</div>
                    <div className="text-xs sm:text-sm text-gray-600">Happiness</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center">
            <a
              href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-lime-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Join the Movement</span>
              <span className="relative z-10">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Contract Address */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500">CA:</span>
              <code className="text-xs font-mono text-gray-700">DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
