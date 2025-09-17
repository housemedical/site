/**
 * Oxford Street Development Corporation - Main JavaScript
 * Handles core website functionality, navigation, and user interactions
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        },
        animations: {
            duration: 300,
            easing: 'ease-in-out'
        },
        accessibility: {
            focusOutlineColor: '#FFD700',
            minTouchTarget: 44
        }
    };

    // State management
    const state = {
        mobileMenuOpen: false,
        accessibilityPanelOpen: false,
        currentPage: window.location.pathname,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    /**
     * Initialize the application
     */
    function init() {
        initializeNavigation();
        initializeAccessibility();
        initializeAnimations();
        initializePerformanceOptimizations();
        initializeFocusManagement();
        initializeEventListeners();
        
        // Set initial page state
        setActivePage();
        
        // Initialize page-specific functionality
        const page = getCurrentPage();
        if (typeof window[`init${page}Page`] === 'function') {
            window[`init${page}Page`]();
        }
        
        console.log('OSDC Website initialized');
    }

    /**
     * Navigation functionality
     */
    function initializeNavigation() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuToggle && mainNavigation) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            mobileMenuToggle.addEventListener('keydown', handleMobileMenuKeydown);
        }

        // Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', handleDocumentClick);

        // Handle window resize
        window.addEventListener('resize', handleWindowResize);
    }

    function toggleMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        state.mobileMenuOpen = !state.mobileMenuOpen;
        
        mobileMenuToggle.setAttribute('aria-expanded', state.mobileMenuOpen.toString());
        mainNavigation.classList.toggle('open', state.mobileMenuOpen);
        
        // Manage focus
        if (state.mobileMenuOpen) {
            trapFocus(mainNavigation);
            // Focus first nav link
            const firstNavLink = mainNavigation.querySelector('.nav-link');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        } else {
            mobileMenuToggle.focus();
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
    }

    function handleMobileMenuKeydown(event) {
        if (event.key === 'Escape' && state.mobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    function handleNavLinkClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        // Close mobile menu if open
        if (state.mobileMenuOpen) {
            toggleMobileMenu();
        }
        
        // Add smooth scroll for anchor links
        if (href && href.startsWith('#')) {
            event.preventDefault();
            smoothScrollTo(href);
        }
    }

    function handleDocumentClick(event) {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        if (state.mobileMenuOpen && 
            !mainNavigation.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            toggleMobileMenu();
        }
    }

    function handleWindowResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= CONFIG.breakpoints.mobile && state.mobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    /**
     * Accessibility functionality
     */
    function initializeAccessibility() {
        const accessibilityToggle = document.querySelector('.accessibility-toggle');
        const accessibilityPanel = document.querySelector('.accessibility-panel');
        const accessibilityClose = document.querySelector('.accessibility-close');

        if (accessibilityToggle && accessibilityPanel) {
            accessibilityToggle.addEventListener('click', toggleAccessibilityPanel);
            
            if (accessibilityClose) {
                accessibilityClose.addEventListener('click', closeAccessibilityPanel);
            }

            // Handle escape key
            document.addEventListener('keydown', handleAccessibilityKeydown);
        }

        // Initialize accessibility controls
        initializeAccessibilityControls();
    }

    function toggleAccessibilityPanel() {
        const accessibilityToggle = document.querySelector('.accessibility-toggle');
        const accessibilityPanel = document.querySelector('.accessibility-panel');
        
        state.accessibilityPanelOpen = !state.accessibilityPanelOpen;
        
        accessibilityToggle.setAttribute('aria-expanded', state.accessibilityPanelOpen.toString());
        accessibilityPanel.classList.toggle('open', state.accessibilityPanelOpen);
        accessibilityPanel.setAttribute('aria-hidden', (!state.accessibilityPanelOpen).toString());
        
        if (state.accessibilityPanelOpen) {
            trapFocus(accessibilityPanel);
            // Focus close button
            const closeButton = accessibilityPanel.querySelector('.accessibility-close');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }

    function closeAccessibilityPanel() {
        if (state.accessibilityPanelOpen) {
            toggleAccessibilityPanel();
            // Return focus to toggle button
            const accessibilityToggle = document.querySelector('.accessibility-toggle');
            if (accessibilityToggle) {
                accessibilityToggle.focus();
            }
        }
    }

    function handleAccessibilityKeydown(event) {
        if (event.key === 'Escape' && state.accessibilityPanelOpen) {
            closeAccessibilityPanel();
        }
    }

    function initializeAccessibilityControls() {
        // Font size controls
        const fontDecrease = document.querySelector('.font-decrease');
        const fontIncrease = document.querySelector('.font-increase');
        const fontReset = document.querySelector('.font-reset');

        if (fontDecrease) fontDecrease.addEventListener('click', () => adjustFontSize('decrease'));
        if (fontIncrease) fontIncrease.addEventListener('click', () => adjustFontSize('increase'));
        if (fontReset) fontReset.addEventListener('click', () => adjustFontSize('reset'));

        // High contrast toggle
        const highContrastToggle = document.getElementById('high-contrast');
        if (highContrastToggle) {
            highContrastToggle.addEventListener('change', toggleHighContrast);
            // Load saved preference
            const savedHighContrast = localStorage.getItem('osdc-high-contrast');
            if (savedHighContrast === 'true') {
                highContrastToggle.checked = true;
                document.body.classList.add('high-contrast');
            }
        }

        // Increased spacing toggle
        const increasedSpacingToggle = document.getElementById('increased-spacing');
        if (increasedSpacingToggle) {
            increasedSpacingToggle.addEventListener('change', toggleIncreasedSpacing);
            // Load saved preference
            const savedSpacing = localStorage.getItem('osdc-increased-spacing');
            if (savedSpacing === 'true') {
                increasedSpacingToggle.checked = true;
                document.body.classList.add('increased-spacing');
            }
        }

        // Reduced motion toggle
        const reduceMotionToggle = document.getElementById('reduce-motion');
        if (reduceMotionToggle) {
            reduceMotionToggle.addEventListener('change', toggleReducedMotion);
            // Set based on system preference or saved preference
            const savedMotion = localStorage.getItem('osdc-reduce-motion');
            const systemReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (savedMotion === 'true' || (savedMotion === null && systemReducedMotion)) {
                reduceMotionToggle.checked = true;
                document.body.classList.add('reduce-motion');
                state.reducedMotion = true;
            }
        }

        // Load saved font size
        const savedFontSize = localStorage.getItem('osdc-font-size');
        if (savedFontSize) {
            document.body.className = document.body.className.replace(/font-size-\w+/g, '');
            document.body.classList.add(savedFontSize);
        }
    }

    function adjustFontSize(action) {
        const currentSize = getCurrentFontSize();
        let newSize;

        switch (action) {
            case 'decrease':
                newSize = currentSize === 'font-size-large' ? 'font-size-normal' :
                         currentSize === 'font-size-x-large' ? 'font-size-large' :
                         currentSize === 'font-size-normal' ? 'font-size-small' : 'font-size-small';
                break;
            case 'increase':
                newSize = currentSize === 'font-size-small' ? 'font-size-normal' :
                         currentSize === 'font-size-normal' ? 'font-size-large' :
                         currentSize === 'font-size-large' ? 'font-size-x-large' : 'font-size-x-large';
                break;
            case 'reset':
            default:
                newSize = 'font-size-normal';
                break;
        }

        // Remove all font size classes
        document.body.className = document.body.className.replace(/font-size-\w+/g, '');
        document.body.classList.add(newSize);
        
        // Save preference
        localStorage.setItem('osdc-font-size', newSize);
        
        // Announce change to screen readers
        announceToScreenReader(`Font size ${action === 'reset' ? 'reset to normal' : action + 'd'}`);
    }

    function getCurrentFontSize() {
        const classes = document.body.classList;
        if (classes.contains('font-size-small')) return 'font-size-small';
        if (classes.contains('font-size-large')) return 'font-size-large';
        if (classes.contains('font-size-x-large')) return 'font-size-x-large';
        return 'font-size-normal';
    }

    function toggleHighContrast(event) {
        const isEnabled = event.target.checked;
        document.body.classList.toggle('high-contrast', isEnabled);
        localStorage.setItem('osdc-high-contrast', isEnabled.toString());
        announceToScreenReader(`High contrast mode ${isEnabled ? 'enabled' : 'disabled'}`);
    }

    function toggleIncreasedSpacing(event) {
        const isEnabled = event.target.checked;
        document.body.classList.toggle('increased-spacing', isEnabled);
        localStorage.setItem('osdc-increased-spacing', isEnabled.toString());
        announceToScreenReader(`Increased spacing ${isEnabled ? 'enabled' : 'disabled'}`);
    }

    function toggleReducedMotion(event) {
        const isEnabled = event.target.checked;
        document.body.classList.toggle('reduce-motion', isEnabled);
        localStorage.setItem('osdc-reduce-motion', isEnabled.toString());
        state.reducedMotion = isEnabled;
        announceToScreenReader(`Reduced motion ${isEnabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Animation and interaction enhancements
     */
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window && !state.reducedMotion) {
            initializeScrollAnimations();
        }

        // Initialize counter animations
        initializeCounterAnimations();
        
        // Initialize hover effects
        initializeHoverEffects();
    }

    function initializeScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.story-card, .link-card, .info-card, .event-card, .accessibility-feature'
        );
        
        animatedElements.forEach(el => {
            if (!el.classList.contains('fade-in')) {
                observer.observe(el);
            }
        });
    }

    function initializeCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = state.reducedMotion ? 0 : 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const current = target * easedProgress;
            element.textContent = target % 1 === 0 ? 
                Math.floor(current).toString() : 
                current.toFixed(1);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toString();
            }
        }

        if (duration > 0) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toString();
        }
    }

    function initializeHoverEffects() {
        // Enhanced hover effects for cards
        const cards = document.querySelectorAll('.card, .story-card, .link-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });
    }

    function handleCardHover(event) {
        if (!state.reducedMotion) {
            event.currentTarget.style.transform = 'translateY(-4px)';
        }
    }

    function handleCardLeave(event) {
        if (!state.reducedMotion) {
            event.currentTarget.style.transform = '';
        }
    }

    /**
     * Performance optimizations
     */
    function initializePerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            initializeLazyLoading();
        }

        // Preload critical resources
        preloadCriticalResources();
        
        // Optimize scroll performance
        optimizeScrollPerformance();
    }

    function initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle responsive images
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    function preloadCriticalResources() {
        // Preload next likely page
        const currentPage = getCurrentPage();
        let nextPage = null;
        
        switch (currentPage) {
            case 'Home':
                nextPage = 'visit.html';
                break;
            case 'Visit':
                nextPage = 'shops.html';
                break;
        }
        
        if (nextPage) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = nextPage;
            document.head.appendChild(link);
        }
    }

    function optimizeScrollPerformance() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // Debounce scroll events
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Handle scroll-dependent functionality
                updateScrollPosition();
            }, 10);
        }, { passive: true });
    }

    function updateScrollPosition() {
        // Update header appearance based on scroll position
        const header = document.querySelector('.site-header');
        if (header) {
            const scrolled = window.pageYOffset > 50;
            header.classList.toggle('scrolled', scrolled);
        }
    }

    /**
     * Focus management
     */
    function initializeFocusManagement() {
        // Enhanced focus indicators
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', handleSkipLinkClick);
        }
    }

    function handleKeyboardNavigation(event) {
        // Show focus indicators on keyboard navigation
        document.body.classList.add('keyboard-navigation');
        
        // Remove on mouse interaction
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        }, { once: true });
    }

    function handleSkipLinkClick(event) {
        event.preventDefault();
        const target = document.querySelector(event.target.getAttribute('href'));
        if (target) {
            target.focus();
            target.scrollIntoView({ behavior: state.reducedMotion ? 'auto' : 'smooth' });
        }
    }

    function trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                } else if (!event.shiftKey && document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    /**
     * Utility functions
     */
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: state.reducedMotion ? 'auto' : 'smooth'
            });
        }
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        switch (filename) {
            case '':
            case 'index.html':
                return 'Home';
            case 'visit.html':
                return 'Visit';
            case 'shops.html':
                return 'Shops';
            case 'news.html':
                return 'News';
            case 'about.html':
                return 'About';
            case 'governance.html':
                return 'Governance';
            case 'planning.html':
                return 'Planning';
            default:
                return 'Home';
        }
    }

    function setActivePage() {
        const currentPage = getCurrentPage().toLowerCase();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = (currentPage === 'home' && (href === 'index.html' || href === '/')) ||
                            href.includes(currentPage);
            
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('search-status') || 
                          document.querySelector('[aria-live]') ||
                          createLiveRegion();
        
        liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }

    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'live-region';
        document.body.appendChild(liveRegion);
        return liveRegion;
    }

    function initializeEventListeners() {
        // Global error handling
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        
        // Performance monitoring
        if ('performance' in window && 'measure' in window.performance) {
            window.addEventListener('load', measurePerformance);
        }
    }

    function handleGlobalError(event) {
        console.error('Global error:', event.error);
        // Could send to analytics or error tracking service
    }

    function handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        event.preventDefault(); // Prevent default browser behavior
    }

    function measurePerformance() {
        // Measure key performance metrics
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Performance metrics:', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
                });
            }
        }, 0);
    }

    // Public API
    window.OSDC = {
        init,
        smoothScrollTo,
        announceToScreenReader,
        getCurrentPage,
        state
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();