/**
 * Oxford Street Development Corporation - Accessibility JavaScript
 * Enhanced accessibility features and WCAG 2.2 AA compliance functionality
 */

(function() {
    'use strict';

    // Configuration
    const A11Y_CONFIG = {
        focusOutlineColor: '#FFD700',
        minimumTouchTarget: 44,
        animationDuration: 300,
        keyboardNavigationDelay: 100
    };

    // State
    const a11yState = {
        keyboardNavigation: false,
        focusTrapActive: false,
        currentFocusTrap: null,
        announcements: [],
        preferences: {
            highContrast: false,
            increasedSpacing: false,
            reduceMotion: false,
            fontSize: 'normal'
        }
    };

    /**
     * Initialize accessibility enhancements
     */
    function initAccessibility() {
        setupKeyboardNavigation();
        setupFocusManagement();
        setupScreenReaderSupport();
        setupAccessibilityPreferences();
        setupTouchTargetOptimization();
        setupColorContrastEnhancements();
        setupMotionPreferences();
        setupErrorHandling();
        
        // Load saved preferences
        loadAccessibilityPreferences();
        
        console.log('Accessibility enhancements initialized');
    }

    /**
     * Keyboard navigation enhancements
     */
    function setupKeyboardNavigation() {
        let keyboardTimeout;

        // Detect keyboard navigation
        document.addEventListener('keydown', (event) => {
            // Clear any existing timeout
            clearTimeout(keyboardTimeout);
            
            // Set keyboard navigation flag
            if (!a11yState.keyboardNavigation) {
                a11yState.keyboardNavigation = true;
                document.body.classList.add('keyboard-navigation');
                announceToScreenReader('Keyboard navigation activated');
            }

            // Handle specific key combinations
            handleKeyboardShortcuts(event);
            
            // Reset keyboard flag after delay
            keyboardTimeout = setTimeout(() => {
                a11yState.keyboardNavigation = false;
                document.body.classList.remove('keyboard-navigation');
            }, A11Y_CONFIG.keyboardNavigationDelay);
        });

        // Mouse/touch interaction removes keyboard indicators
        ['mousedown', 'touchstart'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                clearTimeout(keyboardTimeout);
                a11yState.keyboardNavigation = false;
                document.body.classList.remove('keyboard-navigation');
            });
        });

        // Enhanced tab navigation
        setupTabNavigation();
    }

    function handleKeyboardShortcuts(event) {
        // Alt + A: Open accessibility panel
        if (event.altKey && event.key.toLowerCase() === 'a') {
            event.preventDefault();
            toggleAccessibilityPanel();
            return;
        }

        // Escape: Close modals/panels
        if (event.key === 'Escape') {
            closeAccessibleOverlays();
            return;
        }

        // Alt + H: Go to homepage
        if (event.altKey && event.key.toLowerCase() === 'h') {
            event.preventDefault();
            window.location.href = 'index.html';
            return;
        }

        // Alt + S: Focus search (if available)
        if (event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            const searchInput = document.getElementById('shop-search') || document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                announceToScreenReader('Search field focused');
            }
            return;
        }

        // Alt + M: Focus main navigation
        if (event.altKey && event.key.toLowerCase() === 'm') {
            event.preventDefault();
            const mainNav = document.querySelector('.main-navigation a, .nav-link');
            if (mainNav) {
                mainNav.focus();
                announceToScreenReader('Main navigation focused');
            }
            return;
        }
    }

    function setupTabNavigation() {
        // Ensure proper tab order
        const focusableElements = getFocusableElements();
        
        focusableElements.forEach((element, index) => {
            // Add tab index if not present
            if (!element.hasAttribute('tabindex') && element.tabIndex < 0) {
                element.tabIndex = 0;
            }

            // Enhanced focus indicators
            element.addEventListener('focus', handleElementFocus);
            element.addEventListener('blur', handleElementBlur);
        });

        // Skip navigation improvements
        enhanceSkipNavigation();
    }

    function enhanceSkipNavigation() {
        const skipLinks = document.querySelectorAll('.skip-link, .skip-navigation a');
        
        skipLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    // Make target focusable if it isn't already
                    if (target.tabIndex < 0) {
                        target.tabIndex = -1;
                    }
                    
                    // Focus and scroll to target
                    target.focus();
                    target.scrollIntoView({ 
                        behavior: a11yState.preferences.reduceMotion ? 'auto' : 'smooth',
                        block: 'start' 
                    });
                    
                    announceToScreenReader(`Skipped to ${target.tagName.toLowerCase()} ${target.textContent || target.getAttribute('aria-label') || 'content'}`);
                }
            });
        });
    }

    /**
     * Focus management
     */
    function setupFocusManagement() {
        // Focus trap for modals and panels
        setupFocusTraps();
        
        // Focus restoration
        setupFocusRestoration();
        
        // Enhanced focus indicators
        setupFocusIndicators();
    }

    function setupFocusTraps() {
        const trapContainers = document.querySelectorAll('[role="dialog"], .modal, .accessibility-panel');
        
        trapContainers.forEach(container => {
            container.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    handleFocusTrap(event, container);
                }
            });
        });
    }

    function handleFocusTrap(event, container) {
        const focusableElements = getFocusableElements(container);
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    function setupFocusRestoration() {
        let lastActiveElement = null;
        
        // Store focus before opening modals/panels
        document.addEventListener('focusin', (event) => {
            if (!isInModal(event.target) && !isInPanel(event.target)) {
                lastActiveElement = event.target;
            }
        });
        
        // Restore focus when modals/panels close
        const closeButtons = document.querySelectorAll('.modal-close, .accessibility-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {
                    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
                        lastActiveElement.focus();
                    }
                }, 100);
            });
        });
    }

    function setupFocusIndicators() {
        // Enhanced focus styles
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 3px solid ${A11Y_CONFIG.focusOutlineColor} !important;
                outline-offset: 2px !important;
            }
            
            .focus-indicator {
                position: absolute;
                border: 3px solid ${A11Y_CONFIG.focusOutlineColor};
                border-radius: 4px;
                pointer-events: none;
                transition: all 0.2s ease;
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);
    }

    function handleElementFocus(event) {
        const element = event.target;
        
        // Announce focus changes for screen readers
        if (a11yState.keyboardNavigation) {
            const announcement = getElementAnnouncement(element);
            if (announcement) {
                announceToScreenReader(announcement, 'polite');
            }
        }
        
        // Ensure element is visible
        ensureElementVisible(element);
    }

    function handleElementBlur(event) {
        // Remove custom focus indicators if any
        const focusIndicator = document.querySelector('.focus-indicator');
        if (focusIndicator) {
            focusIndicator.remove();
        }
    }

    /**
     * Screen reader support
     */
    function setupScreenReaderSupport() {
        // Create live regions
        createLiveRegions();
        
        // Enhance form labels and descriptions
        enhanceFormAccessibility();
        
        // Improve image accessibility
        enhanceImageAccessibility();
        
        // Add navigation landmarks
        enhanceNavigationLandmarks();
        
        // Status announcements
        setupStatusAnnouncements();
    }

    function createLiveRegions() {
        // Main announcements region
        if (!document.getElementById('a11y-announcements')) {
            const announcementsRegion = document.createElement('div');
            announcementsRegion.id = 'a11y-announcements';
            announcementsRegion.setAttribute('aria-live', 'polite');
            announcementsRegion.setAttribute('aria-atomic', 'true');
            announcementsRegion.className = 'live-region';
            document.body.appendChild(announcementsRegion);
        }
        
        // Status updates region
        if (!document.getElementById('a11y-status')) {
            const statusRegion = document.createElement('div');
            statusRegion.id = 'a11y-status';
            statusRegion.setAttribute('aria-live', 'assertive');
            statusRegion.setAttribute('aria-atomic', 'true');
            statusRegion.className = 'live-region';
            document.body.appendChild(statusRegion);
        }
    }

    function enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Ensure all inputs have labels
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                    const label = form.querySelector(`label[for="${input.id}"]`);
                    if (!label && input.id) {
                        console.warn(`Input with id "${input.id}" missing associated label`);
                    }
                }
                
                // Add required field announcements
                if (input.hasAttribute('required')) {
                    input.setAttribute('aria-required', 'true');
                    
                    // Add visual indicator if missing
                    if (!input.parentNode.querySelector('.required-indicator')) {
                        const indicator = document.createElement('span');
                        indicator.className = 'required-indicator';
                        indicator.setAttribute('aria-hidden', 'true');
                        indicator.textContent = ' *';
                        indicator.style.color = '#dc2626';
                        
                        const label = form.querySelector(`label[for="${input.id}"]`);
                        if (label) {
                            label.appendChild(indicator);
                        }
                    }
                }
                
                // Error state handling
                input.addEventListener('invalid', handleInputError);
                input.addEventListener('input', clearInputError);
            });
            
            // Form submission feedback
            form.addEventListener('submit', handleFormSubmission);
        });
    }

    function enhanceImageAccessibility() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Check for missing alt text
            if (!img.hasAttribute('alt')) {
                console.warn('Image missing alt attribute:', img.src);
                img.setAttribute('alt', '');
            }
            
            // Decorative images
            if (img.alt === '' || img.hasAttribute('aria-hidden')) {
                img.setAttribute('role', 'presentation');
            }
            
            // Loading state announcement
            if (img.loading === 'lazy') {
                img.addEventListener('load', () => {
                    if (img.alt && img.alt.trim() !== '') {
                        announceToScreenReader(`Image loaded: ${img.alt}`, 'polite');
                    }
                });
            }
        });
    }

    function enhanceNavigationLandmarks() {
        // Ensure proper landmarks
        const main = document.querySelector('main');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }
        
        const nav = document.querySelector('nav');
        if (nav && !nav.getAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }
        
        const header = document.querySelector('header');
        if (header && !header.getAttribute('role')) {
            header.setAttribute('role', 'banner');
        }
        
        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }
        
        // Add navigation labels
        const navs = document.querySelectorAll('nav');
        navs.forEach((nav, index) => {
            if (!nav.getAttribute('aria-label') && !nav.getAttribute('aria-labelledby')) {
                const label = nav.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || 
                             (index === 0 ? 'Main navigation' : `Navigation ${index + 1}`);
                nav.setAttribute('aria-label', label);
            }
        });
    }

    function setupStatusAnnouncements() {
        // Page load announcement
        window.addEventListener('load', () => {
            const pageTitle = document.title;
            announceToScreenReader(`Page loaded: ${pageTitle}`, 'polite');
        });
        
        // Route change announcements (for SPA behavior)
        let lastURL = window.location.href;
        const checkURL = () => {
            if (window.location.href !== lastURL) {
                lastURL = window.location.href;
                const pageTitle = document.title;
                announceToScreenReader(`Navigated to: ${pageTitle}`, 'assertive');
            }
        };
        
        // Check for URL changes
        setInterval(checkURL, 1000);
    }

    /**
     * Accessibility preferences
     */
    function setupAccessibilityPreferences() {
        // Font size controls
        setupFontSizeControls();
        
        // High contrast mode
        setupHighContrastMode();
        
        // Increased spacing
        setupIncreasedSpacing();
        
        // Reduced motion
        setupReducedMotion();
        
        // Preference persistence
        setupPreferencePersistence();
    }

    function setupFontSizeControls() {
        const decreaseBtn = document.querySelector('.font-decrease');
        const increaseBtn = document.querySelector('.font-increase');
        const resetBtn = document.querySelector('.font-reset');
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => adjustFontSize('decrease'));
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => adjustFontSize('increase'));
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => adjustFontSize('reset'));
        }
    }

    function adjustFontSize(direction) {
        const currentSize = getCurrentFontSize();
        let newSize;
        
        switch (direction) {
            case 'decrease':
                newSize = currentSize === 'large' ? 'normal' :
                         currentSize === 'x-large' ? 'large' : 'small';
                break;
            case 'increase':
                newSize = currentSize === 'small' ? 'normal' :
                         currentSize === 'normal' ? 'large' : 'x-large';
                break;
            case 'reset':
            default:
                newSize = 'normal';
                break;
        }
        
        setFontSize(newSize);
        a11yState.preferences.fontSize = newSize;
        saveAccessibilityPreferences();
        
        announceToScreenReader(`Font size ${direction === 'reset' ? 'reset to normal' : direction + 'd'}`, 'assertive');
    }

    function getCurrentFontSize() {
        if (document.body.classList.contains('font-size-small')) return 'small';
        if (document.body.classList.contains('font-size-large')) return 'large';
        if (document.body.classList.contains('font-size-x-large')) return 'x-large';
        return 'normal';
    }

    function setFontSize(size) {
        // Remove existing font size classes
        document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-x-large');
        
        if (size !== 'normal') {
            document.body.classList.add(`font-size-${size}`);
        }
    }

    function setupHighContrastMode() {
        const toggle = document.getElementById('high-contrast');
        
        if (toggle) {
            toggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                document.body.classList.toggle('high-contrast', enabled);
                a11yState.preferences.highContrast = enabled;
                saveAccessibilityPreferences();
                
                announceToScreenReader(`High contrast mode ${enabled ? 'enabled' : 'disabled'}`, 'assertive');
            });
        }
        
        // System preference detection
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        if (prefersHighContrast && !localStorage.getItem('osdc-high-contrast')) {
            document.body.classList.add('high-contrast');
            if (toggle) toggle.checked = true;
            a11yState.preferences.highContrast = true;
        }
    }

    function setupIncreasedSpacing() {
        const toggle = document.getElementById('increased-spacing');
        
        if (toggle) {
            toggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                document.body.classList.toggle('increased-spacing', enabled);
                a11yState.preferences.increasedSpacing = enabled;
                saveAccessibilityPreferences();
                
                announceToScreenReader(`Increased spacing ${enabled ? 'enabled' : 'disabled'}`, 'assertive');
            });
        }
    }

    function setupReducedMotion() {
        const toggle = document.getElementById('reduce-motion');
        
        if (toggle) {
            toggle.addEventListener('change', (event) => {
                const enabled = event.target.checked;
                document.body.classList.toggle('reduce-motion', enabled);
                a11yState.preferences.reduceMotion = enabled;
                saveAccessibilityPreferences();
                
                announceToScreenReader(`Reduced motion ${enabled ? 'enabled' : 'disabled'}`, 'assertive');
            });
        }
        
        // System preference detection
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion && !localStorage.getItem('osdc-reduce-motion')) {
            document.body.classList.add('reduce-motion');
            if (toggle) toggle.checked = true;
            a11yState.preferences.reduceMotion = true;
        }
    }

    function setupPreferencePersistence() {
        // Load preferences on page load
        window.addEventListener('load', loadAccessibilityPreferences);
        
        // Save preferences before page unload
        window.addEventListener('beforeunload', saveAccessibilityPreferences);
    }

    /**
     * Touch target optimization
     */
    function setupTouchTargetOptimization() {
        const interactiveElements = document.querySelectorAll(
            'button, a, input, select, textarea, [role="button"], [tabindex="0"]'
        );
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            if (rect.width < A11Y_CONFIG.minimumTouchTarget || rect.height < A11Y_CONFIG.minimumTouchTarget) {
                // Add padding to meet minimum touch target size
                const currentPadding = parseInt(getComputedStyle(element).padding) || 0;
                const neededPadding = Math.max(0, (A11Y_CONFIG.minimumTouchTarget - Math.min(rect.width, rect.height)) / 2);
                
                if (neededPadding > currentPadding) {
                    element.style.padding = `${neededPadding}px`;
                }
            }
        });
    }

    /**
     * Color contrast enhancements
     */
    function setupColorContrastEnhancements() {
        // Check for insufficient color contrast
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, label, span');
        
        textElements.forEach(element => {
            if (!hasGoodContrast(element)) {
                console.warn('Potential color contrast issue:', element);
            }
        });
    }

    /**
     * Motion preferences
     */
    function setupMotionPreferences() {
        // Respect system motion preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleMotionPreference(e) {
            if (e.matches) {
                document.body.classList.add('reduce-motion');
                a11yState.preferences.reduceMotion = true;
            }
        }
        
        mediaQuery.addListener(handleMotionPreference);
        handleMotionPreference(mediaQuery);
    }

    /**
     * Error handling
     */
    function setupErrorHandling() {
        // Form validation errors
        document.addEventListener('invalid', (event) => {
            handleInputError(event);
        }, true);
        
        // Global error announcements
        window.addEventListener('error', (event) => {
            announceToScreenReader('An error occurred. Please try again or contact support.', 'assertive');
        });
    }

    function handleInputError(event) {
        const input = event.target;
        const errorMessage = input.validationMessage || 'This field is invalid';
        
        // Create or update error message
        let errorElement = document.getElementById(`${input.id}-error`);
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = `${input.id}-error`;
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        
        errorElement.textContent = errorMessage;
        input.setAttribute('aria-describedby', errorElement.id);
        input.classList.add('form-error');
        
        // Announce error
        announceToScreenReader(`Error: ${errorMessage}`, 'assertive');
    }

    function clearInputError(event) {
        const input = event.target;
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (errorElement && input.validity.valid) {
            errorElement.remove();
            input.removeAttribute('aria-describedby');
            input.classList.remove('form-error');
        }
    }

    function handleFormSubmission(event) {
        const form = event.target;
        const isValid = form.checkValidity();
        
        if (isValid) {
            announceToScreenReader('Form submitted successfully', 'assertive');
        } else {
            announceToScreenReader('Form contains errors. Please review and correct.', 'assertive');
            
            // Focus first invalid field
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    }

    /**
     * Utility functions
     */
    function getFocusableElements(container = document) {
        return Array.from(container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable="true"]'
        )).filter(element => {
            return element.offsetWidth > 0 && element.offsetHeight > 0;
        });
    }

    function isInModal(element) {
        return element.closest('.modal, [role="dialog"]') !== null;
    }

    function isInPanel(element) {
        return element.closest('.accessibility-panel, [role="region"]') !== null;
    }

    function getElementAnnouncement(element) {
        const tagName = element.tagName.toLowerCase();
        const role = element.getAttribute('role');
        const label = element.getAttribute('aria-label') || 
                     element.getAttribute('aria-labelledby') && 
                     document.getElementById(element.getAttribute('aria-labelledby'))?.textContent ||
                     element.textContent?.trim();
        
        let announcement = '';
        
        if (role) {
            announcement = `${role}${label ? ': ' + label : ''}`;
        } else {
            switch (tagName) {
                case 'button':
                    announcement = `button${label ? ': ' + label : ''}`;
                    break;
                case 'a':
                    announcement = `link${label ? ': ' + label : ''}`;
                    break;
                case 'input':
                    const type = element.type || 'text';
                    announcement = `${type} input${label ? ': ' + label : ''}`;
                    break;
                case 'select':
                    announcement = `select${label ? ': ' + label : ''}`;
                    break;
                default:
                    announcement = label || '';
            }
        }
        
        return announcement;
    }

    function ensureElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.left >= 0 && 
                         rect.bottom <= window.innerHeight && 
                         rect.right <= window.innerWidth;
        
        if (!isVisible) {
            element.scrollIntoView({
                behavior: a11yState.preferences.reduceMotion ? 'auto' : 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }

    function hasGoodContrast(element) {
        // Simplified contrast check - in production, use a proper contrast analyzer
        const style = getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;
        
        // This is a placeholder - implement proper contrast ratio calculation
        return true;
    }

    function announceToScreenReader(message, priority = 'polite') {
        const regionId = priority === 'assertive' ? 'a11y-status' : 'a11y-announcements';
        const region = document.getElementById(regionId);
        
        if (region) {
            // Clear previous announcement
            region.textContent = '';
            
            // Set new announcement after a brief delay
            setTimeout(() => {
                region.textContent = message;
                
                // Clear after announcement
                setTimeout(() => {
                    region.textContent = '';
                }, 1000);
            }, 50);
        }
        
        // Log to console for debugging
        console.log(`A11Y Announcement (${priority}): ${message}`);
    }

    function toggleAccessibilityPanel() {
        const panel = document.querySelector('.accessibility-panel');
        const toggle = document.querySelector('.accessibility-toggle');
        
        if (panel && toggle) {
            const isOpen = panel.classList.contains('open');
            
            if (isOpen) {
                panel.classList.remove('open');
                panel.setAttribute('aria-hidden', 'true');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            } else {
                panel.classList.add('open');
                panel.setAttribute('aria-hidden', 'false');
                toggle.setAttribute('aria-expanded', 'true');
                
                // Focus first control in panel
                const firstControl = panel.querySelector('button, input, select, textarea, [tabindex="0"]');
                if (firstControl) {
                    firstControl.focus();
                }
            }
        }
    }

    function closeAccessibleOverlays() {
        // Close accessibility panel
        const panel = document.querySelector('.accessibility-panel.open');
        if (panel) {
            toggleAccessibilityPanel();
        }
        
        // Close modals
        const modal = document.querySelector('.modal-overlay.open');
        if (modal && typeof closeShopModal === 'function') {
            closeShopModal();
        }
    }

    function saveAccessibilityPreferences() {
        try {
            localStorage.setItem('osdc-a11y-preferences', JSON.stringify(a11yState.preferences));
        } catch (error) {
            console.warn('Could not save accessibility preferences:', error);
        }
    }

    function loadAccessibilityPreferences() {
        try {
            const saved = localStorage.getItem('osdc-a11y-preferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                
                // Apply saved preferences
                if (preferences.fontSize) {
                    setFontSize(preferences.fontSize);
                }
                
                if (preferences.highContrast) {
                    document.body.classList.add('high-contrast');
                    const toggle = document.getElementById('high-contrast');
                    if (toggle) toggle.checked = true;
                }
                
                if (preferences.increasedSpacing) {
                    document.body.classList.add('increased-spacing');
                    const toggle = document.getElementById('increased-spacing');
                    if (toggle) toggle.checked = true;
                }
                
                if (preferences.reduceMotion) {
                    document.body.classList.add('reduce-motion');
                    const toggle = document.getElementById('reduce-motion');
                    if (toggle) toggle.checked = true;
                }
                
                // Update state
                Object.assign(a11yState.preferences, preferences);
            }
        } catch (error) {
            console.warn('Could not load accessibility preferences:', error);
        }
    }

    // Public API
    window.A11Y = {
        announceToScreenReader,
        toggleAccessibilityPanel,
        adjustFontSize,
        getFocusableElements,
        ensureElementVisible,
        state: a11yState
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccessibility);
    } else {
        initAccessibility();
    }

})();