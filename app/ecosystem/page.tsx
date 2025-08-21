export default function EcosystemPage() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-green-400/5 to-emerald-400/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-300/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-300/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-300/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2384cc16' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Fun Navigation */}
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
                  href="/"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 hover:from-lime-200 hover:to-green-200 rounded-full text-sm font-bold text-green-700 transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-sm hover:shadow-md"
                >
                  <span className="group-hover:animate-bounce">🏠</span>
                  <span>Home</span>
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
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-[calc(100vh-80px)] overflow-y-auto pt-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              $O
            </div>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🥛</span>
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-br from-green-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
              Ecosystem
            </h1>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '500ms' }}>🐄</span>
          </div>
          <p className="text-base text-gray-600 font-light max-w-2xl mx-auto mb-4">
            A curated collection of games and experiences in the Organic universe
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
              <span>🏠</span>
            </a>
          </div>
          
          {/* Contract Address */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 shadow-lg">
            <span className="text-xs text-gray-500 font-semibold">CA:</span>
            <code className="text-xs font-mono text-gray-700">DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777</code>
            <a
              href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <a 
            href="https://cow-snake-game-moo.surge.sh/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 backdrop-blur-xl rounded-2xl p-6 border border-yellow-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:from-yellow-200 group-hover:to-amber-200 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🐍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cow Snake Game</h3>
              <p className="text-gray-600 text-sm mb-4">Classic snake but with cow vibes. Moo your way to victory!</p>
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                <span>Play Now</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://v0-cow-game-development.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:bg-white/80 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🐮</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">3D Cow Game</h3>
              <p className="text-gray-600 text-sm mb-4">Move the cow. Be the cow. Hear the cow.</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                <span>Play Now</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://v0-cow-tapping-game.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:bg-white/80 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🥛</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cow Tapping Game</h3>
              <p className="text-gray-600 text-sm mb-4">Tap to run free. Mooo intensifies.</p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                <span>Play Now</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://v0-cow-eating-game.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:bg-white/80 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🌿</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cow Eating Game</h3>
              <p className="text-gray-600 text-sm mb-4">Consume grass. Consume ego.</p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                <span>Play Now</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://v0-cow-game-development.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:bg-white/80 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🌀</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">3D Cow Game (alt)</h3>
              <p className="text-gray-600 text-sm mb-4">Same cow, different vibe. Respect the slash.</p>
              <div className="flex items-center gap-2 text-lime-600 font-semibold text-sm">
                <span>Play Now</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://gizmo.party/p/8m-jY5ovTeqj2yJ2UwHDLw?_a=Rcbqaob0TmGweGfXp3Pn5w" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 backdrop-blur-xl rounded-2xl p-6 border border-pink-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:from-pink-200 group-hover:to-purple-200 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🎉</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Gizmo Cow Party</h3>
              <p className="text-gray-600 text-sm mb-4">Join Organic Runner on Gizmo. It's unreasonably festive.</p>
              <div className="flex items-center gap-2 text-pink-600 font-semibold text-sm">
                <span>Join Party</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://gizmo.party/p/4Dyi9OPcTHG9_5nRSNEFpg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 backdrop-blur-xl rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:from-blue-200 group-hover:to-cyan-200 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🌊</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Gizmo Wave Rider</h3>
              <p className="text-gray-600 text-sm mb-4">Surf the digital waves with organic vibes. Ride the moo!</p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span>Ride Waves</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
          
          <a 
            href="https://v0-cow-milking-game.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="bg-gradient-to-br from-indigo-100 to-violet-100 backdrop-blur-xl rounded-2xl p-6 border border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group-hover:from-indigo-200 group-hover:to-violet-200 h-full">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🥛</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cow Milking Game</h3>
              <p className="text-gray-600 text-sm mb-4">Master the art of milking! Fresh organic goodness awaits.</p>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <span>Start Milking</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>
        
        {/* Footer */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-lime-100 rounded-full border border-green-200 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-700">More games coming soon...</span>
          </div>
        </div>
      </div>
    </div>
  )
}