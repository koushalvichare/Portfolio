// Modern Portfolio JavaScript - Completely New Implementation
class ModernPortfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupParallax();
        this.setupTypewriter();
        this.setupParticles();
    }

    init() {
        // Remove loading screen
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 1500);

        // Setup navbar scroll effect
        this.setupNavbar();
        
        // Setup smooth scrolling
        this.setupSmoothScroll();
        
        // Setup intersection observer for animations
        this.setupScrollAnimations();
        
        // Setup cursor effects
        this.setupCursorEffects();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Button hover effects
        this.setupButtonEffects();
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Scroll handler for various effects
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Stagger animations for project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Stagger animations for skill items
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    setupCursorEffects() {
        // Create custom cursor glow
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Show/hide cursor glow on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorGlow.classList.remove('active');
            });
        });
    }

    setupButtonEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Ripple effect
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
                ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
                ripple.style.width = ripple.style.height = '10px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupAnimations() {
        // Counter animation for stats
        this.animateCounters();
        
        // Typing animation for hero text
        this.setupTypewriter();
        
        // Floating elements animation
        this.createFloatingElements();
        
        // Project card hover effects
        this.setupProjectCardEffects();
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            
            element.textContent = '';
            
            setTimeout(() => {
                this.typeWriter(element, text, speed);
            }, 1000);
        });
    }

    typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add blinking cursor
                element.innerHTML += '<span class="cursor-blink">|</span>';
            }
        }, speed);
    }

    createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        
        // Create floating geometric shapes
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 10 + 's';
            element.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            floatingContainer.appendChild(element);
        }
        
        hero.appendChild(floatingContainer);
    }

    setupProjectCardEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            overlay.innerHTML = `
                <div class="project-overlay-content">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </div>
            `;
            
            card.appendChild(overlay);
            
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * (element.dataset.parallax || 0.5);
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupParticles() {
        // Create animated background particles
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'background-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${3 + Math.random() * 4}s linear forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 7000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 300);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    handleScroll() {
        // Progress indicator
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                z-index: 10001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrolled + '%';
    }

    handleResize() {
        // Recalculate animations on resize
        this.setupParallax();
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Advanced scroll animations
class ScrollAnimations {
    constructor() {
        this.setupMagneticButtons();
        this.setupTextReveal();
        this.setupImageReveal();
    }

    setupMagneticButtons() {
        document.querySelectorAll('.btn, .project-card').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupTextReveal() {
        const textElements = document.querySelectorAll('.section-title, .hero-title');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = text.split('').map(char => 
                `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`
            ).join('');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const chars = entry.target.querySelectorAll('.char');
                        chars.forEach((char, index) => {
                            setTimeout(() => {
                                char.style.opacity = '1';
                                char.style.transform = 'translateY(0)';
                                char.style.transition = 'all 0.3s ease';
                            }, index * 50);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }

    setupImageReveal() {
        document.querySelectorAll('.project-image, .about-image, .hero-image').forEach(image => {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                z-index: 1;
                transform: scaleX(1);
                transform-origin: left;
                transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
            `;
            
            image.style.position = 'relative';
            image.appendChild(overlay);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            overlay.style.transform = 'scaleX(0)';
                            overlay.style.transformOrigin = 'right';
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(image);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
    new ScrollAnimations();
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
    
    .cursor-blink {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(102, 126, 234, 0.9);
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
    }
    
    .project-overlay-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    
    .project-overlay i {
        font-size: 2rem;
    }
    
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
