// Cart management - Shared across all pages
const CART_KEY = 'vnmk_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadgeGlobal();
}

function removeFromCart(id, category) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.category === category));
    saveCart(cart);
    // Refresh cart UI if on cart page
    if (typeof updateCartUI === 'function') {
        updateCartUI();
        updateTotals(cart);
    }
}

function updateQuantity(id, category, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === id && item.category === category);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
        // Refresh cart UI if on cart page
        if (typeof updateCartUI === 'function') {
            updateCartUI();
            updateTotals(cart);
        }
    }
}

function updateCartBadgeGlobal() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update all cart badges on the page
    const cartBadges = document.querySelectorAll('.cart-badge');
    cartBadges.forEach(badge => {
        badge.textContent = count;
    });
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadgeGlobal);

// Listen for storage changes (when cart is updated in another tab/window)
window.addEventListener('storage', function(e) {
    if (e.key === CART_KEY) {
        updateCartBadgeGlobal();
    }
});

// Listen for custom event (when cart is updated in same tab)
window.addEventListener('cartUpdated', updateCartBadgeGlobal);

// Export functions to global scope for onclick handlers in HTML
window.getCart = getCart;
window.saveCart = saveCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartBadgeGlobal = updateCartBadgeGlobal;
