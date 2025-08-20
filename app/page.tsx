import { Card } from "@/components/ui/card"

export default function OrganicTokenLanding() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://ipfs.io/ipfs/bafkreigrtyjr5wqar3r5ffmcjogl67eagrc22dub3rsakf2z3o3lybq664')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <a
          href="https://x.com/organicrunner_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group"
        >
          <svg
            className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border-4 border-primary">
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-2 font-sans">$ORGANIC</h1>
            <p className="text-lg md:text-xl text-foreground font-medium">A free range grass fed runner</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
          <div className="p-8">
            <p className="text-lg md:text-xl leading-relaxed text-card-foreground text-center font-sans">
              Our cows aren't just cows - they're angels. Raised under heavenly blue skies, grazing on the greenest
              pastures, and frolicking like nobody's watching, each one pours their heart (and milk) into every carton.
              100% grass fed. Free range & happy. No artificial additives. Tastes like sunshine on a summer morning.
              Best served cold, best shared with friends.
            </p>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <a
            href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 border-4 border-white/50 cursor-pointer"
          >
            Join the Organic Movement
          </a>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block">
            <p className="text-white/80 font-medium text-sm tracking-wide italic">It's a free range grass fed runner</p>
          </div>
        </div>
      </div>
    </div>
  )
}
