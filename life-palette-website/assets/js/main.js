// Life Palette - Main JavaScript File
// Modern ES6+ JavaScript with accessibility and performance focus

'use strict';

/**
 * Life Palette Website Main Controller
 * Handles all interactive functionality and user experience enhancements
 */
class LifePaletteApp {
    constructor() {
        this.isLoaded = false;
        this.mobileMenuOpen = false;
        this.scrollPosition = 0;
        this.isScrolling = false;
        
        // Bind methods to maintain context
        this.handleScroll = this.throttle(this.handleScroll.bind(this), 16); // ~60fps
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupApp());
            } else {
                this.setupApp();
            }
        } catch (error) {
            console.error('Failed to initialize Life Palette app:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Setup all app functionality
     */
    setupApp() {
        try {
            this.setupNavigation();
            this.setupFormHandling();
            this.setupScrollEffects();
            this.setupLazyLoading();
            this.setupIntersectionObserver();
            this.setupKeyboardNavigation();
            this.setupPerformanceOptimizations();
            
            // Mark as loaded
            this.isLoaded = true;
            document.body.classList.add('app-loaded');
            
            console.log('Life Palette website initialized successfully');
        } catch (error) {
            console.error('Error during app setup:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Setup navigation functionality
     */
    setupNavigation() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a, .cta-button');
        
        if (mobileToggle && navMenu) {
            // Mobile menu toggle
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.mobileMenuOpen && 
                    !mobileToggle.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileMenuOpen) {
                    this.closeMobileMenu();
                    mobileToggle.focus();
                }
            });
        }
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    this.smoothScrollTo(targetId);
                    
                    // Close mobile menu if open
                    if (this.mobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                });
            }
        });
        
        // Header scroll behavior
        this.setupHeaderScroll();
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileToggle || !navMenu) return;
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        // Update ARIA attributes
        mobileToggle.setAttribute('aria-expanded', this.mobileMenuOpen.toString());
        mobileToggle.classList.toggle('active', this.mobileMenuOpen);
        navMenu.classList.toggle('mobile-open', this.mobileMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
        
        // Focus management
        if (this.mobileMenuOpen) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }
    }
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        if (!this.mobileMenuOpen) return;
        
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        this.mobileMenuOpen = false;
        
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.classList.remove('active');
        }
        
        if (navMenu) {
            navMenu.classList.remove('mobile-open');
        }
        
        document.body.style.overflow = '';
    }
    
    /**
     * Setup header scroll behavior
     */
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', this.handleScroll);
    }
    
    /**
     * Handle scroll events
     */
    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                // Add/remove scrolled class
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide/show header on scroll direction
                if (currentScroll > this.scrollPosition && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            this.scrollPosition = currentScroll;
            this.isScrolling = false;
        });
    }
    
    /**
     * Setup form handling
     */
    setupFormHandling() {
        const form = document.querySelector('.application-form');
        if (!form) return;
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
        
        // Phone number formatting
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', this.formatPhoneNumber);
        }
    }
    
    /**
     * Handle form submission
     */
    async handleFormSubmission(form) {
        const submitButton = form.querySelector('.submit-button');
        
        try {
            // Validate form
            if (!this.validateForm(form)) {
                return;
            }
            
            // Show loading state
            this.setButtonLoading(submitButton, true);
            
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Handle checkbox arrays
            const interests = formData.getAll('interest[]');
            data.interests = interests;
            
            // Simulate API call (replace with actual endpoint)
            await this.submitFormData(data);
            
            // Show success message
            this.showFormSuccess(form);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, 'submission', '죄송합니다. 잠시 후 다시 시도해주세요.');
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }
    
    /**
     * Validate entire form
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Validate individual field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = '필수 입력 항목입니다.';
        }
        
        // Specific field validations
        if (value && isValid) {
            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = '이름은 2글자 이상 입력해주세요.';
                    }
                    break;
                    
                case 'phone':
                    const phoneRegex = /^010-\d{4}-\d{4}$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = '010-0000-0000 형식으로 입력해주세요.';
                    }
                    break;
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    /**
     * Show field error
     */
    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.setAttribute('aria-describedby', errorElement.id || 'field-error-' + field.name);
    }
    
    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    /**
     * Format phone number input
     */
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('010')) {
            value = value.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
        }
        
        e.target.value = value;
    }
    
    /**
     * Submit form data to server
     */
    async submitFormData(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log data (replace with actual API call)
        console.log('Form submission data:', data);
        
        // For demonstration - always succeed
        // In real implementation, make actual API call
        return { success: true };
    }
    
    /**
     * Show form success state
     */
    showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.setAttribute('role', 'alert');
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>신청이 완료되었습니다!</h3>
            <p>영업시간 내에 담당자가 연락드리겠습니다.</p>
            <button type="button" class="close-success" aria-label="닫기">새로 신청하기</button>
        `;
        
        // Replace form with success message
        form.style.display = 'none';
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Handle close button
        successMessage.querySelector('.close-success').addEventListener('click', () => {
            successMessage.remove();
            form.style.display = 'block';
            form.reset();
            this.clearFormErrors(form);
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.querySelector('.close-success').click();
            }
        }, 10000);
    }
    
    /**
     * Show form error state
     */
    showFormError(form, type, message) {
        // Create error alert
        const errorAlert = document.createElement('div');
        errorAlert.className = 'form-error';
        errorAlert.setAttribute('role', 'alert');
        errorAlert.innerHTML = `
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
            <button type="button" class="close-error" aria-label="닫기">✕</button>
        `;
        
        // Insert at top of form
        form.insertBefore(errorAlert, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorAlert.parentNode) {
                errorAlert.remove();
            }
        }, 5000);
        
        // Handle close button
        errorAlert.querySelector('.close-error').addEventListener('click', () => {
            errorAlert.remove();
        });
    }
    
    /**
     * Clear all form errors
     */
    clearFormErrors(form) {
        const errorElements = form.querySelectorAll('.field-error, .form-error');
        errorElements.forEach(element => element.remove());
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        });
    }
    
    /**
     * Set button loading state
     */
    setButtonLoading(button, loading) {
        if (!button) return;
        
        if (loading) {
            button.disabled = true;
            button.classList.add('loading');
            button.dataset.originalText = button.textContent;
            button.innerHTML = `
                <span class="spinner"></span>
                처리 중...
            `;
        } else {
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = button.dataset.originalText || '상담 신청하기';
        }
    }
    
    /**
     * Setup scroll-based animations and effects
     */
    setupScrollEffects() {
        // Add scroll-to-top button
        this.createScrollToTopButton();
        
        // Setup parallax effects for hero section (optional)
        this.setupParallaxEffects();
    }
    
    /**
     * Create scroll-to-top button
     */
    createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', '맨 위로 이동');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: var(--primary-gradient, linear-gradient(135deg, #FF6B6B, #4ECDC4));
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide on scroll
        window.addEventListener('scroll', this.throttle(() => {
            const shouldShow = window.pageYOffset > 300;
            scrollButton.style.opacity = shouldShow ? '1' : '0';
            scrollButton.style.visibility = shouldShow ? 'visible' : 'hidden';
        }, 100));
        
        // Click handler
        scrollButton.addEventListener('click', () => {
            this.smoothScrollTo('hero');
        });
    }
    
    /**
     * Setup subtle parallax effects
     */
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16));
    }
    
    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        // In a real implementation, this would handle actual images
        // Currently we have placeholders, so we'll set up the infrastructure
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            // Observe all image placeholders
            const imagePlaceholders = document.querySelectorAll('.image-placeholder, .hero-image-placeholder');
            imagePlaceholders.forEach(placeholder => {
                imageObserver.observe(placeholder);
            });
        }
    }
    
    /**
     * Setup intersection observer for animations
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        // Animate sections as they come into view
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Animate child elements with delay
                    const children = entry.target.querySelectorAll('.step-card, .benefit-card, .differentiator-item, .value-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('slide-up');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        // Observe sections
        const sections = document.querySelectorAll('.services, .benefits, .differentiator, .mission');
        sections.forEach(section => {
            animationObserver.observe(section);
        });
    }
    
    /**
     * Setup keyboard navigation enhancements
     */
    setupKeyboardNavigation() {
        // Focus visible management for modals and overlays
        document.addEventListener('keydown', (e) => {
            // Handle tab key for modal-like overlays
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
        
        // Skip link functionality
        this.createSkipLink();
    }
    
    /**
     * Create skip to main content link
     */
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = '메인 콘텐츠로 바로가기';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--gray-900, #171717);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.2s;
        `;
        
        // Show on focus
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    /**
     * Handle tab navigation for accessibility
     */
    handleTabNavigation(e) {
        // This would be expanded for modal dialogs and other overlay components
        // Currently handling mobile menu focus trap
        if (this.mobileMenuOpen) {
            const navMenu = document.querySelector('.nav-menu');
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup service worker (if needed)
        // this.setupServiceWorker();
        
        // Monitor performance
        this.monitorPerformance();
    }
    
    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        // Preload fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap'
        ];
        
        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
    
    /**
     * Monitor performance metrics
     */
    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }).observe({ entryTypes: ['first-input'] });
        }
        
        // Log load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
    
    /**
     * Smooth scroll to element
     */
    smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 1024 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update any size-dependent calculations
        this.updateResponsiveElements();
    }
    
    /**
     * Update responsive elements on resize
     */
    updateResponsiveElements() {
        // Update any JavaScript-controlled responsive behavior
        // This could include dynamic grid calculations, etc.
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
     * Utility: Debounce function
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    /**
     * Error handling
     */
    handleError(error) {
        console.error('Life Palette App Error:', error);
        
        // In production, you might want to send errors to an error tracking service
        // this.sendErrorToService(error);
    }
}

// Initialize the application
const app = new LifePaletteApp();

// Setup window event listeners
window.addEventListener('resize', app.handleResize.bind(app));
window.addEventListener('orientationchange', app.handleResize.bind(app));

// Export for testing or external access if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifePaletteApp;
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});