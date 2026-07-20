// ==========================================
// GENIUS GEMS & JEWELLERY - PRODUCT DETAIL JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
});

function initProductDetail() {
    // Parse URL parameter
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        showProductNotFoundError();
        return;
    }

    const product = getProductById(productId);

    if (!product) {
        showProductNotFoundError();
        return;
    }

    // Populate Page Elements
    const pageTitle = document.getElementById('product-banner-title');
    const breadcrumbActive = document.getElementById('breadcrumb-active');
    const titleEl = document.getElementById('product-detail-title');
    const catEl = document.getElementById('product-detail-category');
    const priceEl = document.getElementById('product-detail-price');
    const descEl = document.getElementById('product-detail-description');
    const mainImg = document.getElementById('main-product-image');
    const thumbnailGrid = document.getElementById('thumbnail-grid-inner');
    const specTableBody = document.getElementById('spec-table-body');
    const whatsappBtn = document.getElementById('whatsapp-enquire-btn');
    const wishlistBtn = document.getElementById('detail-wishlist-btn');

    // Title & Breadcrumbs
    document.title = `${product.name} | Genius Gems & Jewellery`;
    if (pageTitle) pageTitle.textContent = product.name;
    if (breadcrumbActive) breadcrumbActive.textContent = product.name;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description;
    if (catEl) catEl.textContent = product.category.toUpperCase().replace('-', ' ');
    if (priceEl) priceEl.textContent = `₹${product.price.toLocaleString('en-IN')}`;

    // Gallery Set Up
    if (product.images && product.images.length > 0) {
        if (mainImg) mainImg.src = product.images[0];
        if (mainImg) mainImg.alt = product.name;

        // Render thumbnails
        if (thumbnailGrid) {
            thumbnailGrid.innerHTML = '';
            product.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('div');
                thumb.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${imgSrc}" alt="${product.name} Thumbnail ${index + 1}">`;
                thumb.addEventListener('click', () => {
                    // Update active class
                    document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    // Change main image source
                    if (mainImg) mainImg.src = imgSrc;
                });
                thumbnailGrid.appendChild(thumb);
            });
        }
    }

    // Setup Interactive Image Zoom
    const imgContainer = document.getElementById('main-image-container');
    if (imgContainer && mainImg) {
        imgContainer.addEventListener('mousemove', (e) => {
            const rect = imgContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside container
            const y = e.clientY - rect.top;  // y position inside container
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            mainImg.style.transform = 'scale(2)';
        });

        imgContainer.addEventListener('mouseleave', () => {
            mainImg.style.transformOrigin = 'center center';
            mainImg.style.transform = 'scale(1)';
        });
    }

    // Populate Specifications Table
    if (specTableBody) {
        specTableBody.innerHTML = '';
        
        // Add default specifications
        const defaultSpecs = {
            "Weight": product.weight,
            "Purity Details": product.purity,
            "Category": product.category.charAt(0).toUpperCase() + product.category.slice(1),
            "Metal Purity": product.metal,
            "Stone Preference": product.gemstone
        };

        // Combine default and custom specs
        const allSpecs = { ...defaultSpecs, ...product.specs };

        for (const [key, value] of Object.entries(allSpecs)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${key}</td>
                <td>${value}</td>
            `;
            specTableBody.appendChild(row);
        }
    }

    // WhatsApp Link Generation
    // Carat Selector and Price Dynamic Update
    const caratSelect = document.getElementById('product-carat-select');
    const defaultCarat = 5;
    
    const updatePriceAndDetails = (carat) => {
        const calculatedPrice = getPriceForCarat(product, carat);
        if (priceEl) priceEl.textContent = `₹${calculatedPrice.toLocaleString('en-IN')}`;
        
        // Update WhatsApp Link
        if (whatsappBtn) {
            const phone = "919785925876";
            const pageUrl = window.location.href;
            const text = `Hello Genius Gems & Jewellery, I would like to reserve this gemstone:\n\n*Product Name*: ${product.name}\n*Product ID*: ${product.id}\n*Weight*: ${carat} Carats\n*Price*: ₹${calculatedPrice.toLocaleString('en-IN')}\n\nLink: ${pageUrl}`;
            const encodedText = encodeURIComponent(text);
            whatsappBtn.href = `https://wa.me/${phone}?text=${encodedText}`;
        }
    };

    // Initialize with default Carat weight (5 Ct)
    if (caratSelect) {
        caratSelect.value = defaultCarat.toString();
        updatePriceAndDetails(defaultCarat);
        
        // Listen for change
        caratSelect.addEventListener('change', () => {
            const carat = parseInt(caratSelect.value) || defaultCarat;
            updatePriceAndDetails(carat);
        });
    } else {
        updatePriceAndDetails(defaultCarat);
    }

    // Add to Cart & Checkout Button Handler
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedCarat = caratSelect ? parseInt(caratSelect.value) : defaultCarat;
            
            // Update custom cart structure
            let cart = JSON.parse(localStorage.getItem('genius_gems_cart') || '[]');
            cart = cart.filter(item => item.id !== product.id);
            cart.push({ id: product.id, carat: selectedCarat });
            localStorage.setItem('genius_gems_cart', JSON.stringify(cart));
            
            // Maintain backwards compatibility with legacy wishlist
            let wishlist = JSON.parse(localStorage.getItem('genius_gems_wishlist') || '[]');
            if (!wishlist.includes(product.id)) {
                wishlist.push(product.id);
                localStorage.setItem('genius_gems_wishlist', JSON.stringify(wishlist));
            }
            
            if (typeof updateWishlistBadge === 'function') {
                updateWishlistBadge();
            }

            showToast("Gemstone added to cart. Redirecting to Checkout...");
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 800);
        });
    }

    // Wishlist Button Handler
    if (wishlistBtn) {
        const updateWishlistBtnIcon = (inList) => {
            const icon = wishlistBtn.querySelector('i');
            if (inList) {
                wishlistBtn.classList.add('active');
                icon.className = 'fas fa-heart';
            } else {
                wishlistBtn.classList.remove('active');
                icon.className = 'far fa-heart';
            }
        };

        let wishlist = getWishlist();
        updateWishlistBtnIcon(wishlist.includes(product.id));

        wishlistBtn.addEventListener('click', () => {
            const added = toggleWishlist(product.id);
            updateWishlistBtnIcon(added);
        });
    }

    // Load Related Products
    renderRelatedProducts(product.id);
}

