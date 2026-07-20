// ==========================================
// GENIUS GEMS & JEWELLERY - MAIN JS
// ==========================================

// --- BACKEND DATABASE CONFIGURATION ---
// Paste your Google Sheet published Web App URL below to use Google Sheets as database.
// Leave as "YOUR_GOOGLE_SCRIPT_WEB_APP_URL" to use Hostinger PHP MySQL by default.
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL"; 

const getApiUrl = (endpoint) => {
    if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_WEB_APP_URL" && GOOGLE_SCRIPT_URL.trim() !== "") {
        return GOOGLE_SCRIPT_URL.trim();
    }
    return `https://geniusgemsandjewellery.in/api/${endpoint}`;
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Header and Footer
    renderGlobalHeader();
    renderGlobalFooter();

    // 2. Initialize Navigation Interactions
    initNavigation();

    // 3. Initialize Global State (Wishlist & Cart)
    initGlobalState();

    // 4. Initialize Newsletter Submit
    initNewsletter();

    // 5. Scroll Animations Trigger (Intersection Observer)
    initScrollAnimations();
});

/* ==========================================
   GLOBAL HEADER & FOOTER GENERATION
   ========================================== */
function renderGlobalHeader() {
    const headerEl = document.getElementById('global-header');
    if (!headerEl) return;

    // Get current filename to highlight active link
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    headerEl.innerHTML = `
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="logo">
                    <img src="assets/images/logo.png" alt="Genius Gems & Jewellery Logo" class="logo-img" style="height: 48px; width: 48px; object-fit: contain; border-radius: var(--radius-sm);">
                    <div class="logo-text">
                        <h1 style="font-size: 1.5rem;">GENIUS</h1>
                        <span>Gems & Jewellery</span>
                    </div>
                </a>

                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link ${page === 'index.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="shop.html" class="nav-link ${page === 'shop.html' ? 'active' : ''}">Shop Collections</a></li>
                    <li><a href="custom.html" class="nav-link ${page === 'custom.html' ? 'active' : ''}">Bespoke Design</a></li>
                    <li><a href="about.html" class="nav-link ${page === 'about.html' ? 'active' : ''}">Our Story</a></li>
                    <li><a href="contact.html" class="nav-link ${page === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
                </ul>

                <div class="nav-icons">
                    <a href="shop.html?wishlist=true" class="nav-icon" id="wishlist-trigger" title="Wishlist">
                        <i class="far fa-heart"></i>
                        <span class="icon-badge" id="wishlist-count">0</span>
                    </a>
                    <a href="checkout.html" class="nav-icon" title="Checkout / Enquiry List">
                        <i class="fas fa-shopping-bag"></i>
                    </a>
                    <a href="https://wa.me/919785925876" target="_blank" class="nav-icon" title="Enquire on WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <div class="burger">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </div>
            </nav>
        </div>
    `;
}

function renderGlobalFooter() {
    const footerEl = document.getElementById('global-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col footer-about">
                    <div class="logo" style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <img src="assets/images/logo.png" alt="Genius Gems & Jewellery Logo" class="logo-img" style="height: 45px; width: 45px; object-fit: contain; border-radius: var(--radius-sm);">
                        <div class="logo-text">
                            <h1 style="color: var(--white); font-size: 1.3rem; margin: 0; line-height: 1;">GENIUS</h1>
                            <span style="color: var(--gold); font-size: 0.6rem; letter-spacing: 0.2em; display: block; margin-top: 3px;">Gems & Jewellery</span>
                        </div>
                    </div>
                    <p>Genius Gems & Jewellery craft timeless masterworks that celebrate life's most precious chapters. Each piece represents an artistic merger of traditional artistry, premium purity, and elegant modern luxury.</p>
                    <div class="footer-socials">
                        <a href="#" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-icon" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                        <a href="https://wa.me/919785925876" target="_blank" class="social-icon" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>

                <div class="footer-col footer-links">
                    <h3>Gemstones</h3>
                    <ul>
                        <li><a href="shop.html?category=sapphires">Blue Sapphires</a></li>
                        <li><a href="shop.html?category=emeralds">Green Emeralds</a></li>
                        <li><a href="shop.html?category=rubies">Burmese Rubies</a></li>
                        <li><a href="shop.html?category=yellow-sapphires">Yellow Sapphires</a></li>
                        <li><a href="shop.html?category=diamonds">Certified Diamonds</a></li>
                    </ul>
                </div>


                <div class="footer-col footer-links">
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="about.html">About Our Heritage</a></li>
                        <li><a href="custom.html">Bespoke Gemstone Design</a></li>
                        <li><a href="contact.html">Jaipur Showroom</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="contact.html">Book Appointment</a></li>
                    </ul>
                </div>

                <div class="footer-col footer-contact">
                    <h3>The Atelier</h3>
                    <ul>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>G36 Stock Exchange,<br>Gaurav Tower, Malviya Nagar,<br>Jaipur - 302017</span>
                        </li>
                        <li>
                            <i class="fas fa-phone-alt"></i>
                            <span>+91 97859 25876</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>geniusgemsandjewellery@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Genius Gems and Jewellery. All Rights Reserved. Crafted for Elegance.</p>
                <div class="footer-payments">
                    <i class="fab fa-cc-visa" title="Visa"></i>
                    <i class="fab fa-cc-mastercard" title="Mastercard"></i>
                    <i class="fab fa-cc-amex" title="American Express"></i>
                    <i class="fas fa-money-check-alt" title="Bank Transfer / UPI"></i>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================
   NAVIGATION INTERACTIONS
   ========================================== */
function initNavigation() {
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Scroll Effect
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Keep scrolled style on pages that aren't the home page banner (which needs a transparent header over the hero banner)
            const path = window.location.pathname;
            const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
            
            if (page !== 'index.html') {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };

    // Run once on load
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Mobile Navigation Toggle
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burger.classList.toggle('toggle');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

/* ==========================================
   WISHLIST STATE MANAGEMENT
   ========================================== */
function initGlobalState() {
    updateWishlistCount();
}

function updateWishlistCount() {
    const countEl = document.getElementById('wishlist-count');
    if (!countEl) return;
    
    const wishlist = getWishlist();
    countEl.textContent = wishlist.length;
}

function getWishlist() {
    try {
        const stored = localStorage.getItem('genius_wishlist');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showToast("Added to your Wishlist!");
    } else {
        wishlist.splice(index, 1);
        showToast("Removed from your Wishlist.");
    }
    
    localStorage.setItem('genius_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Dispatch custom event for shop page/product details to update icons live
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { id: productId, list: wishlist } }));
    return index === -1; // returns true if added, false if removed
}

/* ==========================================
   NEWSLETTER SUBSCRIPTION
   ========================================== */
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        if (input && input.value.trim() !== '') {
            showToast("Thank you! You are now subscribed to our newsletter.");
            input.value = '';
        }
    });
}

/* ==========================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Apply observers to standard elements
    const elementsToReveal = document.querySelectorAll('.feature-card, .product-card, .category-card, .section-title, .story-img-container, .story-content');
    
    // Add default CSS styles for anim elements
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Custom CSS style for revealed elements
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

/* ==========================================
   GLOBAL UTILITIES
   ========================================== */
function showToast(message) {
    // Create toast container if not exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background-color: var(--burgundy);
        color: var(--white);
        padding: 15px 30px;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--gold);
        font-family: var(--font-sans);
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    toast.innerHTML = `<i class="fas fa-check-circle text-gold"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Global hook for product interactions
window.toggleWishlist = toggleWishlist;
window.getWishlist = getWishlist;
window.showToast = showToast;
