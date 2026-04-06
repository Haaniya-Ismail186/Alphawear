document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initMobileMenu(); // Mobile menu initialization
});

// --- 1. Load and Render Cart ---
function loadCart() {
    const container = document.getElementById('cart-items-container');
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="padding: 60px; text-align: center; color: #888; font-size: 14px; letter-spacing: 1px;">YOUR CART IS CURRENTLY EMPTY.</p>`;
        updateSummary(0);
        updateCartCount(0);
        return;
    }

    container.innerHTML = '';
    cart.forEach((item, index) => {
        // Quantity default 1 agar missing ho
        if (!item.quantity) item.quantity = 1;
        
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <div class="cart-item-row">
                <div class="prod-info-cell">
                    <img src="${item.img || 'https://via.placeholder.com/90x110'}" class="prod-img">
                    <div class="prod-desc">
                        <h4>${item.name}</h4>
                        <p>Alpha Collection</p>
                    </div>
                </div>
                <div class="price-cell">Rs ${item.price.toLocaleString()}</div>
                <div class="qty-cell">
                    <div style="display:flex; align-items:center; border: 1px solid #ccc;">
                        <button class="qty-btn" style="border:none" onclick="changeQuantity(${index}, -1)">-</button>
                        <input type="text" value="${item.quantity}" class="qty-input" style="border:none" readonly>
                        <button class="qty-btn" style="border:none" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="total-cell">Rs ${itemTotal.toLocaleString()}</div>
                <div class="remove-btn-x" onclick="deleteFromCart(${index})">&times;</div>
            </div>
        `;
    });

    updateSummary(subtotal);
    updateCartCount(cart.length);
}

// --- 2. Change Quantity Logic ---
function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + delta;
        
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }

        localStorage.setItem('alphaCart', JSON.stringify(cart));
        loadCart(); 
    }
}

// --- 3. Update Totals & Summary ---
function updateSummary(total) {
    const subtotalEl = document.getElementById('subtotal-price');
    const finalTotalEl = document.getElementById('final-total');
    const installmentEl = document.getElementById('installment-amt');

    if (subtotalEl) subtotalEl.innerText = `Rs ${total.toLocaleString()}`;
    if (finalTotalEl) finalTotalEl.innerText = `Rs ${total.toLocaleString()}`;
    
    if (installmentEl) {
        const perMonth = Math.round(total / 3);
        installmentEl.innerText = `Rs ${perMonth.toLocaleString()}`;
    }
}

// --- 4. Delete Item ---
function deleteFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('alphaCart', JSON.stringify(cart));
    loadCart();
}

// --- 5. Navbar Cart Count Update ---
function updateCartCount(count) {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = count;
    }
}

// --- 6. Mobile Menu Logic ---
function initMobileMenu() {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            // CSS mein humne '.is-active' class use ki hai sidebar dikhane ke liye
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('is-active'); 
        });
    }
}



// --- 7. Checkout Validation ---
function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty! Please add an item before proceeding to checkout.");
    } else {
        // Agar cart mein items hain to checkout page par bhej dein
        window.location.href = 'checkout.html';
    }
}