function showProductNotFoundError() {
    const container = document.getElementById('product-detail-container');
    if (container) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: span 2; padding: 100px 0;">
                <i class="far fa-frown" style="font-size: 4rem; color: var(--gold); margin-bottom: 20px;"></i>
                <h2>Masterpiece Not Found</h2>
                <p>The design you are looking for does not exist in our catalog or might have been sold out.</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 25px;">Back to Collections</a>
            </div>
        `;
    }
}

function renderRelatedProducts(currentId) {
    const grid = document.getElementById('related-grid-inner');
    if (!grid) return;

    const related = getRelatedProducts(currentId, 4);

    if (related.length === 0) {
        // Fallback: If no items in same category, load top featured items
        const featured = getFeaturedProducts();
        renderList(featured.filter(p => p.id !== currentId).slice(0, 4));
    } else {
        renderList(related);
    }

    function renderList(list) {
        grid.innerHTML = '';
        const wishlist = getWishlist();

        list.forEach(p => {
            const isWishlisted = wishlist.includes(p.id);
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-card-img-wrapper">
                    <img src="${p.images[0]}" alt="${p.name}" class="product-card-img" loading="lazy">
                    <div class="product-card-overlay">
                        <div class="product-action-btn ${isWishlisted ? 'active' : ''}" 
                             title="Add to Wishlist" 
                             onclick="event.stopPropagation(); window.toggleWishlist('${p.id}'); this.classList.toggle('active'); const i = this.querySelector('i'); i.className = i.className.includes('far') ? 'fas fa-heart' : 'far fa-heart'">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </div>
                        <div class="product-action-btn" title="View Details" onclick="window.location.href='product.html?id=${p.id}'">
                            <i class="fas fa-eye"></i>
                        </div>
                    </div>
                </div>
                <div class="product-card-info" onclick="window.location.href='product.html?id=${p.id}'" style="cursor: pointer;">
                    <div>
                        <p class="product-card-category">${p.category.toUpperCase().replace('-', ' ')}</p>
                        <h3 class="product-card-title">${p.name}</h3>
                    </div>
                    <p class="product-card-price">₹${p.price.toLocaleString('en-IN')}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}
