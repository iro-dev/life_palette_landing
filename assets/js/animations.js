// Life Palette - Animation Effects
// CSS Animation utilities and enhanced visual effects

'use strict';

/**
 * Animation Controller for Life Palette Website
 * Handles scroll-based animations, hover effects, and visual enhancements
 */
class LifePaletteAnimations {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.scrollTriggers = new Map();
        this.activeAnimations = new Set();
        
        this.init();
    }
    
    /**
     * Initialize animation system
     */
    init() {
        if (this.isReducedMotion) {
            console.log('Reduced motion detected - limiting animations');
            return;
        }
        
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupMicroInteractions();
        this.setupBackgroundAnimations();
    }
    
    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            this.fallbackScrollAnimations();
            return;
        }
        
        // Main content animation observer
        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, entry.target.dataset.animation || 'fadeInUp');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Counter animation observer
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Progressive reveal observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStaggeredChildren(entry.target);
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements
        this.observeScrollElements(contentObserver, counterObserver, staggerObserver);
    }
    
    /**
     * Observe elements for scroll animations
     */
    observeScrollElements(contentObserver, counterObserver, staggerObserver) {
        // Main sections
        const sections = document.querySelectorAll('.hero, .services, .benefits, .differentiator, .application, .mission');
        sections.forEach(section => contentObserver.observe(section));
        
        // Cards and interactive elements
        const cards = document.querySelectorAll('.step-card, .benefit-card, .differentiator-item');
        cards.forEach(card => contentObserver.observe(card));
        
        // Counter elements (if any statistics are added)
        const counters = document.querySelectorAll('.counter, .stat-number');
        counters.forEach(counter => counterObserver.observe(counter));
        
        // Staggered animation containers
        const staggerContainers = document.querySelectorAll('.service-steps, .benefits-grid, .differentiator-grid, .company-values');
        staggerContainers.forEach(container => staggerObserver.observe(container));
        
        // Form elements
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => contentObserver.observe(group));
    }
    
    /**
     * Animate individual elements
     */
    animateElement(element, animationType = 'fadeInUp', delay = 0) {
        if (this.isReducedMotion || this.activeAnimations.has(element)) return;
        
        this.activeAnimations.add(element);
        
        setTimeout(() => {
            element.classList.add('animate', `animate-${animationType}`);
            
            // Remove from active set after animation completes
            setTimeout(() => {
                this.activeAnimations.delete(element);
            }, 1000);
        }, delay);
    }
    
    /**
     * Animate staggered children
     */
    animateStaggeredChildren(container) {
        if (this.isReducedMotion) return;
        
        const children = container.querySelectorAll('.step-card, .benefit-card, .differentiator-item, .value-item, .form-group');
        const staggerDelay = 150;
        
        children.forEach((child, index) => {
            this.animateElement(child, 'fadeInUp', index * staggerDelay);
        });
    }
    
    /**
     * Animate counters (for statistics)
     */
    animateCounters(container) {
        const counters = container.querySelectorAll('.counter, .stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target) || 0;
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            this.animateCounter(counter, target, duration);
        });
    }
    
    /**
     * Counter animation utility
     */
    animateCounter(element, target, duration) {
        let startTime = null;
        const startValue = 0;
        
        const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = this.formatNumber(target);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    /**
     * Format numbers for display
     */
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    /**
     * Setup hover effects and interactions
     */
    setupHoverEffects() {
        if (this.isReducedMotion) return;
        
        // Card hover effects
        this.setupCardHoverEffects();
        
        // Button interactions
        this.setupButtonAnimations();
        
        // Image hover effects
        this.setupImageHoverEffects();
        
        // Navigation hover effects
        this.setupNavigationAnimations();
    }
    
    /**
     * Setup card hover animations
     */
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.step-card, .benefit-card, .differentiator-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add subtle glow effect on focus
            card.addEventListener('focus', () => {
                card.style.boxShadow = '0 0 0 3px rgba(255, 142, 83, 0.3)';
            });
            
            card.addEventListener('blur', () => {
                card.style.boxShadow = '';
            });
        });
    }
    
    /**
     * Setup button animations
     */
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.primary-button, .secondary-button, .cta-button, .submit-button');
        
        buttons.forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', (e) => {
                if (this.isReducedMotion) return;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            // Hover scale effect
            button.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(-2px) scale(1.05)';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    /**
     * Setup image hover effects
     */
    setupImageHoverEffects() {
        const imagePlaceholders = document.querySelectorAll('.image-placeholder, .gallery-item');
        
        imagePlaceholders.forEach(placeholder => {
            placeholder.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    placeholder.style.transform = 'scale(1.05)';
                    placeholder.style.transition = 'transform 0.3s ease';
                }
            });
            
            placeholder.addEventListener('mouseleave', () => {
                placeholder.style.transform = 'scale(1)';
            });
        });
    }
    
    /**
     * Setup navigation animations
     */
    setupNavigationAnimations() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    link.style.transform = 'translateY(-1px)';
                    link.style.transition = 'transform 0.2s ease';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }
    
    /**
     * Setup loading animations
     */
    setupLoadingAnimations() {
        // Page load animation
        this.animatePageLoad();
        
        // Loading spinner keyframes
        this.injectSpinnerStyles();
        
        // Skeleton loading for future image loading
        this.setupSkeletonLoading();
    }
    
    /**
     * Animate page load
     */
    animatePageLoad() {
        if (this.isReducedMotion) return;
        
        // Fade in body
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.opacity = '0';
            heroContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.opacity = '1';
            }, 200);
        }
    }
    
    /**
     * Inject spinner styles
     */
    injectSpinnerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .animate-fadeInUp {
                animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .animate-fadeInDown {
                animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .animate-fadeInLeft {
                animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .animate-fadeInRight {
                animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .animate-scaleIn {
                animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .form-success {
                background: linear-gradient(135deg, #4ECDC4, #A8E6CF);
                color: white;
                padding: 2rem;
                border-radius: 1rem;
                text-align: center;
                animation: slideInUp 0.5s ease forwards;
            }
            
            .form-error {
                background: #FFE6E6;
                border: 1px solid #FF6B6B;
                color: #D63031;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                animation: slideInDown 0.3s ease forwards;
            }
            
            .field-error {
                color: #D63031;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
                animation: fadeIn 0.2s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .animate,
                .animate-fadeInUp,
                .animate-fadeInDown,
                .animate-fadeInLeft,
                .animate-fadeInRight,
                .animate-scaleIn {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
                
                .spinner {
                    animation: none !important;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Setup skeleton loading
     */
    setupSkeletonLoading() {
        const style = document.createElement('style');
        style.textContent = `
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .skeleton {
                    animation: none;
                    background: #f0f0f0;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Setup micro-interactions
     */
    setupMicroInteractions() {
        if (this.isReducedMotion) return;
        
        // Form input focus effects
        this.setupFormAnimations();
        
        // Logo animation
        this.setupLogoAnimation();
        
        // Progress indicators
        this.setupProgressIndicators();
    }
    
    /**
     * Setup form animations
     */
    setupFormAnimations() {
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        formInputs.forEach(input => {
            const label = input.previousElementSibling;
            
            if (label && label.classList.contains('form-label')) {
                // Floating label effect
                const handleFocus = () => {
                    label.style.transform = 'translateY(-20px) scale(0.85)';
                    label.style.color = 'var(--accent-color, #FF8E53)';
                    label.style.transition = 'all 0.2s ease';
                };
                
                const handleBlur = () => {
                    if (!input.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = '';
                    }
                };
                
                input.addEventListener('focus', handleFocus);
                input.addEventListener('blur', handleBlur);
                
                // Check initial state
                if (input.value) handleFocus();
            }
            
            // Input validation animation
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    input.style.animation = 'shake 0.5s ease';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                }
            });
        });
        
        // Add shake animation
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(shakeStyle);
    }
    
    /**
     * Setup logo animation
     */
    setupLogoAnimation() {
        const logo = document.querySelector('.logo-text');
        if (!logo) return;
        
        logo.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                logo.style.transform = 'scale(1.1)';
                logo.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    }
    
    /**
     * Setup progress indicators
     */
    setupProgressIndicators() {
        // Reading progress bar (optional)
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }, 16));
    }
    
    /**
     * Setup background animations
     */
    setupBackgroundAnimations() {
        if (this.isReducedMotion) return;
        
        // Floating particles for hero section (subtle)
        this.createFloatingParticles();
        
        // Gradient animation for backgrounds
        this.animateGradients();
    }
    
    /**
     * Create floating particles
     */
    createFloatingParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 107, 107, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 8}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            
            hero.appendChild(particle);
        }
        
        // Add floating animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) rotate(0deg);
                }
                33% {
                    transform: translateY(-20px) translateX(10px) rotate(120deg);
                }
                66% {
                    transform: translateY(10px) translateX(-10px) rotate(240deg);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    /**
     * Animate gradients
     */
    animateGradients() {
        const gradientElements = document.querySelectorAll('.hero, .mission');
        
        gradientElements.forEach(element => {
            element.style.backgroundSize = '200% 200%';
            element.style.animation = 'gradientShift 10s ease infinite';
        });
        
        const gradientStyle = document.createElement('style');
        gradientStyle.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(gradientStyle);
    }
    
    /**
     * Fallback for browsers without Intersection Observer
     */
    fallbackScrollAnimations() {
        let ticking = false;
        
        const checkElements = () => {
            const elements = document.querySelectorAll('.step-card, .benefit-card, .differentiator-item');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - 100 && !element.classList.contains('animate')) {
                    this.animateElement(element);
                }
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(checkElements);
                ticking = true;
            }
        });
        
        // Check initially
        checkElements();
    }
    
    /**
     * Utility: Throttle function
     */
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
    
    /**
     * Clean up animations
     */
    destroy() {
        this.activeAnimations.clear();
        this.scrollTriggers.clear();
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.lifePaletteAnimations = new LifePaletteAnimations();
});

// Handle reduced motion changes
window.matchMedia('(prefers-reduced-motion: reduce)').addListener((mq) => {
    if (window.lifePaletteAnimations) {
        window.lifePaletteAnimations.isReducedMotion = mq.matches;
        if (mq.matches) {
            console.log('Reduced motion enabled - animations limited');
        }
    }
});