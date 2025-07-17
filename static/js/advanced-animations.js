// Enhanced Animations Library
class AdvancedAnimations {
    constructor() {
        this.setupMorphingShapes();
        this.setupWaveAnimations();
        this.setupGradientAnimations();
        this.setupInteractiveBackground();
    }

    setupMorphingShapes() {
        // Create morphing background shapes
        const shapes = document.createElement('div');
        shapes.className = 'morphing-shapes';
        shapes.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 200}px;
                height: ${100 + Math.random() * 200}px;
                background: linear-gradient(45deg, 
                    rgba(102, 126, 234, 0.1),
                    rgba(240, 147, 251, 0.1),
                    rgba(79, 172, 254, 0.1)
                );
                border-radius: ${30 + Math.random() * 70}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: morph ${10 + Math.random() * 10}s ease-in-out infinite alternate;
            `;
            shapes.appendChild(shape);
        }

        document.body.appendChild(shapes);
    }

    setupWaveAnimations() {
        // Create SVG wave animations
        const wave = document.createElement('div');
        wave.innerHTML = `
            <svg class="wave-animation" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        `;
        wave.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
            transform: rotate(180deg);
        `;

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(wave);
        }
    }

    setupGradientAnimations() {
        // Animated gradient backgrounds for sections
        document.querySelectorAll('.section-alt').forEach(section => {
            section.style.background = `
                linear-gradient(-45deg, 
                    rgba(102, 126, 234, 0.05),
                    rgba(240, 147, 251, 0.05),
                    rgba(79, 172, 254, 0.05),
                    rgba(118, 75, 162, 0.05)
                )
            `;
            section.style.backgroundSize = '400% 400%';
            section.style.animation = 'gradientShift 15s ease infinite';
        });
    }

    setupInteractiveBackground() {
        // Mouse-following interactive elements
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Create interactive background dots
        const interactiveBg = document.createElement('div');
        interactiveBg.className = 'interactive-background';
        interactiveBg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'interactive-dot';
            dot.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transition: all 0.3s ease;
            `;
            interactiveBg.appendChild(dot);
        }

        document.body.appendChild(interactiveBg);

        // Animate dots based on mouse position
        setInterval(() => {
            const dots = document.querySelectorAll('.interactive-dot');
            dots.forEach((dot, index) => {
                const rect = dot.getBoundingClientRect();
                const dotX = rect.left + rect.width / 2;
                const dotY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
                );
                
                if (distance < 100) {
                    const scale = 1 + (100 - distance) / 100 * 2;
                    dot.style.transform = `scale(${scale})`;
                    dot.style.background = `rgba(102, 126, 234, ${0.3 + (100 - distance) / 100 * 0.4})`;
                } else {
                    dot.style.transform = 'scale(1)';
                    dot.style.background = 'rgba(102, 126, 234, 0.3)';
                }
            });
        }, 50);
    }
}

// Parallax scroll effects
class ParallaxController {
    constructor() {
        this.elements = [];
        this.setupParallaxElements();
        this.bindEvents();
    }

    setupParallaxElements() {
        // Add parallax data attributes to elements
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.setAttribute('data-parallax', '0.3');
            this.elements.push(heroImage);
        }

        // Project cards parallax disabled to prevent floating animations
        /*
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.setAttribute('data-parallax', `${0.1 + (index % 3) * 0.05}`);
            this.elements.push(card);
        });
        */
    }

    bindEvents() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(element => {
                const rate = scrolled * parseFloat(element.dataset.parallax || 0);
                const rect = element.getBoundingClientRect();
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Text effects and typography animations
class TextEffects {
    constructor() {
        this.setupGlitchEffect();
        this.setupTypewriterEffect();
        this.setupTextShuffle();
    }

    setupGlitchEffect() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
            
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch-active');
                setTimeout(() => {
                    element.classList.remove('glitch-active');
                }, 500);
            });
        });
    }

    setupTypewriterEffect() {
        const typeElements = document.querySelectorAll('[data-typewriter]');
        
        typeElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid';
            element.style.animation = 'blink 1s infinite';
            
            this.typeWrite(element, text, speed);
        });
    }

    typeWrite(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    setupTextShuffle() {
        const shuffleElements = document.querySelectorAll('[data-shuffle]');
        
        shuffleElements.forEach(element => {
            const originalText = element.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            
            element.addEventListener('mouseenter', () => {
                let iterations = 0;
                const interval = setInterval(() => {
                    element.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                    
                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                    }
                    
                    iterations += 1 / 3;
                }, 30);
            });
        });
    }
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
    new ParallaxController();
    new TextEffects();
});

// Add dynamic CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes morph {
        0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
        }
        50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: rotate(180deg) scale(1.1);
        }
        100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(360deg) scale(1);
        }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .wave-animation {
        position: relative;
        display: block;
        width: calc(100% + 1.3px);
        height: 60px;
    }
    
    .wave-animation .shape-fill {
        fill: rgba(255, 255, 255, 0.1);
        animation: waveFlow 3s ease-in-out infinite;
    }
    
    @keyframes waveFlow {
        0%, 100% { d: path("M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"); }
        50% { d: path("M985.66,82.83C906.67,62,823.78,21,743.84,4.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,17.35V120H1200V85.8C1132.19,108.92,1055.71,101.31,985.66,82.83Z"); }
    }
    
    .glitch-active {
        position: relative;
        animation: glitch 0.3s ease-in-out;
    }
    
    .glitch-active::before,
    .glitch-active::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .glitch-active::before {
        animation: glitch-1 0.3s ease-in-out;
        color: #ff0040;
        z-index: -1;
    }
    
    .glitch-active::after {
        animation: glitch-2 0.3s ease-in-out;
        color: #00ffff;
        z-index: -2;
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes glitch-1 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(2px, -2px); }
        40% { transform: translate(-2px, 2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
    }
    
    @keyframes glitch-2 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(-2px, -2px); }
    }
    
    /* Scroll reveal animations */
    .reveal-up {
        opacity: 0;
        transform: translateY(60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .reveal-up.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .reveal-left {
        opacity: 0;
        transform: translateX(-60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .reveal-left.revealed {
        opacity: 1;
        transform: translateX(0);
    }
    
    .reveal-right {
        opacity: 0;
        transform: translateX(60px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .reveal-right.revealed {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Loading animations */
    .loading-dots {
        display: inline-block;
    }
    
    .loading-dots::after {
        content: '';
        animation: loadingDots 1.5s infinite;
    }
    
    @keyframes loadingDots {
        0%, 20% { content: ''; }
        40% { content: '.'; }
        60% { content: '..'; }
        80%, 100% { content: '...'; }
    }
`;

document.head.appendChild(animationStyles);
