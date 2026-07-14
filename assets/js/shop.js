// ==========================================
// GENIUS GEMS & JEWELLERY - SHOP JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initShop();
});

function initShop() {
    const productsGrid = document.getElementById('products-grid-inner');
    const showingCountEl = document.getElementById('showing-count');
    const totalCountEl = document.getElementById('total-count');
    const sortSelect = document.getElementById('sort-select');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const sidebar = document.querySelector('.filter-sidebar');
    const pageTitle = document.getElementById('shop-page-title');
    const breadcrumbActive = document.getElementById('breadcrumb-active');

    // Parse URL query parameters
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const wishlistParam = params.get('wishlist');

    let isWishlistMode = wishlistParam === 'true';

    // UI changes for Wishlist Mode
    if (isWishlistMode) {
        pageTitle.textContent = "My Wishlist";
        breadcrumbActive.textContent = "Wishlist";
        if (sidebar) sidebar.style.display = 'none';
        
        // Adjust grid template columns in stylesheet dynamically for full width shop layout
        const shopLayout = document.querySelector('.shop-layout');
        if (shopLayout) {
            shopLayout.style.gridTemplateColumns = '1fr';
        }
    }

    // Set initial filter checks if category query parameter exists
    if (categoryParam && !isWishlistMode) {
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }

    // Load initial total count
    if (totalCountEl) {
        totalCountEl.textContent = PRODUCTS.length;
    }

    // Function to get active filters
    function getActiveFilters() {
        const activeFilters = {
            categories: [],
            metals: [],
            gemstones: [],
            priceRanges: []
        };

        if (isWishlistMode) return activeFilters; // No filters in wishlist mode

        document.querySelectorAll('input[name="category"]:checked').forEach(cb => {
            activeFilters.categories.push(cb.value);
        });

        document.querySelectorAll('input[name="metal"]:checked').forEach(cb => {
            activeFilters.metals.push(cb.value);
        });

        document.querySelectorAll('input[name="gemstone"]:checked').forEach(cb => {
            activeFilters.gemstones.push(cb.value);
        });

        document.querySelectorAll('input[name="price"]:checked').forEach(cb => {
            activeFilters.priceRanges.push(cb.value);
        });

        return activeFilters;
    }

    // Filter & Sort core logic
    function updateProductsDisplay() {
        let filteredList = [...PRODUCTS];

        if (isWishlistMode) {
            const wishlist = getWishlist();
            filteredList = filteredList.filter(p => wishlist.includes(p.id));
        } else {
            const activeFilters = getActiveFilters();

            // Filter by Category
            if (activeFilters.categories.length > 0) {
                filteredList = filteredList.filter(p => activeFilters.categories.includes(p.category));
            }

            // Filter by Metal Type
            if (activeFilters.metals.length > 0) {
                filteredList = filteredList.filter(p => activeFilters.metals.includes(p.metal));
            }

            // Filter by Gemstone
            if (activeFilters.gemstones.length > 0) {
                filteredList = filteredList.filter(p => activeFilters.gemstones.includes(p.gemstone));
            }

            // Filter by Price Range
            if (activeFilters.priceRanges.length > 0) {
                filteredList = filteredList.filter(p => {
                    return activeFilters.priceRanges.some(range => {
                        if (range === '0-13000') return p.price <= 13000;
                        if (range === '13000-16000') return p.price > 13000 && p.price <= 16000;
                        if (range === '16000-19000') return p.price > 16000 && p.price <= 19000;
                        if (range === '19000-max') return p.price > 19000;
                        return false;
                    });
                });
            }
        }

        // Sort List
        const sortVal = sortSelect ? sortSelect.value : 'featured';
        if (sortVal === 'price-low') {
            filteredList.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'price-high') {
            filteredList.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'rating') {
            filteredList.sort((a, b) => b.rating - a.rating);
        } else {
            // default/featured sort (featured items first)
            filteredList.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        // Render List
        renderProducts(filteredList);

        // Update counts
        if (showingCountEl) {
            showingCountEl.textContent = filteredList.length;
        }
    }

    // Render Cards Function
    function renderProducts(list) {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';

        if (list.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <i class="far fa-sad-tear"></i>
                    <h2>No designs found</h2>
                    <p>${isWishlistMode ? 'Your wishlist is currently empty. Explore our collections and add your favorites!' : 'Try modifying your filters or price selections to view other items.'}</p>
                    ${isWishlistMode ? '<a href="shop.html" class="btn btn-primary" style="margin-top: 20px;">Explore Collections</a>' : ''}
                </div>
            `;
            return;
        }

        const wishlist = getWishlist();

        list.forEach(product => {
            const isWishlisted = wishlist.includes(product.id);
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-id', product.id);
            card.innerHTML = `
                <div class="product-card-img-wrapper">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-card-img" loading="lazy">
                    <div class="product-card-overlay">
                        <div class="product-action-btn toggle-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                             title="Add to Wishlist" 
                             onclick="event.stopPropagation(); handleWishlistClick('${product.id}')">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </div>
                        <div class="product-action-btn" title="View Details" onclick="window.location.href='product.html?id=${product.id}'">
                            <i class="fas fa-eye"></i>
                        </div>
                    </div>
                </div>
                <div class="product-card-info" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
                    <div>
                        <p class="product-card-category">${product.category.toUpperCase().replace('-', ' ')}</p>
                        <h3 class="product-card-title">${product.name}</h3>
                    </div>
                    <p class="product-card-price">₹${product.price.toLocaleString('en-IN')}</p>
                </div>
            `;
            productsGrid.appendChild(card);
        });

        // Trigger Scroll observer to reveal new cards
        window.dispatchEvent(new Event('scroll'));
    }

    // Global listener updates for Wishlist
    window.handleWishlistClick = function(id) {
        const added = toggleWishlist(id);
        const card = document.querySelector(`.product-card[data-id="${id}"]`);
        if (card) {
            const heartBtn = card.querySelector('.toggle-wishlist-btn');
            const heartIcon = heartBtn.querySelector('i');
            if (added) {
                heartBtn.classList.add('active');
                heartIcon.className = 'fas fa-heart';
            } else {
                heartBtn.classList.remove('active');
                heartIcon.className = 'far fa-heart';
                
                // If we are in wishlist mode, remove card from DOM immediately
                if (isWishlistMode) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        updateProductsDisplay();
                    }, 300);
                }
            }
        }
    };

    // Event listeners
    if (sortSelect) {
        sortSelect.addEventListener('change', updateProductsDisplay);
    }

    document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', updateProductsDisplay);
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(input => {
                input.checked = false;
            });
            updateProductsDisplay();
        });
    }

    // Live update if wishlist changes elsewhere (e.g. from global scripts)
    window.addEventListener('wishlistUpdated', (e) => {
        updateProductsDisplay();
    });

    // Run first render
    updateProductsDisplay();
}
