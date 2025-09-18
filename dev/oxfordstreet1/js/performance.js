/**
 * Oxford Street Development Corporation - Performance Optimization JavaScript
 * Handles performance optimizations, lazy loading, and user experience enhancements
 */

(function() {
    'use strict';

    // Configuration
    const PERF_CONFIG = {
        lazyLoadOffset: '50px',
        imageOptimization: true,
        prefetchDelay: 1000,
        debounceDelay: 300,
        throttleDelay: 16, // ~60fps
        cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours
        criticalResourcePriority: ['css', 'fonts', 'scripts'],
        performanceThresholds: {
            lcp: 2500, // Largest Contentful Paint
            fid: 100,  // First Input Delay
            cls: 0.1   // Cumulative Layout Shift
        }
    };

    // Performance state
    const perfState = {
        isOnline: navigator.onLine,
        connectionType: getConnectionType(),
        deviceMemory: navigator.deviceMemory || 4,
        isSlowDevice: isSlowDevice(),
        metrics: {
            navigationStart: performance.timeOrigin,
            loadStart: null,
            loadEnd: null,
            resourceTimings: []
        },
        intersectionObserver: null,
        lazyImages: new WeakSet(),
        prefetchQueue: [],
        cache: new Map()
    };

    /**
     * Initialize performance optimizations
     */
    function initPerformanceOptimizations() {
        setupIntersectionObserver();
        setupLazyLoading();
        setupImageOptimization();
        setupResourcePrefetching();
        setupPerformanceMonitoring();
        setupNetworkOptimizations();
        setupCacheOptimizations();
        setupScrollOptimizations();
        setupCriticalResourceLoading();
        
        // Monitor performance metrics
        monitorWebVitals();
        
        console.log('Performance optimizations initialized');
    }

    /**
     * Intersection Observer setup for lazy loading
     */
    function setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            perfState.intersectionObserver = new IntersectionObserver(
                handleIntersection,
                {
                    rootMargin: PERF_CONFIG.lazyLoadOffset,
                    threshold: 0.1
                }
            );
        }
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.tagName === 'IMG') {
                    loadImage(target);
                } else if (target.dataset.src) {
                    loadLazyContent(target);
                }
                
                perfState.intersectionObserver.unobserve(target);
            }
        });
    }

    /**
     * Lazy loading implementation
     */
    function setupLazyLoading() {
        // Lazy load images
        const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
        lazyImages.forEach(img => {
            if (perfState.intersectionObserver) {
                perfState.intersectionObserver.observe(img);
            } else {
                // Fallback for browsers without IntersectionObserver
                loadImage(img);
            }
        });

        // Lazy load other content
        const lazyContent = document.querySelectorAll('[data-lazy]');
        lazyContent.forEach(element => {
            if (perfState.intersectionObserver) {
                perfState.intersectionObserver.observe(element);
            }
        });

        // Background image lazy loading
        setupBackgroundImageLazyLoading();
    }

    function loadImage(img) {
        if (perfState.lazyImages.has(img)) return;
        
        perfState.lazyImages.add(img);
        
        // Handle responsive images
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        if (img.dataset.src) {
            // Add loading indicator
            img.classList.add('loading');
            
            // Create new image to preload
            const newImg = new Image();
            
            newImg.onload = () => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('loading');
                img.classList.add('loaded');
                
                // Trigger any dependent animations
                triggerImageLoadAnimations(img);
            };
            
            newImg.onerror = () => {
                img.classList.remove('loading');
                img.classList.add('error');
                
                // Use fallback image if available
                const fallback = img.dataset.fallback;
                if (fallback) {
                    img.src = fallback;
                }
            };
            
            newImg.src = img.dataset.src;
        }
    }

    function setupBackgroundImageLazyLoading() {
        const bgImages = document.querySelectorAll('[data-bg-src]');
        
        bgImages.forEach(element => {
            if (perfState.intersectionObserver) {
                perfState.intersectionObserver.observe(element);
            }
        });
    }

    function loadLazyContent(element) {
        if (element.dataset.bgSrc) {
            // Background image
            element.style.backgroundImage = `url(${element.dataset.bgSrc})`;
            element.removeAttribute('data-bg-src');
            element.classList.add('bg-loaded');
        }
        
        if (element.dataset.src) {
            // Generic content loading
            loadContent(element, element.dataset.src);
        }
    }

    /**
     * Image optimization
     */
    function setupImageOptimization() {
        if (!PERF_CONFIG.imageOptimization) return;
        
        // Optimize images based on device capabilities
        optimizeImagesByDevice();
        
        // Add WebP support detection
        detectWebPSupport();
        
        // Implement adaptive image loading
        setupAdaptiveImageLoading();
    }

    function optimizeImagesByDevice() {
        const images = document.querySelectorAll('img');
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        images.forEach(img => {
            // Adjust image quality based on connection and device
            if (perfState.connectionType === 'slow-2g' || perfState.connectionType === '2g') {
                // Use lower quality images for slow connections
                const src = img.src || img.dataset.src;
                if (src && src.includes('.jpg')) {
                    const lowQualitySrc = src.replace('.jpg', '_low.jpg');
                    if (img.dataset.src) {
                        img.dataset.src = lowQualitySrc;
                    } else {
                        img.src = lowQualitySrc;
                    }
                }
            }
            
            // Optimize for high DPI displays
            if (devicePixelRatio > 1 && !img.srcset) {
                const src = img.src || img.dataset.src;
                if (src) {
                    const highDPISrc = src.replace(/(\.[^.]+)$/, `@2x$1`);
                    const srcset = `${src} 1x, ${highDPISrc} 2x`;
                    
                    if (img.dataset.src) {
                        img.dataset.srcset = srcset;
                    } else {
                        img.srcset = srcset;
                    }
                }
            }
        });
    }

    function detectWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            const isSupported = webP.height === 2;
            
            if (isSupported) {
                document.documentElement.classList.add('webp-support');
                
                // Replace image sources with WebP versions
                const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"]');
                images.forEach(img => {
                    const src = img.src;
                    const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp');
                    
                    // Check if WebP version exists (simplified check)
                    const testImg = new Image();
                    testImg.onload = () => {
                        img.src = webpSrc;
                    };
                    testImg.src = webpSrc;
                });
            }
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    function setupAdaptiveImageLoading() {
        // Load different image sizes based on viewport
        const adaptiveImages = document.querySelectorAll('img[data-adaptive]');
        
        adaptiveImages.forEach(img => {
            updateImageForViewport(img);
        });
        
        // Update on resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                adaptiveImages.forEach(updateImageForViewport);
            }, PERF_CONFIG.debounceDelay);
        });
    }

    function updateImageForViewport(img) {
        const viewportWidth = window.innerWidth;
        let appropriateSize;
        
        if (viewportWidth < 768) {
            appropriateSize = 'small';
        } else if (viewportWidth < 1200) {
            appropriateSize = 'medium';
        } else {
            appropriateSize = 'large';
        }
        
        const baseSrc = img.dataset.baseSrc || img.src;
        const newSrc = baseSrc.replace(/\.(jpg|png|webp)$/i, `_${appropriateSize}.$1`);
        
        if (img.src !== newSrc) {
            img.src = newSrc;
        }
    }

    /**
     * Resource prefetching
     */
    function setupResourcePrefetching() {
        // Prefetch likely next pages
        setTimeout(() => {
            prefetchLikelyPages();
        }, PERF_CONFIG.prefetchDelay);
        
        // Prefetch resources on hover
        setupHoverPrefetching();
        
        // Preload critical resources
        preloadCriticalResources();
    }

    function prefetchLikelyPages() {
        const currentPage = getCurrentPageName();
        const likelyPages = getLikelyNextPages(currentPage);
        
        likelyPages.forEach(page => {
            prefetchResource(page, 'document');
        });
    }

    function getLikelyNextPages(currentPage) {
        const pageFlow = {
            'index': ['visit.html', 'shops.html'],
            'visit': ['shops.html', 'news.html'],
            'shops': ['visit.html', 'index.html'],
            'news': ['about.html', 'index.html'],
            'about': ['governance.html', 'news.html'],
            'governance': ['planning.html', 'about.html'],
            'planning': ['governance.html', 'about.html']
        };
        
        return pageFlow[currentPage] || [];
    }

    function setupHoverPrefetching() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            let hoverTimeout;
            
            link.addEventListener('mouseenter', () => {
                hoverTimeout = setTimeout(() => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                        prefetchResource(href, 'document');
                    }
                }, 100); // Short delay to avoid prefetching on quick mouse movements
            });
            
            link.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
            });
        });
    }

    function preloadCriticalResources() {
        const criticalResources = [
            { href: 'css/main.css', as: 'style' },
            { href: 'css/components.css', as: 'style' },
            { href: 'css/accessibility.css', as: 'style' },
            { href: 'js/main.js', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = () => {
                    link.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }

    function prefetchResource(url, type = 'fetch') {
        if (perfState.prefetchQueue.includes(url)) return;
        
        perfState.prefetchQueue.push(url);
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        
        if (type === 'document') {
            link.as = 'document';
        }
        
        document.head.appendChild(link);
    }

    /**
     * Performance monitoring
     */
    function setupPerformanceMonitoring() {
        // Monitor resource loading
        if ('PerformanceObserver' in window) {
            setupPerformanceObserver();
        }
        
        // Monitor network status
        setupNetworkMonitoring();
        
        // Monitor memory usage
        setupMemoryMonitoring();
        
        // Track user interactions
        setupInteractionTracking();
    }

    function setupPerformanceObserver() {
        try {
            // Monitor navigation timing
            const navObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        perfState.metrics.loadStart = entry.loadEventStart;
                        perfState.metrics.loadEnd = entry.loadEventEnd;
                        
                        // Log performance metrics
                        logPerformanceMetrics(entry);
                    }
                });
            });
            navObserver.observe({ entryTypes: ['navigation'] });
            
            // Monitor resource timing
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    perfState.metrics.resourceTimings.push({
                        name: entry.name,
                        duration: entry.duration,
                        size: entry.transferSize
                    });
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
            
        } catch (error) {
            console.warn('PerformanceObserver not supported:', error);
        }
    }

    function setupNetworkMonitoring() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            perfState.isOnline = true;
            handleNetworkStatusChange('online');
        });
        
        window.addEventListener('offline', () => {
            perfState.isOnline = false;
            handleNetworkStatusChange('offline');
        });
        
        // Monitor connection changes
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                perfState.connectionType = getConnectionType();
                handleConnectionChange();
            });
        }
    }

    function setupMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                
                if (usage > 85) {
                    optimizeMemoryUsage();
                }
            }, 30000); // Check every 30 seconds
        }
    }

    function setupInteractionTracking() {
        // Track First Input Delay
        if ('PerformanceEventTiming' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.processingStart && entry.startTime) {
                        const fid = entry.processingStart - entry.startTime;
                        logWebVital('FID', fid);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    /**
     * Network optimizations
     */
    function setupNetworkOptimizations() {
        // Implement request batching
        setupRequestBatching();
        
        // Optimize for slow connections
        if (perfState.connectionType === 'slow-2g' || perfState.connectionType === '2g') {
            enableSlowConnectionOptimizations();
        }
        
        // Service worker registration (if available)
        if ('serviceWorker' in navigator) {
            registerServiceWorker();
        }
    }

    function setupRequestBatching() {
        const requestQueue = [];
        let batchTimeout;
        
        window.batchRequest = function(url, options = {}) {
            return new Promise((resolve, reject) => {
                requestQueue.push({ url, options, resolve, reject });
                
                clearTimeout(batchTimeout);
                batchTimeout = setTimeout(() => {
                    processBatchedRequests();
                }, 50);
            });
        };
    }

    function processBatchedRequests() {
        // Implementation would batch similar requests
        // For now, process them individually
        perfState.requestQueue.forEach(({ url, options, resolve, reject }) => {
            fetch(url, options)
                .then(resolve)
                .catch(reject);
        });
        
        perfState.requestQueue = [];
    }

    function enableSlowConnectionOptimizations() {
        // Disable non-critical animations
        document.body.classList.add('slow-connection');
        
        // Reduce image quality
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.lowQuality) {
                img.src = img.dataset.lowQuality;
            }
        });
        
        // Disable autoplay videos
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
            video.removeAttribute('autoplay');
            video.preload = 'none';
        });
    }

    function registerServiceWorker() {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.warn('Service Worker registration failed:', error);
            });
    }

    /**
     * Cache optimizations
     */
    function setupCacheOptimizations() {
        // Implement memory cache for API responses
        window.cacheGet = function(key) {
            const cached = perfState.cache.get(key);
            if (cached && Date.now() - cached.timestamp < PERF_CONFIG.cacheExpiry) {
                return cached.data;
            }
            return null;
        };
        
        window.cacheSet = function(key, data) {
            perfState.cache.set(key, {
                data,
                timestamp: Date.now()
            });
        };
        
        // Clean up expired cache entries
        setInterval(() => {
            cleanupCache();
        }, 60000); // Every minute
    }

    function cleanupCache() {
        const now = Date.now();
        for (const [key, value] of perfState.cache.entries()) {
            if (now - value.timestamp > PERF_CONFIG.cacheExpiry) {
                perfState.cache.delete(key);
            }
        }
    }

    /**
     * Scroll optimizations
     */
    function setupScrollOptimizations() {
        let scrollTimeout;
        let isScrolling = false;
        
        // Throttled scroll handler
        const handleScroll = throttle(() => {
            updateScrollDependentElements();
        }, PERF_CONFIG.throttleDelay);
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                document.body.classList.add('scrolling');
            }
            
            handleScroll();
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                document.body.classList.remove('scrolling');
            }, 150);
        }, { passive: true });
    }

    function updateScrollDependentElements() {
        // Update header appearance
        const header = document.querySelector('.site-header');
        if (header) {
            const scrolled = window.pageYOffset > 50;
            header.classList.toggle('scrolled', scrolled);
        }
        
        // Update progress indicators
        updateReadingProgress();
    }

    function updateReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / docHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    /**
     * Critical resource loading
     */
    function setupCriticalResourceLoading() {
        // Prioritize critical resources
        const criticalResources = document.querySelectorAll('link[rel="stylesheet"], script[src]');
        
        criticalResources.forEach((resource, index) => {
            // Add fetch priority for modern browsers
            if ('fetchPriority' in resource) {
                resource.fetchPriority = index < 3 ? 'high' : 'low';
            }
        });
        
        // Defer non-critical JavaScript
        const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
        nonCriticalScripts.forEach(script => {
            script.defer = true;
        });
    }

    /**
     * Web Vitals monitoring
     */
    function monitorWebVitals() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    logWebVital('LCP', lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (error) {
                console.warn('LCP observer not supported:', error);
            }
        }
        
        // Cumulative Layout Shift
        if ('PerformanceObserver' in window) {
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    logWebVital('CLS', clsValue);
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (error) {
                console.warn('CLS observer not supported:', error);
            }
        }
    }

    /**
     * Utility functions
     */
    function getConnectionType() {
        if ('connection' in navigator) {
            return navigator.connection.effectiveType || 'unknown';
        }
        return 'unknown';
    }

    function isSlowDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return memory < 2 || cores < 4;
    }

    function getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }

    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay);
            }
        };
    }

    function debounce(func, delay) {
        let timeoutId;
        
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function loadContent(element, url) {
        // Generic content loader
        return fetch(url)
            .then(response => response.text())
            .then(content => {
                element.innerHTML = content;
                element.classList.add('content-loaded');
            })
            .catch(error => {
                console.warn('Failed to load content:', error);
                element.classList.add('content-error');
            });
    }

    function triggerImageLoadAnimations(img) {
        // Trigger any animations that depend on image loading
        const event = new CustomEvent('imageLoaded', {
            detail: { image: img },
            bubbles: true
        });
        img.dispatchEvent(event);
    }

    function handleNetworkStatusChange(status) {
        document.body.classList.toggle('offline', status === 'offline');
        
        if (status === 'online') {
            // Resume deferred operations
            resumeDeferredOperations();
        }
    }

    function handleConnectionChange() {
        if (perfState.connectionType === 'slow-2g' || perfState.connectionType === '2g') {
            enableSlowConnectionOptimizations();
        } else {
            document.body.classList.remove('slow-connection');
        }
    }

    function optimizeMemoryUsage() {
        // Clear caches
        perfState.cache.clear();
        
        // Remove unused event listeners
        // Implementation would depend on specific needs
        
        console.log('Memory optimization performed');
    }

    function resumeDeferredOperations() {
        // Resume operations that were deferred while offline
        console.log('Resuming deferred operations');
    }

    function logPerformanceMetrics(navigationEntry) {
        const metrics = {
            pageLoadTime: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            firstByte: navigationEntry.responseStart - navigationEntry.requestStart,
            domInteractive: navigationEntry.domInteractive - navigationEntry.navigationStart
        };
        
        console.log('Performance Metrics:', metrics);
        
        // Check against thresholds
        Object.entries(metrics).forEach(([metric, value]) => {
            const threshold = PERF_CONFIG.performanceThresholds[metric];
            if (threshold && value > threshold) {
                console.warn(`Performance threshold exceeded for ${metric}: ${value}ms (threshold: ${threshold}ms)`);
            }
        });
    }

    function logWebVital(name, value) {
        console.log(`Web Vital - ${name}:`, value);
        
        // Check against thresholds
        const threshold = PERF_CONFIG.performanceThresholds[name.toLowerCase()];
        if (threshold && value > threshold) {
            console.warn(`Web Vital threshold exceeded for ${name}: ${value} (threshold: ${threshold})`);
        }
        
        // Could send to analytics service
        if (window.gtag) {
            gtag('event', name, {
                event_category: 'Web Vitals',
                value: Math.round(value),
                non_interaction: true
            });
        }
    }

    // Public API
    window.PERF = {
        prefetchResource,
        cacheGet: window.cacheGet,
        cacheSet: window.cacheSet,
        loadContent,
        state: perfState,
        config: PERF_CONFIG
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    } else {
        initPerformanceOptimizations();
    }

})();