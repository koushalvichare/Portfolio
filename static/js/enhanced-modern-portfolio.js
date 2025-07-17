// Enhanced Modern Portfolio JavaScript with Dark Theme Support
class EnhancedModernPortfolio {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupThemeToggle();
        this.setupIntersectionObserver();
        this.setupParallax();
        this.setupSmoothScrolling();
        this.setupCursorEffects();
        this.setupPerformanceOptimizations();
        this.setupHeroProfileEffects();
        this.setupAdvancedProfileEffects();
        this.setupAdvancedProfileEffects();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Enhanced loading screen
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    loadingScreen.remove();
                    this.startMainAnimations();
                }, 500);
            }
        }, 2000);

        // Setup navbar scroll effect
        this.setupNavbar();
        
        // Create floating elements
        this.createFloatingElements();
        
        // Setup progress indicator
        this.setupProgressIndicator();
        
        // Setup hero profile effects
        this.setupHeroProfileEffects();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                this.animateMenuToggle(mobileToggle);
            });
        }

        // Navigation link active states
        this.setupNavActiveStates();

        // Form submission with enhanced feedback
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Enhanced button effects
        this.setupButtonEffects();
        
        // Window resize handler with debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Scroll handler for various effects
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return; // Safety check
        
        // Set initial state
        themeToggle.checked = this.currentTheme === 'dark';
        
        themeToggle.addEventListener('change', () => {
            this.currentTheme = themeToggle.checked ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            
            // Save theme preference
            localStorage.setItem('theme', this.currentTheme);
            
            // Show theme change notification
            this.showNotification(`${this.currentTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'success');
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#0a0a0a' : '#ffffff';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#0a0a0a' : '#ffffff';
            document.head.appendChild(meta);
        }
    }

    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        
        const handleNavbarScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
                
                // Hide navbar when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > 300) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', this.throttle(handleNavbarScroll, 16));
    }

    setupNavActiveStates() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${targetId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    setupIntersectionObserver() {
        // Intersection observer disabled to prevent any entrance animations
        /*
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for children
                    const children = entry.target.querySelectorAll('.skill-item, .project-card, .contact-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        */
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with custom easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = Math.min(Math.abs(distance) / 2, 1000);
                    let start = null;

                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Custom easing function
                        const ease = this.easeInOutCubic(progress);
                        window.scrollTo(0, startPosition + (distance * ease));
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    };

                    requestAnimationFrame(animation);
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    setupCursorEffects() {
        // Enhanced cursor effects
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        updateCursor();

        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .project-card, .skill-item, .contact-item, .social-link'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.classList.add('active');
                el.style.transform = el.style.transform + ' scale(1.02)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorGlow.classList.remove('active');
                el.style.transform = el.style.transform.replace(' scale(1.02)', '');
            });
        });
    }

    setupButtonEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Magnetic effect
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
            
            // Enhanced ripple effect
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        
        // Create more sophisticated floating elements
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            const size = 60 + Math.random() * 40;
            element.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${20 + Math.random() * 15}s;
                background: radial-gradient(circle, 
                    rgba(${102 + Math.random() * 100}, ${126 + Math.random() * 100}, ${234}, 0.1),
                    transparent 70%);
                backdrop-filter: blur(5px);
            `;
            
            floatingContainer.appendChild(element);
        }
        
        hero.appendChild(floatingContainer);
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * (parseFloat(element.dataset.parallax) || 0.5);
                const rect = element.getBoundingClientRect();
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
        };
        
        window.addEventListener('scroll', this.throttle(updateParallax, 16));
    }

    setupProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, 
                var(--primary-color), 
                var(--secondary-color), 
                var(--accent-color));
            z-index: 10001;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px var(--primary-color);
        `;
        document.body.appendChild(progressBar);
        
        const updateProgress = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        };
        
        window.addEventListener('scroll', this.throttle(updateProgress, 16));
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes mobile menu
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const sections = document.querySelectorAll('section[id]');
                const currentSection = document.querySelector('section.in-view') || sections[0];
                const currentIndex = Array.from(sections).indexOf(currentSection);
                
                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }
                
                sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    setupPerformanceOptimizations() {
        // Intersection observer for performance
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('section').forEach(section => {
            performanceObserver.observe(section);
        });
        
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
            document.documentElement.style.setProperty('--transition-bounce', 'all 0.3s ease');
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Enhanced loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission with enhanced feedback
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset button with animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
            }, 2000);
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1.5rem 2rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                        type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                        'linear-gradient(135deg, #3b82f6, #2563eb)'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        notification.innerHTML = `${icon} ${message}`;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    startMainAnimations() {
        // Start typewriter effect for hero
        const heroSubtitle = document.querySelector('[data-typewriter]');
        if (heroSubtitle) {
            this.typeWriter(heroSubtitle, heroSubtitle.getAttribute('data-typewriter'), 100);
        }
        
        // Animate floating elements
        document.querySelectorAll('.floating-element').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.animation = `floatAround ${20 + Math.random() * 10}s linear infinite`;
            }, index * 200);
        });
    }

    typeWriter(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add cursor blink
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                element.appendChild(cursor);
            }
        }, speed);
    }

    animateMenuToggle(toggle) {
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-8px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-8px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }

    handleScroll() {
        // Performance optimized scroll handler
        if (!this.isLoaded) return;
        
        // Update various scroll-dependent effects here
        this.updateScrollProgress();
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update any scroll-dependent UI elements
        document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
        }
    }

    // Utility functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

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
        };
    }

    setupHeroProfileEffects() {
        const heroProfileImage = document.querySelector('.hero-profile-image');
        const heroProfileContainer = document.querySelector('.hero-profile-container');
        
        if (heroProfileImage && heroProfileContainer) {
            // Add particle effects around the profile image
            this.createProfileParticles(heroProfileContainer);
            
            // Add mouse tracking effect
            heroProfileContainer.addEventListener('mousemove', (e) => {
                const rect = heroProfileContainer.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Subtle magnetic effect
                heroProfileImage.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.02)`;
            });
            
            heroProfileContainer.addEventListener('mouseleave', () => {
                heroProfileImage.style.transform = 'translate(0, 0) scale(1)';
            });
            
            // Click effect for profile image
            heroProfileImage.addEventListener('click', () => {
                this.triggerProfileImageEffect();
            });
            
            // Add breathing animation
            setInterval(() => {
                if (!heroProfileContainer.matches(':hover')) {
                    heroProfileImage.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        if (!heroProfileContainer.matches(':hover')) {
                            heroProfileImage.style.transform = 'scale(1)';
                        }
                    }, 1000);
                }
            }, 4000);
        }
    }

    createProfileParticles(container) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'hero-profile-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Create floating particles around profile
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'profile-particle';
            
            const size = 3 + Math.random() * 4;
            const colors = ['#8b7cf8', '#ff79c6', '#50fa7b', '#ffce54'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 10px ${color};
                opacity: 0.7;
                animation: profileParticleFloat ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            // Random position around the image
            const angle = (Math.PI * 2 * i) / 12;
            const radius = 80 + Math.random() * 40;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            
            particleContainer.appendChild(particle);
        }
        
        container.appendChild(particleContainer);
    }

    triggerProfileImageEffect() {
        const heroProfileImage = document.querySelector('.hero-profile-image');
        const heroProfileRing = document.querySelector('.hero-profile-ring');
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            background: radial-gradient(circle, rgba(139, 124, 248, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: profileRipple 1s ease-out;
            pointer-events: none;
            z-index: 5;
        `;
        
        heroProfileImage.parentElement.appendChild(ripple);
        
        // Enhanced glow effect
        heroProfileImage.style.boxShadow = `
            0 0 50px rgba(139, 124, 248, 1),
            0 0 100px rgba(255, 121, 198, 0.8),
            inset 0 0 30px rgba(255, 255, 255, 0.3)
        `;
        
        // Ring pulse effect
        if (heroProfileRing) {
            heroProfileRing.style.animationDuration = '0.5s';
        }
        
        // Reset effects after animation
        setTimeout(() => {
            ripple.remove();
            heroProfileImage.style.boxShadow = '';
            if (heroProfileRing) {
                heroProfileRing.style.animationDuration = '8s';
            }
        }, 1000);
        
        // Show notification
        this.showNotification('👋 Hello! I\'m Koushal Vichare', 'info');
    }

    // Additional hero profile enhancements
    setupAdvancedProfileEffects() {
        const heroProfileImage = document.querySelector('.hero-profile-image');
        const heroProfileContainer = document.querySelector('.hero-profile-container');
        
        if (!heroProfileImage || !heroProfileContainer) return;
        
        // Add speech bubble effect
        this.createSpeechBubble(heroProfileContainer);
        
        // Add profile image loader effect
        this.addProfileLoader(heroProfileImage);
        
        // Add profile stats overlay
        this.createProfileStatsOverlay(heroProfileContainer);
        
        // Add voice command simulation
        this.simulateVoiceCommands(heroProfileContainer);
        
        // Add detailed profile tooltip
        this.addProfileTooltip();
        
        // Add profile tooltip with detailed info
        this.addProfileTooltip();
    }
    
    createSpeechBubble(container) {
        const speeches = [
            "👋 Welcome to my portfolio!",
            "🚀 Let's build something amazing!",
            "💡 Ready to innovate together?",
            "⚡ Full-stack development expert",
            "🤖 AI/ML enthusiast"
        ];
        
        const speechBubble = document.createElement('div');
        speechBubble.className = 'hero-speech-bubble';
        speechBubble.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(139, 124, 248, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 10;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 25px rgba(139, 124, 248, 0.3);
        `;
        
        // Add arrow
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid rgba(139, 124, 248, 0.9);
        `;
        speechBubble.appendChild(arrow);
        
        container.appendChild(speechBubble);
        
        // Show random speech on hover
        container.addEventListener('mouseenter', () => {
            const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
            speechBubble.textContent = randomSpeech;
            speechBubble.appendChild(arrow);
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        });
        
        container.addEventListener('mouseleave', () => {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'translateX(-50%) translateY(10px) scale(0.8)';
        });
    }
    
    addProfileLoader(image) {
        // Create shimmer loading effect
        const loader = document.createElement('div');
        loader.className = 'profile-image-loader';
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.2) 50%, 
                transparent 100%);
            animation: profileShimmer 2s infinite;
            opacity: 0;
            z-index: 4;
        `;
        
        image.parentElement.appendChild(loader);
        
        // Show loader on click
        image.addEventListener('click', () => {
            loader.style.opacity = '1';
            setTimeout(() => {
                loader.style.opacity = '0';
            }, 2000);
        });
    }
    
    createProfileStatsOverlay(container) {
        const stats = [
            { icon: '💼', label: 'Projects', value: '50+' },
            { icon: '🏆', label: 'Awards', value: '10+' },
            { icon: '⭐', label: 'Rating', value: '5.0' },
            { icon: '🌍', label: 'Clients', value: '25+' }
        ];
        
        const statsOverlay = document.createElement('div');
        statsOverlay.className = 'profile-stats-overlay';
        statsOverlay.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
            margin-top: 20px;
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 5;
        `;
        
        stats.forEach((stat, index) => {
            const statItem = document.createElement('div');
            statItem.style.cssText = `
                background: rgba(139, 124, 248, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(139, 124, 248, 0.2);
                border-radius: 15px;
                padding: 12px 16px;
                text-align: center;
                min-width: 80px;
                transition: all 0.3s ease;
                animation-delay: ${index * 0.1}s;
            `;
            
            statItem.innerHTML = `
                <div style="font-size: 1.2rem; margin-bottom: 4px;">${stat.icon}</div>
                <div style="font-size: 0.9rem; font-weight: 600; color: #8b7cf8; margin-bottom: 2px;">${stat.value}</div>
                <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.7);">${stat.label}</div>
            `;
            
            statItem.addEventListener('mouseenter', () => {
                statItem.style.transform = 'translateY(-5px) scale(1.05)';
                statItem.style.background = 'rgba(139, 124, 248, 0.2)';
                statItem.style.boxShadow = '0 10px 25px rgba(139, 124, 248, 0.3)';
            });
            
            statItem.addEventListener('mouseleave', () => {
                statItem.style.transform = 'translateY(0) scale(1)';
                statItem.style.background = 'rgba(139, 124, 248, 0.1)';
                statItem.style.boxShadow = 'none';
            });
            
            statsOverlay.appendChild(statItem);
        });
        
        container.appendChild(statsOverlay);
        
        // Show stats on double click
        container.addEventListener('dblclick', () => {
            if (statsOverlay.style.opacity === '1') {
                statsOverlay.style.opacity = '0';
                statsOverlay.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                statsOverlay.style.opacity = '1';
                statsOverlay.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
    
    simulateVoiceCommands(container) {
        const commands = [
            "Voice: 'Show portfolio'",
            "Voice: 'Contact me'",
            "Voice: 'View projects'",
            "Voice: 'About Koushal'"
        ];
        
        // Random voice command simulation
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                const command = commands[Math.floor(Math.random() * commands.length)];
                this.showVoiceCommand(command, container);
            }
        }, 10000); // Check every 10 seconds
    }
    
    showVoiceCommand(command, container) {
        const voiceIndicator = document.createElement('div');
        voiceIndicator.style.cssText = `
            position: absolute;
            top: -100px;
            right: -20px;
            background: rgba(80, 250, 123, 0.9);
            color: #000;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            opacity: 0;
            transform: translateY(20px) scale(0.8);
            transition: all 0.4s ease;
            z-index: 10;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(80, 250, 123, 0.3);
            box-shadow: 0 5px 15px rgba(80, 250, 123, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        voiceIndicator.innerHTML = `
            <div style="width: 8px; height: 8px; background: #ff4444; border-radius: 50%; animation: voicePulse 0.5s infinite;"></div>
            ${command}
        `;
        
        container.appendChild(voiceIndicator);
        
        // Animate in
        setTimeout(() => {
            voiceIndicator.style.opacity = '1';
            voiceIndicator.style.transform = 'translateY(0) scale(1)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            voiceIndicator.style.opacity = '0';
            voiceIndicator.style.transform = 'translateY(-20px) scale(0.8)';
            setTimeout(() => voiceIndicator.remove(), 400);
        }, 3000);
    }

    // Add profile tooltip with detailed info
    addProfileTooltip() {
        const heroProfileImage = document.querySelector('.hero-profile-image');
        if (!heroProfileImage) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'profile-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: -150px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 124, 248, 0.3);
            border-radius: 15px;
            padding: 20px;
            width: 280px;
            color: white;
            font-size: 14px;
            opacity: 0;
            transform: translateX(-50%) translateY(20px) scale(0.9);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 100;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        tooltip.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #8b7cf8, #ff79c6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 18px;">👨‍💻</div>
                <div>
                    <div style="font-weight: 600; color: #8b7cf8;">Koushal Vichare</div>
                    <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7);">CEO & Full-Stack Developer</div>
                </div>
            </div>
            <div style="line-height: 1.5; margin-bottom: 12px; color: rgba(255, 255, 255, 0.8);">
                Passionate about AI/ML, blockchain technology, and creating scalable solutions that drive business growth.
            </div>
            <div style="display: flex; gap: 15px; font-size: 12px;">
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #50fa7b;">₹2Cr+</div>
                    <div style="color: rgba(255, 255, 255, 0.6);">Revenue</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #ff79c6;">600%</div>
                    <div style="color: rgba(255, 255, 255, 0.6);">Best ROI</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #ffce54;">2+</div>
                    <div style="color: rgba(255, 255, 255, 0.6);">Years</div>
                </div>
            </div>
        `;
        
        heroProfileImage.parentElement.appendChild(tooltip);
        
        let hoverTimeout;
        
        heroProfileImage.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 800); // Show after 800ms hover
        });
        
        heroProfileImage.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(20px) scale(0.9)';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new EnhancedModernPortfolio();
    
    // Mark as loaded after initialization
    setTimeout(() => {
        portfolio.isLoaded = true;
    }, 100);
});

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes floatIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .floating-element {
        opacity: 0;
        animation: floatIn 1s ease forwards;
    }
    
    .mobile-menu-toggle.active span {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    /* Enhanced hover effects */
    .skill-item:hover {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(-8px) scale(1.05); }
        40%, 80% { transform: translateY(-4px) scale(1.02); }
    }
    
    /* Loading states */
    .loading-state {
        position: relative;
        overflow: hidden;
    }
    
    .loading-state::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        100% { left: 100%; }
    }
    
    /* Hero profile effects */
    .hero-profile-container {
        position: relative;
        overflow: hidden;
    }
    
    .hero-profile-image {
        transition: transform 0.3s ease;
    }
    
    .hero-profile-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .profile-particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #8b7cf8;
        border-radius: 50%;
        opacity: 0.7;
        animation: profileParticleFloat 4s ease-in-out infinite;
    }
    
    @keyframes profileParticleFloat {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-10px) scale(1.2);
        }
    }
    
    @keyframes profileRipple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes profileShimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
    
    @keyframes voicePulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.2);
        }
    }
    
    /* Enhanced profile interactions */
    .hero-speech-bubble {
        animation: speechBubbleBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    @keyframes speechBubbleBounce {
        0% {
            transform: translateX(-50%) translateY(10px) scale(0.8);
        }
        70% {
            transform: translateX(-50%) translateY(-5px) scale(1.05);
        }
        100% {
            transform: translateX(-50%) translateY(0) scale(1);
        }
    }
    
    .profile-stats-overlay {
        animation: statsSlideUp 0.5s ease forwards;
    }
    
    @keyframes statsSlideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    /* Speech bubble styles */
    .hero-speech-bubble {
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(139, 124, 248, 0.9);
        color: white;
        padding: 12px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        transform: translateX(-50%) translateY(10px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 10;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 25px rgba(139, 124, 248, 0.3);
    }
    
    .hero-speech-bubble::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(139, 124, 248, 0.9);
    }
    
    /* Profile stats overlay */
    .profile-stats-overlay {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        margin-top: 20px;
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 5;
    }
    
    .profile-stats-overlay div {
        background: rgba(139, 124, 248, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 124, 248, 0.2);
        border-radius: 15px;
        padding: 12px 16px;
        text-align: center;
        min-width: 80px;
        transition: all 0.3s ease;
    }
    
    /* Voice command indicator */
    @keyframes voicePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;

document.head.appendChild(enhancedStyles);
