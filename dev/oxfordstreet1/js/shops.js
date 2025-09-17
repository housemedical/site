/**
 * Oxford Street Development Corporation - Shops Directory JavaScript
 * Handles shop directory functionality, search, filters, and modal interactions
 */

(function() {
    'use strict';

    // Shop data structure (in production this would come from an API)
    const SAMPLE_SHOPS = [
        {
            id: 'selfridges',
            name: 'Selfridges',
            category: 'department',
            location: 'oxford-circus',
            address: '400 Oxford Street, London W1A 1AB',
            description: 'Iconic luxury department store offering high-end fashion, beauty, food, and lifestyle products across multiple floors.',
            logo: 'assets/shops/selfridges-logo.jpg',
            website: 'https://www.selfridges.com',
            phone: '+44 800 123 400',
            email: 'info@selfridges.com',
            hours: {
                monday: '10:00 - 21:00',
                tuesday: '10:00 - 21:00',
                wednesday: '10:00 - 21:00',
                thursday: '10:00 - 21:00',
                friday: '10:00 - 21:00',
                saturday: '10:00 - 21:00',
                sunday: '11:30 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'john-lewis',
            name: 'John Lewis & Partners',
            category: 'department',
            location: 'oxford-circus',
            address: '300 Oxford Street, London W1C 1DX',
            description: 'British department store chain known for quality products, excellent customer service, and their "Never Knowingly Undersold" promise.',
            logo: 'assets/shops/john-lewis-logo.jpg',
            website: 'https://www.johnlewis.com',
            phone: '+44 20 7629 7711',
            email: 'contact@johnlewis.com',
            hours: {
                monday: '09:30 - 20:00',
                tuesday: '09:30 - 20:00',
                wednesday: '09:30 - 20:00',
                thursday: '09:30 - 21:00',
                friday: '09:30 - 20:00',
                saturday: '09:30 - 20:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'zara',
            name: 'Zara',
            category: 'fashion',
            location: 'oxford-circus',
            address: '118 Oxford Street, London W1D 1LL',
            description: 'Spanish fast fashion retailer offering trendy clothing, shoes and accessories for men, women and children.',
            logo: 'assets/shops/zara-logo.jpg',
            website: 'https://www.zara.com',
            phone: '+44 20 7534 9500',
            email: 'customer.service@zara.com',
            hours: {
                monday: '10:00 - 21:00',
                tuesday: '10:00 - 21:00',
                wednesday: '10:00 - 21:00',
                thursday: '10:00 - 21:00',
                friday: '10:00 - 21:00',
                saturday: '10:00 - 21:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'hm',
            name: 'H&M',
            category: 'fashion',
            location: 'oxford-circus',
            address: '481 Oxford Street, London W1C 2DB',
            description: 'Swedish multinational clothing-retail company known for fast-fashion clothing for men, women, teenagers and children.',
            logo: 'assets/shops/hm-logo.jpg',
            website: 'https://www2.hm.com',
            phone: '+44 20 7493 4004',
            email: 'customerservice@hm.com',
            hours: {
                monday: '10:00 - 21:00',
                tuesday: '10:00 - 21:00',
                wednesday: '10:00 - 21:00',
                thursday: '10:00 - 21:00',
                friday: '10:00 - 21:00',
                saturday: '10:00 - 20:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'apple-regent-street',
            name: 'Apple Store',
            category: 'electronics',
            location: 'oxford-circus',
            address: '235 Regent Street, London W1B 2EL',
            description: 'Flagship Apple Store featuring the latest Apple products, Genius Bar support, and Today at Apple sessions.',
            logo: 'assets/shops/apple-logo.jpg',
            website: 'https://www.apple.com/uk/retail/regent-street/',
            phone: '+44 20 7153 9000',
            email: 'regentstreet@apple.com',
            hours: {
                monday: '10:00 - 22:00',
                tuesday: '10:00 - 22:00',
                wednesday: '10:00 - 22:00',
                thursday: '10:00 - 22:00',
                friday: '10:00 - 22:00',
                saturday: '10:00 - 22:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'topshop',
            name: 'Topshop',
            category: 'fashion',
            location: 'oxford-circus',
            address: '216 Oxford Street, London W1W 8LG',
            description: 'British fashion retailer specializing in trendy clothing, shoes, make-up and accessories for young women.',
            logo: 'assets/shops/topshop-logo.jpg',
            website: 'https://www.topshop.com',
            phone: '+44 20 7636 7700',
            email: 'help@topshop.com',
            hours: {
                monday: '09:00 - 21:00',
                tuesday: '09:00 - 21:00',
                wednesday: '09:00 - 21:00',
                thursday: '09:00 - 21:00',
                friday: '09:00 - 21:00',
                saturday: '09:00 - 20:00',
                sunday: '11:30 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'nike-town',
            name: 'Nike Town London',
            category: 'sports',
            location: 'oxford-circus',
            address: '236 Oxford Street, London W1C 1DE',
            description: 'Multi-floor Nike flagship store featuring the latest athletic footwear, apparel, and equipment with personalization services.',
            logo: 'assets/shops/nike-logo.jpg',
            website: 'https://www.nike.com/gb/retail/en/niketown-london',
            phone: '+44 20 7612 0800',
            email: 'nikestore.london@nike.com',
            hours: {
                monday: '10:00 - 20:00',
                tuesday: '10:00 - 20:00',
                wednesday: '10:00 - 20:00',
                thursday: '10:00 - 21:00',
                friday: '10:00 - 20:00',
                saturday: '10:00 - 20:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        },
        {
            id: 'sephora',
            name: 'Sephora',
            category: 'beauty',
            location: 'oxford-circus',
            address: '160 Oxford Street, London W1D 1NQ',
            description: 'French multinational chain of personal care and beauty stores featuring cosmetics, skincare, fragrance, and beauty tools.',
            logo: 'assets/shops/sephora-logo.jpg',
            website: 'https://www.sephora.co.uk',
            phone: '+44 20 7434 1500',
            email: 'customercare@sephora.co.uk',
            hours: {
                monday: '10:00 - 20:00',
                tuesday: '10:00 - 20:00',
                wednesday: '10:00 - 20:00',
                thursday: '10:00 - 21:00',
                friday: '10:00 - 20:00',
                saturday: '10:00 - 20:00',
                sunday: '12:00 - 18:00'
            },
            status: 'open'
        }
    ];

    // State management
    let state = {
        shops: [...SAMPLE_SHOPS],
        filteredShops: [...SAMPLE_SHOPS],
        currentPage: 1,
        itemsPerPage: 12,
        searchTerm: '',
        activeFilters: {
            category: '',
            location: ''
        },
        viewMode: 'grid',
        isLoading: false,
        selectedShop: null
    };

    /**
     * Initialize shops page functionality
     */
    function initShopsPage() {
        initializeSearch();
        initializeFilters();
        initializeViewToggle();
        initializeModal();
        initializeCategoryCards();
        
        // Initial render
        renderShops();
        
        console.log('Shops page initialized');
    }

    /**
     * Search functionality
     */
    function initializeSearch() {
        const searchInput = document.getElementById('shop-search');
        const searchForm = document.querySelector('.search-form');

        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (event) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    handleSearch(event.target.value);
                }, 300);
            });

            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSearch(event.target.value);
                }
            });
        }

        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const searchValue = searchInput ? searchInput.value : '';
                handleSearch(searchValue);
            });
        }
    }

    function handleSearch(searchTerm) {
        state.searchTerm = searchTerm.toLowerCase().trim();
        state.currentPage = 1;
        
        filterShops();
        renderShops();
        updateURL();
        
        // Announce to screen readers
        const resultCount = state.filteredShops.length;
        announceToScreenReader(`Search updated. ${resultCount} shops found.`);
    }

    /**
     * Filter functionality
     */
    function initializeFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const locationFilter = document.getElementById('location-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (event) => {
                handleFilterChange('category', event.target.value);
            });
        }

        if (locationFilter) {
            locationFilter.addEventListener('change', (event) => {
                handleFilterChange('location', event.target.value);
            });
        }

        // Load filters from URL
        loadFiltersFromURL();
    }

    function handleFilterChange(filterType, value) {
        state.activeFilters[filterType] = value;
        state.currentPage = 1;
        
        filterShops();
        renderShops();
        updateActiveFilters();
        updateURL();
        
        // Announce to screen readers
        const resultCount = state.filteredShops.length;
        const filterName = filterType.charAt(0).toUpperCase() + filterType.slice(1);
        announceToScreenReader(`${filterName} filter applied. ${resultCount} shops found.`);
    }

    function filterShops() {
        state.isLoading = true;
        showLoadingState();

        // Simulate API delay
        setTimeout(() => {
            state.filteredShops = state.shops.filter(shop => {
                const matchesSearch = !state.searchTerm || 
                    shop.name.toLowerCase().includes(state.searchTerm) ||
                    shop.category.toLowerCase().includes(state.searchTerm) ||
                    shop.description.toLowerCase().includes(state.searchTerm);

                const matchesCategory = !state.activeFilters.category || 
                    shop.category === state.activeFilters.category;

                const matchesLocation = !state.activeFilters.location || 
                    shop.location === state.activeFilters.location;

                return matchesSearch && matchesCategory && matchesLocation;
            });

            state.isLoading = false;
            renderShops();
        }, 300);
    }

    function updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('active-filters');
        if (!activeFiltersContainer) return;

        const hasActiveFilters = Object.values(state.activeFilters).some(filter => filter !== '') || state.searchTerm !== '';
        
        if (!hasActiveFilters) {
            activeFiltersContainer.style.display = 'none';
            return;
        }

        activeFiltersContainer.style.display = 'flex';
        activeFiltersContainer.innerHTML = '';

        // Search term filter
        if (state.searchTerm) {
            const searchTag = createFilterTag('Search', `"${state.searchTerm}"`, () => {
                document.getElementById('shop-search').value = '';
                handleSearch('');
            });
            activeFiltersContainer.appendChild(searchTag);
        }

        // Category filter
        if (state.activeFilters.category) {
            const categoryName = getCategoryName(state.activeFilters.category);
            const categoryTag = createFilterTag('Category', categoryName, () => {
                document.getElementById('category-filter').value = '';
                handleFilterChange('category', '');
            });
            activeFiltersContainer.appendChild(categoryTag);
        }

        // Location filter
        if (state.activeFilters.location) {
            const locationName = getLocationName(state.activeFilters.location);
            const locationTag = createFilterTag('Location', locationName, () => {
                document.getElementById('location-filter').value = '';
                handleFilterChange('location', '');
            });
            activeFiltersContainer.appendChild(locationTag);
        }
    }

    function createFilterTag(type, value, removeCallback) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            ${type}: ${value}
            <button type="button" aria-label="Remove ${type} filter">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;
        
        const removeButton = tag.querySelector('button');
        removeButton.addEventListener('click', removeCallback);
        
        return tag;
    }

    /**
     * View toggle functionality
     */
    function initializeViewToggle() {
        const viewToggles = document.querySelectorAll('.view-toggle');
        
        viewToggles.forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                const view = event.currentTarget.dataset.view;
                handleViewChange(view);
            });
        });
    }

    function handleViewChange(view) {
        state.viewMode = view;
        
        // Update toggle buttons
        const viewToggles = document.querySelectorAll('.view-toggle');
        viewToggles.forEach(toggle => {
            toggle.classList.toggle('active', toggle.dataset.view === view);
        });
        
        if (view === 'map') {
            showMapView();
        } else {
            hideMapView();
            renderShops();
        }
        
        // Update URL
        updateURL();
    }

    /**
     * Render shops functionality
     */
    function renderShops() {
        const shopsGrid = document.getElementById('shops-grid');
        if (!shopsGrid) return;

        if (state.isLoading) {
            showLoadingState();
            return;
        }

        // Calculate pagination
        const totalShops = state.filteredShops.length;
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = Math.min(startIndex + state.itemsPerPage, totalShops);
        const paginatedShops = state.filteredShops.slice(startIndex, endIndex);

        // Update results count
        updateResultsCount(totalShops);

        // Clear current content
        shopsGrid.innerHTML = '';

        if (paginatedShops.length === 0) {
            renderNoResults();
            return;
        }

        // Render shops
        paginatedShops.forEach(shop => {
            const shopCard = createShopCard(shop);
            shopsGrid.appendChild(shopCard);
        });

        // Render pagination
        renderPagination(totalShops);

        // Apply view mode class
        shopsGrid.className = `cards-grid view-${state.viewMode}`;
    }

    function createShopCard(shop) {
        const card = document.createElement('div');
        card.className = 'card shop-card';
        card.setAttribute('data-shop-id', shop.id);
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        
        const currentTime = new Date();
        const isOpen = isShopOpen(shop, currentTime);
        
        card.innerHTML = `
            <div class="card-content">
                <div class="shop-card-header">
                    <img class="shop-card-logo" src="${shop.logo}" alt="${shop.name} logo" width="60" height="60" loading="lazy">
                    <div class="shop-card-info">
                        <h3 class="shop-card-name">${shop.name}</h3>
                        <p class="shop-card-location">
                            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                            ${getLocationName(shop.location)}
                        </p>
                    </div>
                </div>
                
                <div class="card-meta">
                    <span class="card-category">${getCategoryName(shop.category)}</span>
                </div>
                
                <p class="shop-card-description">${shop.description}</p>
                
                <div class="shop-card-footer">
                    <div class="shop-card-hours">
                        <i class="fas fa-clock" aria-hidden="true"></i>
                        ${getCurrentDayHours(shop)}
                    </div>
                    <span class="shop-card-status ${isOpen ? 'open' : 'closed'}">
                        ${isOpen ? 'Open Now' : 'Closed'}
                    </span>
                </div>
            </div>
        `;

        // Add click and keyboard event listeners
        card.addEventListener('click', () => openShopModal(shop));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openShopModal(shop);
            }
        });

        return card;
    }

    function showLoadingState() {
        const shopsGrid = document.getElementById('shops-grid');
        if (!shopsGrid) return;

        shopsGrid.innerHTML = `
            <div class="loading" id="loading-state">
                <div class="spinner"></div>
                <span class="loading-text">Loading shops...</span>
            </div>
        `;
    }

    function renderNoResults() {
        const shopsGrid = document.getElementById('shops-grid');
        if (!shopsGrid) return;

        shopsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" aria-hidden="true"></i>
                <h3>No shops found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <button type="button" class="btn btn-outline" onclick="clearAllFilters()">
                    <span>Clear All Filters</span>
                </button>
            </div>
        `;
    }

    function updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const countSpan = resultsCount.querySelector('.result-count');
            if (countSpan) {
                countSpan.textContent = count.toString();
            }
        }
    }

    /**
     * Pagination functionality
     */
    function renderPagination(totalShops) {
        const paginationNav = document.getElementById('pagination-nav');
        if (!paginationNav) return;

        const totalPages = Math.ceil(totalShops / state.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationNav.style.display = 'none';
            return;
        }

        paginationNav.style.display = 'flex';
        paginationNav.innerHTML = '';

        // Previous button
        const prevButton = createPaginationItem(
            '← Previous',
            state.currentPage > 1 ? state.currentPage - 1 : null,
            state.currentPage <= 1
        );
        paginationNav.appendChild(prevButton);

        // Page numbers
        const startPage = Math.max(1, state.currentPage - 2);
        const endPage = Math.min(totalPages, state.currentPage + 2);

        if (startPage > 1) {
            paginationNav.appendChild(createPaginationItem('1', 1));
            if (startPage > 2) {
                paginationNav.appendChild(createPaginationEllipsis());
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            paginationNav.appendChild(createPaginationItem(
                page.toString(),
                page,
                false,
                page === state.currentPage
            ));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationNav.appendChild(createPaginationEllipsis());
            }
            paginationNav.appendChild(createPaginationItem(totalPages.toString(), totalPages));
        }

        // Next button
        const nextButton = createPaginationItem(
            'Next →',
            state.currentPage < totalPages ? state.currentPage + 1 : null,
            state.currentPage >= totalPages
        );
        paginationNav.appendChild(nextButton);
    }

    function createPaginationItem(text, page, disabled = false, active = false) {
        const item = document.createElement('a');
        item.className = `pagination-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
        item.textContent = text;
        item.href = '#';
        
        if (disabled) {
            item.setAttribute('aria-disabled', 'true');
            item.setAttribute('tabindex', '-1');
        } else {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                if (page && page !== state.currentPage) {
                    goToPage(page);
                }
            });
        }

        if (active) {
            item.setAttribute('aria-current', 'page');
        }

        return item;
    }

    function createPaginationEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        ellipsis.setAttribute('aria-hidden', 'true');
        return ellipsis;
    }

    function goToPage(page) {
        state.currentPage = page;
        renderShops();
        updateURL();
        
        // Scroll to top of results
        const resultsSection = document.querySelector('.shop-results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Modal functionality
     */
    function initializeModal() {
        const modal = document.getElementById('shop-modal');
        const modalClose = modal?.querySelector('.modal-close');
        const modalOverlay = modal;

        if (modalClose) {
            modalClose.addEventListener('click', closeShopModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) {
                    closeShopModal();
                }
            });
        }

        // Handle escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && state.selectedShop) {
                closeShopModal();
            }
        });
    }

    function openShopModal(shop) {
        state.selectedShop = shop;
        const modal = document.getElementById('shop-modal');
        if (!modal) return;

        // Populate modal content
        populateModalContent(shop);
        
        // Show modal
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Announce to screen readers
        announceToScreenReader(`Shop details opened for ${shop.name}`);
    }

    function closeShopModal() {
        const modal = document.getElementById('shop-modal');
        if (!modal) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to the shop card
        if (state.selectedShop) {
            const shopCard = document.querySelector(`[data-shop-id="${state.selectedShop.id}"]`);
            if (shopCard) {
                shopCard.focus();
            }
        }
        
        state.selectedShop = null;
    }

    function populateModalContent(shop) {
        const modal = document.getElementById('shop-modal');
        if (!modal) return;

        // Update modal title and content
        const modalTitle = modal.querySelector('#modal-title');
        const modalShopName = modal.querySelector('#modal-shop-name');
        const modalShopLogo = modal.querySelector('#modal-shop-logo');
        const modalShopCategory = modal.querySelector('#modal-shop-category');
        const modalShopLocation = modal.querySelector('#modal-shop-location span');
        const modalShopDescription = modal.querySelector('#modal-shop-description');
        const modalShopHours = modal.querySelector('#modal-shop-hours');
        const modalShopContact = modal.querySelector('#modal-shop-contact');

        if (modalTitle) modalTitle.textContent = shop.name;
        if (modalShopName) modalShopName.textContent = shop.name;
        if (modalShopLogo) {
            modalShopLogo.src = shop.logo;
            modalShopLogo.alt = `${shop.name} logo`;
        }
        if (modalShopCategory) modalShopCategory.textContent = getCategoryName(shop.category);
        if (modalShopLocation) modalShopLocation.textContent = shop.address;
        if (modalShopDescription) modalShopDescription.textContent = shop.description;

        // Populate hours
        if (modalShopHours && shop.hours) {
            modalShopHours.innerHTML = '';
            Object.entries(shop.hours).forEach(([day, hours]) => {
                const hourRow = document.createElement('div');
                hourRow.innerHTML = `
                    <span>${day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span>${hours}</span>
                `;
                modalShopHours.appendChild(hourRow);
            });
        }

        // Populate contact info
        if (modalShopContact) {
            modalShopContact.innerHTML = `
                ${shop.phone ? `<p><strong>Phone:</strong> <a href="tel:${shop.phone}">${shop.phone}</a></p>` : ''}
                ${shop.email ? `<p><strong>Email:</strong> <a href="mailto:${shop.email}">${shop.email}</a></p>` : ''}
                ${shop.website ? `<p><strong>Website:</strong> <a href="${shop.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>` : ''}
            `;
        }

        // Store shop data for action buttons
        modal.setAttribute('data-shop-website', shop.website || '');
        modal.setAttribute('data-shop-address', shop.address || '');
    }

    /**
     * Category cards functionality
     */
    function initializeCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', (event) => {
                event.preventDefault();
                const category = event.currentTarget.dataset.category;
                if (category) {
                    // Set category filter
                    const categoryFilter = document.getElementById('category-filter');
                    if (categoryFilter) {
                        categoryFilter.value = category;
                        handleFilterChange('category', category);
                    }
                    
                    // Scroll to results
                    const resultsSection = document.querySelector('.shop-results');
                    if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    /**
     * Map view functionality
     */
    function showMapView() {
        const shopsGrid = document.getElementById('shops-grid');
        if (!shopsGrid) return;

        shopsGrid.innerHTML = `
            <div class="map-view">
                <div class="map-container">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt" aria-hidden="true"></i>
                        <h3>Interactive Map View</h3>
                        <p>This would display an interactive map showing all shop locations on Oxford Street.</p>
                        <div class="map-features">
                            <ul>
                                <li><i class="fas fa-location-dot" aria-hidden="true"></i> Shop locations</li>
                                <li><i class="fas fa-route" aria-hidden="true"></i> Walking directions</li>
                                <li><i class="fas fa-subway" aria-hidden="true"></i> Transport links</li>
                                <li><i class="fas fa-parking" aria-hidden="true"></i> Parking areas</li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="openFullMap()">
                            <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                            <span>Open Full Screen Map</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function hideMapView() {
        // Map view is hidden when switching back to grid/list view
        // The renderShops() function will handle the re-rendering
    }

    /**
     * Utility functions
     */
    function getCategoryName(category) {
        const categoryNames = {
            'fashion': 'Fashion & Clothing',
            'luxury': 'Luxury Goods',
            'electronics': 'Electronics',
            'beauty': 'Beauty & Cosmetics',
            'department': 'Department Stores',
            'footwear': 'Footwear',
            'accessories': 'Accessories',
            'sports': 'Sports & Fitness',
            'food': 'Food & Dining',
            'services': 'Services'
        };
        return categoryNames[category] || category;
    }

    function getLocationName(location) {
        const locationNames = {
            'oxford-circus': 'Oxford Circus Area',
            'bond-street': 'Bond Street Area',
            'marble-arch': 'Marble Arch Area',
            'tottenham-court': 'Tottenham Court Road Area'
        };
        return locationNames[location] || location;
    }

    function getCurrentDayHours(shop) {
        if (!shop.hours) return 'Hours not available';
        
        const today = new Date();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = days[today.getDay()];
        
        return shop.hours[dayName] || 'Hours not available';
    }

    function isShopOpen(shop, currentTime = new Date()) {
        if (!shop.hours) return false;
        
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = days[currentTime.getDay()];
        const todayHours = shop.hours[dayName];
        
        if (!todayHours || todayHours.toLowerCase().includes('closed')) {
            return false;
        }
        
        // Parse hours (simplified - assumes format "HH:MM - HH:MM")
        const hoursMatch = todayHours.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
        if (!hoursMatch) return false;
        
        const openHour = parseInt(hoursMatch[1]);
        const openMinute = parseInt(hoursMatch[2]);
        const closeHour = parseInt(hoursMatch[3]);
        const closeMinute = parseInt(hoursMatch[4]);
        
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        
        const currentMinutes = currentHour * 60 + currentMinute;
        const openMinutes = openHour * 60 + openMinute;
        const closeMinutes = closeHour * 60 + closeMinute;
        
        return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    }

    function updateURL() {
        const params = new URLSearchParams();
        
        if (state.searchTerm) params.set('search', state.searchTerm);
        if (state.activeFilters.category) params.set('category', state.activeFilters.category);
        if (state.activeFilters.location) params.set('location', state.activeFilters.location);
        if (state.currentPage > 1) params.set('page', state.currentPage.toString());
        if (state.viewMode !== 'grid') params.set('view', state.viewMode);
        
        const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newURL);
    }

    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        if (params.get('search')) {
            state.searchTerm = params.get('search');
            const searchInput = document.getElementById('shop-search');
            if (searchInput) searchInput.value = state.searchTerm;
        }
        
        if (params.get('category')) {
            state.activeFilters.category = params.get('category');
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) categoryFilter.value = state.activeFilters.category;
        }
        
        if (params.get('location')) {
            state.activeFilters.location = params.get('location');
            const locationFilter = document.getElementById('location-filter');
            if (locationFilter) locationFilter.value = state.activeFilters.location;
        }
        
        if (params.get('page')) {
            state.currentPage = parseInt(params.get('page')) || 1;
        }
        
        if (params.get('view')) {
            state.viewMode = params.get('view');
            handleViewChange(state.viewMode);
        }
        
        // Apply filters
        filterShops();
    }

    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('search-status');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Global functions for button handlers
     */
    window.clearAllFilters = function() {
        // Reset state
        state.searchTerm = '';
        state.activeFilters.category = '';
        state.activeFilters.location = '';
        state.currentPage = 1;
        
        // Reset form elements
        const searchInput = document.getElementById('shop-search');
        const categoryFilter = document.getElementById('category-filter');
        const locationFilter = document.getElementById('location-filter');
        
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (locationFilter) locationFilter.value = '';
        
        // Update display
        filterShops();
        updateActiveFilters();
        updateURL();
        
        announceToScreenReader('All filters cleared');
    };

    window.openDirections = function() {
        if (state.selectedShop && state.selectedShop.address) {
            const address = encodeURIComponent(state.selectedShop.address);
            const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
            window.open(mapsURL, '_blank', 'noopener,noreferrer');
        }
    };

    window.visitWebsite = function() {
        if (state.selectedShop && state.selectedShop.website) {
            window.open(state.selectedShop.website, '_blank', 'noopener,noreferrer');
        }
    };

    window.openMap = function() {
        // This would open an interactive map in a new window/modal
        console.log('Opening interactive map...');
        announceToScreenReader('Interactive map would open in a new window');
    };

    window.openFullMap = function() {
        // This would open a full-screen interactive map
        console.log('Opening full-screen map...');
        announceToScreenReader('Full-screen map would open');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShopsPage);
    } else {
        initShopsPage();
    }

    // Export for main script
    window.initShopsPage = initShopsPage;

})();