// Life Palette - Interactive Color Palette Experience
// Creative gimmick for emotional color painting

'use strict';

/**
 * Interactive Color Palette Canvas Experience
 * Users can create art with emotional colors based on mouse movement
 */
class ColorPaletteExperience {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.paintBrush = null;
        this.emotionText = null;
        this.emotionColor = null;
        this.isInitialized = false;
        
        // Emotion-based color palettes
        this.emotions = {
            calm: { name: '평온함', colors: ['#81C784', '#A8E6CF', '#B2DFDB'] },
            joy: { name: '기쁨', colors: ['#FFD54F', '#FFCC80', '#FFE082'] },
            creative: { name: '창의성', colors: ['#AB47BC', '#E1BEE7', '#F8BBD9'] },
            energetic: { name: '활기참', colors: ['#FF7043', '#FFAB91', '#FFE0B2'] },
            peaceful: { name: '안정감', colors: ['#64B5F6', '#90CAF9', '#C3D9FF'] },
            warm: { name: '따뜻함', colors: ['#F06292', '#FCE4EC', '#F8BBD9'] },
            focus: { name: '집중력', colors: ['#66BB6A', '#C8E6C9', '#E8F5E8'] },
            hope: { name: '희망', colors: ['#29B6F6', '#81D4FA', '#B3E5FC'] }
        };
        
        this.currentEmotion = 'calm';
        this.particles = [];
        this.isMouseDown = false;
        this.lastMousePos = { x: 0, y: 0 };
        
