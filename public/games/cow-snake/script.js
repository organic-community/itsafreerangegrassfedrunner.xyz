class CowSnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.gameOverDiv = document.getElementById('gameOver');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.finalScoreElement = document.getElementById('finalScore');
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = {
            x: this.canvas.width / this.gridSize,
            y: this.canvas.height / this.gridSize
        };
        
        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.food = { x: 15, y: 15, type: 'hay' };
        this.score = 0;
        this.highScore = localStorage.getItem('cowSnakeHighScore') || 0;
        this.gameRunning = false;
        this.gameLoop = null;
        
        // Food types with different values
        this.foodTypes = [
            { name: 'hay', emoji: '🌾', color: '#DAA520', points: 10 },
            { name: 'grass', emoji: '🌱', color: '#32CD32', points: 15 },
            { name: 'carrot', emoji: '🥕', color: '#FF8C00', points: 20 },
            { name: 'apple', emoji: '🍎', color: '#FF0000', points: 25 }
        ];
        
        this.highScoreElement.textContent = this.highScore;
        this.setupEventListeners();
        this.setupMobileControls();
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.code) {
                case 'ArrowUp':
                    if (this.direction.y !== 1) {
                        this.direction = { x: 0, y: -1 };
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction.y !== -1) {
                        this.direction = { x: 0, y: 1 };
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction.x !== 1) {
                        this.direction = { x: -1, y: 0 };
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction.x !== -1) {
                        this.direction = { x: 1, y: 0 };
                    }
                    break;
            }
        });
    }
    
    setupMobileControls() {
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.gameRunning) return;
                
                const direction = btn.dataset.direction;
                switch(direction) {
                    case 'up':
                        if (this.direction.y !== 1) {
                            this.direction = { x: 0, y: -1 };
                        }
                        break;
                    case 'down':
                        if (this.direction.y !== -1) {
                            this.direction = { x: 0, y: 1 };
                        }
                        break;
                    case 'left':
                        if (this.direction.x !== 1) {
                            this.direction = { x: -1, y: 0 };
                        }
                        break;
                    case 'right':
                        if (this.direction.x !== -1) {
                            this.direction = { x: 1, y: 0 };
                        }
                        break;
                }
            });
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.startBtn.style.display = 'none';
        this.gameOverDiv.style.display = 'none';
        this.direction = { x: 1, y: 0 }; // Start moving right
        this.generateFood();
        this.gameLoop = setInterval(() => this.update(), 150);
    }
    
    restartGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.scoreElement.textContent = this.score;
        this.gameOverDiv.style.display = 'none';
        this.startGame();
    }
    
    update() {
        this.moveSnake();
        if (this.checkCollision()) {
            this.gameOver();
            return;
        }
        this.checkFoodCollision();
        this.draw();
    }
    
    moveSnake() {
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        this.snake.unshift(head);
    }
    
    checkCollision() {
        const head = this.snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount.x || 
            head.y < 0 || head.y >= this.tileCount.y) {
            return true;
        }
        
        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    checkFoodCollision() {
        const head = this.snake[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            const foodType = this.foodTypes.find(f => f.name === this.food.type);
            this.score += foodType.points;
            this.scoreElement.textContent = this.score;
            this.generateFood();
            
            // Play eating sound effect
            this.playEatSound();
        } else {
            this.snake.pop(); // Remove tail if no food eaten
        }
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount.x),
                y: Math.floor(Math.random() * this.tileCount.y),
                type: this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)].name
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#90EE90';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grass pattern
        this.drawGrassPattern();
        
        // Draw snake (cow)
        this.drawCowSnake();
        
        // Draw food
        this.drawFood();
    }
    
    drawGrassPattern() {
        this.ctx.fillStyle = '#9ACD32';
        for (let x = 0; x < this.tileCount.x; x++) {
            for (let y = 0; y < this.tileCount.y; y++) {
                if ((x + y) % 4 === 0) {
                    this.ctx.fillRect(
                        x * this.gridSize + this.gridSize * 0.3,
                        y * this.gridSize + this.gridSize * 0.3,
                        this.gridSize * 0.1,
                        this.gridSize * 0.4
                    );
                }
            }
        }
    }
    
    drawCowSnake() {
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            if (index === 0) {
                // Draw cow head with emoji
                this.drawCowEmoji(x, y, true);
            } else {
                // Draw cow body with emoji
                this.drawCowEmoji(x, y, false);
            }
        });
    }
    
    drawCowEmoji(x, y, isHead = false) {
        // Draw a subtle background for better visibility
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
        
        // Set up emoji styling
        this.ctx.font = `${this.gridSize - 2}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        if (isHead) {
            // Cow head emoji - slightly larger for the head
            this.ctx.font = `${this.gridSize}px Arial`;
            this.ctx.fillText('🐄', x + this.gridSize / 2, y + this.gridSize / 2);
        } else {
            // Cow body emoji - slightly smaller
            this.ctx.font = `${this.gridSize - 4}px Arial`;
            this.ctx.fillText('🐄', x + this.gridSize / 2, y + this.gridSize / 2);
        }
    }
    
    drawFood() {
        const foodType = this.foodTypes.find(f => f.name === this.food.type);
        const x = this.food.x * this.gridSize;
        const y = this.food.y * this.gridSize;
        
        // Draw food background
        this.ctx.fillStyle = foodType.color;
        this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // Draw food emoji/icon
        this.ctx.font = `${this.gridSize - 6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(
            foodType.emoji,
            x + this.gridSize / 2,
            y + this.gridSize - 4
        );
    }
    
    playEatSound() {
        // Create a simple audio context for cow eating sounds
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    playMooSound() {
        // More complex moo sound for game over
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.5);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreElement.textContent = this.highScore;
            localStorage.setItem('cowSnakeHighScore', this.highScore);
        }
        
        this.finalScoreElement.textContent = this.score;
        this.gameOverDiv.style.display = 'block';
        
        // Play moo sound
        this.playMooSound();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new CowSnakeGame();
});

// Add some fun cow facts that appear randomly
const cowFacts = [
    "🐄 Did you know? Cows have best friends and get stressed when separated!",
    "🐄 Fun fact: Cows can walk upstairs but not downstairs!",
    "🐄 Amazing: Cows have almost 360-degree panoramic vision!",
    "🐄 Cool fact: Cows produce about 125 pounds of saliva per day!",
    "🐄 Wow: Cows can remember faces for up to 2 years!"
];

// Display a random cow fact
function showRandomCowFact() {
    const fact = cowFacts[Math.floor(Math.random() * cowFacts.length)];
    console.log(fact);
}

// Show a cow fact every 30 seconds
setInterval(showRandomCowFact, 30000);
