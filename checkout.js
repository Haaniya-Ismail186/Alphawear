document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Components
    loadCheckoutSummary();
    initMobileMenu();

    // 2. Handle Order Submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Yahan aap mazeed logic add kar sakte hain (e.g. data database mein bhejna)
            alert('Thank you! Your order has been placed successfully.');
            
            // Order complete hone par cart khali karein
            localStorage.removeItem('alphaCart');
            
            // Redirect to home
            window.location.href = 'index.html';
        });
    }
});

// --- Order Summary Function ---
function loadCheckoutSummary() {
    const summaryContainer = document.getElementById('checkout-items-list');
    const totalEl = document.getElementById('final-checkout-total');
    
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    let total = 0;

    if (!summaryContainer || !totalEl) return;

    if (cart.length === 0) {
        summaryContainer.innerHTML = `<p style="font-size:12px; color:#888;">Your cart is empty.</p>`;
        totalEl.innerText = `Rs 0`;
        return;
    }

    summaryContainer.innerHTML = ''; // Container clear karein

    cart.forEach(item => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;

        // Har item ke liye row create karein
        summaryContainer.innerHTML += `
            <div class="summary-item">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-weight:600; color:#000;">${item.name}</span>
                    <span style="font-size:11px;">Qty: ${qty}</span>
                </div>
                <span style="font-weight:600;">Rs ${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });

    // Final Total update karein
    totalEl.innerText = `Rs ${total.toLocaleString()}`;
}

// --- Mobile Menu Logic ---
function initMobileMenu() {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            // CSS classes ke saath toggle karein
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('is-active'); 
        });
    }
}