'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CowSnakeGame() {
  useEffect(() => {
    // Load the game script dynamically
    const script = document.createElement('script')
    script.src = '/games/cow-snake/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-800">🐄 Cow Snake Game 🐄</h1>
        <p className="text-lg text-gray-600">
          A fun cow-themed twist on the classic Snake game!
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>🎮 Game Controls</CardTitle>
          <CardDescription>
            Use arrow keys to move your cow snake around the pasture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>🌾 <strong>Hay</strong> - 10 points</p>
            <p>🌱 <strong>Grass</strong> - 15 points</p>
            <p>🥕 <strong>Carrot</strong> - 20 points</p>
            <p>🍎 <strong>Apple</strong> - 25 points</p>
          </div>
        </CardContent>
      </Card>

      {/* Game Container */}
      <div className="flex justify-center">
        <div className="game-container bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
          <div className="score-container flex justify-between mb-4">
            <div className="score bg-green-600 text-white px-4 py-2 rounded-full font-bold">
              Score: <span id="score">0</span>
            </div>
            <div className="high-score bg-green-600 text-white px-4 py-2 rounded-full font-bold">
              High Score: <span id="high-score">0</span>
            </div>
          </div>
          
          <div className="game-area relative">
            <canvas 
              id="gameCanvas" 
              width="600" 
              height="400"
              className="border-4 border-yellow-800 rounded-lg bg-green-200 mx-auto block"
            ></canvas>
            <div className="game-over hidden" id="gameOver">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-yellow-800 text-white p-6 rounded-lg text-center">
                  <h2 className="text-2xl mb-3">Game Over! 🐄💔</h2>
                  <p className="mb-4">Your cow ate <span id="finalScore">0</span> treats!</p>
                  <button 
                    id="restartBtn"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    Play Again 🐄
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="controls text-center mt-4 space-y-2">
            <p className="text-yellow-800 font-bold">🎮 Use arrow keys to move your cow!</p>
            <p className="text-yellow-800 font-bold">🌾 Eat hay and grass to grow bigger!</p>
            
            <div className="mobile-controls hidden" id="mobileControls">
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mt-4">
                <div></div>
                <button className="control-btn bg-yellow-800 text-white p-3 rounded" data-direction="up">↑</button>
                <div></div>
                <button className="control-btn bg-yellow-800 text-white p-3 rounded" data-direction="left">←</button>
                <button className="control-btn bg-yellow-800 text-white p-3 rounded" data-direction="down">↓</button>
                <button className="control-btn bg-yellow-800 text-white p-3 rounded" data-direction="right">→</button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button 
              id="startBtn" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-bold transition-colors animate-bounce"
            >
              Start Game! 🐄
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>🐄 Fun fact: Cows have best friends and get stressed when separated!</p>
      </div>
    </div>
  )
}
