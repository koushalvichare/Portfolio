// Interactive Components and Effects
class InteractiveEffects {
    constructor() {
        this.setupMagneticElements();
        this.setupHoverDistortions();
        this.setupScrollProgressBar();
        this.setupLazyLoading();
        this.setupSmoothScrolling();
    }

    setupMagneticElements() {
        // Magnetic effects disabled for project cards to prevent floating
        const magneticElements = document.querySelectorAll('.btn, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.2;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupHoverDistortions() {
        // Hover distortions disabled for project cards to prevent animations
        /*
        document.querySelectorAll('.project-card').forEach(card => {
            const overlay = document.createElement('div');
            overlay.className = 'hover-distortion';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                transform: translateX(-100%) skewX(-20deg);
                transition: transform 0.6s ease;
                pointer-events: none;
                z-index: 2;
            `;
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(overlay);
            
            card.addEventListener('mouseenter', () => {
                overlay.style.transform = 'translateX(100%) skewX(-20deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                overlay.style.transform = 'translateX(-100%) skewX(-20deg)';
            });
        });
        */
    }

    setupScrollProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            width: 0%;
            transition: width 0.1s ease;
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        `;
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const targetPosition = target.offsetTop - 80; // Account for navbar
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }

                    function easeInOutCubic(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t + b;
                        t -= 2;
                        return c / 2 * (t * t * t + 2) + b;
                    }

                    requestAnimationFrame(animation);
                }
            });
        });
    }
}

// Performance optimized scroll animations
class OptimizedScrollAnimations {
    constructor() {
        this.elements = new Map();
        this.rafId = null;
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.elements.set(entry.target, true);
                    entry.target.classList.add('in-view');
                } else {
                    this.elements.set(entry.target, false);
                    entry.target.classList.remove('in-view');
                }
            });
            
            if (this.elements.size > 0 && !this.rafId) {
                this.startAnimationLoop();
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe elements for animation
        document.querySelectorAll('.skill-item, .project-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    startAnimationLoop() {
        this.rafId = requestAnimationFrame(() => {
            this.updateAnimations();
            this.rafId = null;
            
            if (this.elements.size > 0) {
                this.startAnimationLoop();
            }
        });
    }

    updateAnimations() {
        this.elements.forEach((isVisible, element) => {
            if (isVisible) {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const elementCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter);
                const maxDistance = windowHeight / 2;
                const proximity = Math.max(0, 1 - distanceFromCenter / maxDistance);
                
                // Apply subtle scale and opacity based on proximity
                element.style.transform = `scale(${0.95 + proximity * 0.05})`;
                element.style.opacity = 0.7 + proximity * 0.3;
            }
        });
    }
}

// Theme and color management
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.setupThemeToggle();
        this.setupColorSchemes();
    }

    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-gradient);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-medium);
        `;
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.body.appendChild(themeToggle);
    }

    setupColorSchemes() {
        // Define multiple color schemes
        this.colorSchemes = {
            default: {
                primary: '#667eea',
                secondary: '#f093fb',
                accent: '#4facfe'
            },
            sunset: {
                primary: '#ff6b6b',
                secondary: '#feca57',
                accent: '#ff9ff3'
            },
            ocean: {
                primary: '#3742fa',
                secondary: '#2ed573',
                accent: '#70a1ff'
            },
            forest: {
                primary: '#2ed573',
                secondary: '#7bed9f',
                accent: '#70a1ff'
            }
        };
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme');
        
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
    }

    changeColorScheme(schemeName) {
        const scheme = this.colorSchemes[schemeName];
        if (scheme) {
            const root = document.documentElement;
            root.style.setProperty('--primary-color', scheme.primary);
            root.style.setProperty('--secondary-color', scheme.secondary);
            root.style.setProperty('--accent-color', scheme.accent);
        }
    }
}

// Form enhancements
class FormEnhancements {
    constructor() {
        this.setupFormValidation();
        this.setupFormAnimations();
        this.setupAutoResize();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearValidation(input);
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        if (field.required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }

        this.showValidation(field, isValid, message);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showValidation(field, isValid, message) {
        this.clearValidation(field);
        
        field.classList.add(isValid ? 'valid' : 'invalid');
        
        if (!isValid) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.cssText = `
                color: #e74c3c;
                font-size: 0.8rem;
                margin-top: 0.25rem;
                animation: slideDown 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearValidation(field) {
        field.classList.remove('valid', 'invalid');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupFormAnimations() {
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            const label = field.parentNode.querySelector('label');
            
            if (label) {
                field.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-120%) scale(0.8)';
                    label.style.color = 'var(--primary-color)';
                });
                
                field.addEventListener('blur', () => {
                    if (!field.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = 'var(--text-secondary)';
                    }
                });
            }
        });
    }

    setupAutoResize() {
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
        });
    }
}

// Initialize all interactive components
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEffects();
    new OptimizedScrollAnimations();
    new ThemeManager();
    new FormEnhancements();
});

// Add additional CSS for interactive effects
const interactiveStyles = document.createElement('style');
interactiveStyles.textContent = `
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group label {
        position: absolute;
        left: 1rem;
        top: 1rem;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 1;
    }
    
    .form-group input:focus + label,
    .form-group textarea:focus + label,
    .form-group input:not(:placeholder-shown) + label,
    .form-group textarea:not(:placeholder-shown) + label {
        transform: translateY(-120%) scale(0.8);
        color: var(--primary-color);
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #27ae60;
        box-shadow: 0 0 10px rgba(39, 174, 96, 0.2);
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #e74c3c;
        box-shadow: 0 0 10px rgba(231, 76, 60, 0.2);
    }
    
    .dark-theme {
        --bg-primary: #1a1a1a;
        --bg-secondary: #2d2d2d;
        --text-primary: #ffffff;
        --text-secondary: #b0b0b0;
    }
    
    .dark-theme .navbar {
        background: rgba(26, 26, 26, 0.95);
    }
    
    .dark-theme .navbar.scrolled {
        background: rgba(0, 0, 0, 0.95);
    }
    
    img.loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    img[data-src] {
        opacity: 0;
    }
    
    .in-view {
        transition: all 0.3s ease;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
        .theme-toggle {
            top: 10px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
        }
        
        .cursor-glow {
            display: none;
        }
        
        .hover-distortion {
            display: none;
        }
    }
`;

document.head.appendChild(interactiveStyles);