        this.init();
    }
    
    /**
     * Initialize the color palette experience
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Setup canvas and event listeners
     */
    setup() {
        this.canvas = document.getElementById('paintCanvas');
        this.paintBrush = document.getElementById('paintBrush');
        this.emotionText = document.getElementById('emotionText');
        this.emotionColor = document.getElementById('emotionColor');
        
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.setupEventListeners();
        this.startAnimation();
        this.isInitialized = true;
        
        console.log('🎨 Color Palette Experience initialized');
    }
    
    /**
     * Setup canvas properties
     */
    setupCanvas() {
        // Set responsive canvas size
        const rect = this.canvas.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        if (isMobile) {
            this.canvas.width = Math.min(rect.width, 400);
            this.canvas.height = 200;
        } else if (isTablet) {
            this.canvas.width = Math.min(rect.width, 600);
            this.canvas.height = 300;
        } else {
            this.canvas.width = Math.min(rect.width, 720);
            this.canvas.height = 400;
        }
        
        // Set initial background
        this.ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Welcome message
        this.drawWelcomeMessage();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    /**
     * Draw welcome message on canvas
     */
    drawWelcomeMessage() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.6;
        this.ctx.fillStyle = '#9E9E9E';
        this.ctx.font = 'bold 24px Pretendard, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('마우스를 움직여보세요!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.font = '16px Pretendard, sans-serif';
        this.ctx.fillText('감정에 따라 색깔이 변화합니다', this.canvas.width / 2, this.canvas.height / 2 + 10);
        this.ctx.restore();
    }
    
    /**
     * Setup event listeners for interaction
     */
    setupEventListeners() {
        const canvasContainer = this.canvas.parentElement;
        
        // Mouse events
        canvasContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        canvasContainer.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        canvasContainer.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        canvasContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        canvasContainer.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Touch events for mobile
        canvasContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        canvasContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        canvasContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Clear canvas button (optional)
        this.addClearButton();
    }
    
    /**
     * Handle mouse movement
     */
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Update brush position
        this.updateBrushPosition(e.clientX, e.clientY);
        
        // Determine emotion based on mouse position and speed
        this.updateEmotionBasedOnMovement(mouseX, mouseY, e);
        
        // Create paint effect
        this.createPaintEffect(mouseX, mouseY);
        
        // Update last position
        this.lastMousePos = { x: mouseX, y: mouseY };
    }
    
    /**
     * Handle mouse enter
     */
    handleMouseEnter(e) {
        if (this.paintBrush) {
            this.paintBrush.style.display = 'block';
        }
    }
    
    /**
     * Handle mouse leave
     */
    handleMouseLeave(e) {
        if (this.paintBrush) {
            this.paintBrush.style.display = 'none';
        }
    }
    
    /**
     * Handle mouse down
     */
    handleMouseDown(e) {
        this.isMouseDown = true;
        if (this.paintBrush) {
            this.paintBrush.style.transform += ' scale(0.8)';
        }
    }
    
    /**
     * Handle mouse up
     */
    handleMouseUp(e) {
        this.isMouseDown = false;
        if (this.paintBrush) {
            this.paintBrush.style.transform = this.paintBrush.style.transform.replace(' scale(0.8)', '');
        }
    }
    
    /**
     * Handle touch events
     */
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleMouseDown(touch);
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleMouseMove(touch);
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.handleMouseUp(e);
    }
    
    /**
     * Update brush position
     */
    updateBrushPosition(clientX, clientY) {
        if (!this.paintBrush) return;
        
        this.paintBrush.style.left = (clientX + 10) + 'px';
        this.paintBrush.style.top = (clientY - 10) + 'px';
    }
    
    /**
     * Update emotion based on mouse movement patterns
     */
    updateEmotionBasedOnMovement(mouseX, mouseY, event) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Calculate distance from center
        const distanceFromCenter = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
        const normalizedDistance = distanceFromCenter / maxDistance;
        
        // Calculate movement speed
        const deltaX = mouseX - this.lastMousePos.x;
        const deltaY = mouseY - this.lastMousePos.y;
        const speed = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        
        // Determine emotion based on position and movement
        let newEmotion = 'calm';
        
        if (speed > 15) {
            newEmotion = 'energetic';
        } else if (speed > 8) {
            newEmotion = 'joy';
        } else if (mouseY < this.canvas.height * 0.3) {
            newEmotion = 'hope';
        } else if (mouseX > this.canvas.width * 0.7) {
            newEmotion = 'creative';
        } else if (normalizedDistance < 0.3) {
            newEmotion = 'focus';
        } else if (mouseY > this.canvas.height * 0.7) {
            newEmotion = 'warm';
        } else if (speed < 2) {
            newEmotion = 'peaceful';
        }
        
        if (newEmotion !== this.currentEmotion) {
            this.currentEmotion = newEmotion;
            this.updateEmotionDisplay();
        }
    }
    
    /**
     * Update emotion display
     */
    updateEmotionDisplay() {
        const emotion = this.emotions[this.currentEmotion];
        
        if (this.emotionText) {
            this.emotionText.textContent = emotion.name;
            this.emotionText.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (this.emotionText) {
                    this.emotionText.style.transform = 'scale(1)';
                }
            }, 200);
        }
        
        if (this.emotionColor) {
            const randomColor = emotion.colors[Math.floor(Math.random() * emotion.colors.length)];
            this.emotionColor.style.background = randomColor;
            this.emotionColor.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                if (this.emotionColor) {
                    this.emotionColor.style.transform = 'scale(1) rotate(0deg)';
                }
            }, 300);
        }
    }
    
    /**
     * Create paint effect on canvas
     */
    createPaintEffect(mouseX, mouseY) {
        const emotion = this.emotions[this.currentEmotion];
        const speed = Math.sqrt((mouseX - this.lastMousePos.x) ** 2 + (mouseY - this.lastMousePos.y) ** 2);
        
        // More particles for faster movement
        const particleCount = Math.min(Math.max(3, Math.floor(speed / 3)), 8);
        
        for (let i = 0; i < particleCount; i++) {
            const color = emotion.colors[Math.floor(Math.random() * emotion.colors.length)];
            const particle = {
                x: mouseX + (Math.random() - 0.5) * 30,
                y: mouseY + (Math.random() - 0.5) * 30,
                radius: Math.random() * 12 + 3,
                color: color,
                alpha: Math.random() * 0.4 + 0.6,
                life: 1.0,
                velocityX: (Math.random() - 0.5) * (speed * 0.1 + 1),
                velocityY: (Math.random() - 0.5) * (speed * 0.1 + 1),
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                rotation: 0,
                shimmer: Math.random() * Math.PI * 2,
                sparkle: Math.random() > 0.7
            };
            
            this.particles.push(particle);
            this.drawParticle(particle);
        }
        
        // Add sparkle effects for special emotions
        if (this.currentEmotion === 'joy' || this.currentEmotion === 'creative') {
            this.createSparkleEffect(mouseX, mouseY);
        }
        
        // Limit particle count
        if (this.particles.length > 150) {
            this.particles.splice(0, 30);
        }
    }
    
    /**
     * Draw a single particle
     */
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.alpha;
        
        // Add shimmer effect
        particle.shimmer += 0.1;
        const shimmerAlpha = (Math.sin(particle.shimmer) + 1) * 0.1 + 0.8;
        this.ctx.globalAlpha *= shimmerAlpha;
        
        // Rotate particle
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);
        
        if (particle.sparkle) {
            // Draw sparkle particle
            this.drawSparkleParticle(particle);
        } else {
            // Draw regular particle with gradient
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.radius);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.7, particle.color + '80');
            gradient.addColorStop(1, particle.color + '20');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    /**
     * Create sparkle effect for special emotions
     */
    createSparkleEffect(mouseX, mouseY) {
        for (let i = 0; i < 3; i++) {
            const sparkle = {
                x: mouseX + (Math.random() - 0.5) * 50,
                y: mouseY + (Math.random() - 0.5) * 50,
                radius: Math.random() * 3 + 2,
                color: '#FFFFFF',
                alpha: 1.0,
                life: 1.0,
                velocityX: (Math.random() - 0.5) * 4,
                velocityY: (Math.random() - 0.5) * 4,
                rotationSpeed: Math.random() * 0.4,
                rotation: 0,
                shimmer: Math.random() * Math.PI * 2,
                sparkle: true
            };
            
            this.particles.push(sparkle);
        }
    }
    
    /**
     * Draw sparkle particle
     */
    drawSparkleParticle(particle) {
        // Draw star shape
        const spikes = 4;
        const outerRadius = particle.radius;
        const innerRadius = outerRadius * 0.5;
        
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (spikes * 2)) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    /**
     * Animation loop
     */
    startAnimation() {
        const animate = () => {
            this.updateParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    /**
     * Update all particles
     */
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update particle properties
            particle.life -= particle.sparkle ? 0.02 : 0.01;
            particle.alpha = particle.life * (particle.sparkle ? 1.0 : 0.7);
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.velocityX *= 0.98;
            particle.velocityY *= 0.98;
            particle.rotation += particle.rotationSpeed;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    /**
     * Add clear canvas button
     */
    addClearButton() {
        const container = this.canvas.parentElement;
        const clearButton = document.createElement('button');
        clearButton.textContent = '🗑️ 캔버스 지우기';
        clearButton.className = 'clear-canvas-btn';
        clearButton.style.cssText = `
            position: absolute;
            bottom: var(--space-4, 1rem);
            right: var(--space-4, 1rem);
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(255, 204, 128, 0.5);
            border-radius: 12px;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: 600;
            color: #666;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.2s ease;
            z-index: 15;
        `;
        
        clearButton.addEventListener('mouseenter', () => {
            clearButton.style.transform = 'scale(1.05)';
            clearButton.style.background = 'rgba(255, 255, 255, 1)';
        });
        
        clearButton.addEventListener('mouseleave', () => {
            clearButton.style.transform = 'scale(1)';
            clearButton.style.background = 'rgba(255, 255, 255, 0.9)';
        });
        
        clearButton.addEventListener('click', () => {
            this.clearCanvas();
        });
        
        container.appendChild(clearButton);
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        if (!this.canvas) return;
        
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.setupCanvas();
        }, 100);
    }
    
    /**
     * Clear the canvas
     */
    clearCanvas() {
        this.ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
        this.drawWelcomeMessage();
        
        // Visual feedback
        if (this.canvas) {
            this.canvas.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if (this.canvas) {
                    this.canvas.style.transform = 'scale(1)';
                }
            }, 150);
        }
    }
    
    /**
     * Get random emotion for variety
     */
    getRandomEmotion() {
        const emotions = Object.keys(this.emotions);
        return emotions[Math.floor(Math.random() * emotions.length)];
    }
    
    /**
     * Save canvas as image (bonus feature)
     */
    saveArtwork() {
        const link = document.createElement('a');
        link.download = `life-palette-artwork-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    /**
     * Cleanup method
     */
    destroy() {
        this.particles = [];
        this.isInitialized = false;
    }
}

// Initialize the Color Palette Experience
let colorPaletteExperience;

document.addEventListener('DOMContentLoaded', () => {
    colorPaletteExperience = new ColorPaletteExperience();
    
    // Add keyboard shortcut for clearing canvas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' && e.ctrlKey && colorPaletteExperience.isInitialized) {
            e.preventDefault();
            colorPaletteExperience.clearCanvas();
        }
    });
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorPaletteExperience;
}