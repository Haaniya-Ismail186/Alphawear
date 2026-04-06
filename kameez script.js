// --- 1. Global Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    updateCartCount();
    
    const productGrid = document.getElementById('product-display-grid');
    if (productGrid) {
        const categoryHeader = document.querySelector('.category-header h1');
        const categoryTitle = categoryHeader ? categoryHeader.innerText : "Collection";
        generateProducts(categoryTitle);
    }
});

// --- 2. Navigation Toggle (FIXED) ---
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    if (mobileMenu && navList) {
        // Purana onclick hata kar naya simplified logic
        mobileMenu.onclick = () => {
            // CSS mein '.nav-links.active' ya '.nav-list.active' check karein
            navList.classList.toggle('active'); 
            mobileMenu.classList.toggle('is-active');
        };
    }
}

// --- 3. Dynamic Product Generator ---
function generateProducts(category) {
    const grid = document.getElementById('product-display-grid');
    if (!grid) return;
    grid.innerHTML = ''; 

    const productNames = [
        "BLUE CASUAL KAMEEZ SHALWAR", "RUST COTTON CASUAL KAMEEZ SHALWAR", "TEA PINK CASUAL KAMEEZ SHALWAR", "BROWN COTTON PLAIN KAMEEZ SHALWAR",
        "OLIVE CASUAL KAMEEZ SHALWAR", "BLACK CASUAL KAMEEZ SHALWAR", "WHITE SEMI-FORMAL KAMEEZ SHALWAR", "LIGHT GREY PLAIN KAMEEZ SHALWAR",
        "BLUE SEMI-FORMAL KAMEEZ SHALWAR", "SKY BLUE CASUAL KAMEEZ SHALWAR", "BLACK SEMI-FORMAL KAMEEZ SHALWAR", "DARK GREY COTTON CASUAL KAMEEZ SHALWAR",
        "JADE GREEN CASUAL KAMEEZ SHALWAR", "BLUE GREY CASUAL KAMEEZ SHALWAR", "BROWN CASUAL KAMEEZ SHALWAR", "LIGHT BROWN CASUAL KAMEEZ SHALWAR",
        "PISTACHIO SEMI-FORMAL KAMEEZ SHALWAR", "AZURE BLUE CASUAL KAMEEZ SHALWAR", "DULL GREEN CASUAL KAMEEZ SHALWAR", "CEMENT GREY CASUAL KAMEEZ SHALWAR"
    ];

    const myImages = [
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33811_5_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-47531_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-jjkp-47591_4_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33566_2__1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33772_3_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/9/0/90556_3_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33668_4_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/9/0/90559_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/3/3/33724_2_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-jjkp-33775_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/9/0/90555_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/4/7/47558_3_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/3/3/33770jjks_2_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33799_3_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33809_3_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33831_3__1.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/3/3/33834_1__1.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-jjkp-33773_4_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-33810_2_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        "https://www.junaidjamshed.com/media/catalog/product/3/3/33805jjks_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds"
    ];

    for (let i = 0; i < 20; i++) {
        const price = 3500 + (i * 120);
        const name = productNames[i] || `Alpha ${category} Edition ${i+1}`;
        const imgUrl = myImages[i];

        const productHTML = `
            <div class="product-card">
                <div class="product-img">
                    <img src="${imgUrl}" alt="${name}">
                </div>
                <div class="product-details">
                    <h3>${name}</h3>
                    <p class="price">Rs. ${price.toLocaleString()}</p>
                    
                    <div class="size-container">
                        <div class="size-box" onclick="selectSize(this)">S</div>
                        <div class="size-box" onclick="selectSize(this)">M</div>
                        <div class="size-box" onclick="selectSize(this)">L</div>
                        <div class="size-box" onclick="selectSize(this)">XL</div>
                    </div>

                    <button class="btn-add" onclick="addToCart('${name.replace(/'/g, "\\'")}', ${price}, this)">
                        Add To Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML; 
    }
}

// --- 4. Size Selection Function ---
function selectSize(element) {
    const parent = element.parentElement;
    const allSizes = parent.querySelectorAll('.size-box');
    
    allSizes.forEach(box => box.classList.remove('active'));
    element.classList.add('active');
    
    parent.style.border = "none";
}

// --- 5. Cart Logic (Final Updated with Login Check) ---
function addToCart(name, price, buttonElement) {
    // 1. Check if User is Logged In
    const activeUser = localStorage.getItem('alphaUser');
    if (!activeUser) {
        alert("Please Login or Sign Up to add items to your cart!");
        window.location.href = 'login.html'; 
        return; 
    }

    // 2. Check if Size is Selected
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    if (!selectedSizeBox) {
        alert("Please select a size first!");
        const sizeContainer = productCard.querySelector('.size-container');
        sizeContainer.style.border = "1px solid red";
        sizeContainer.style.borderRadius = "4px";
        return; 
    }

    // 3. Add to LocalStorage (Cart Data)
    const sizeValue = selectedSizeBox.innerText;
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    
    cart.push({ 
        id: Date.now(), 
        name: name, 
        price: price,
        size: sizeValue,
        img: productCard.querySelector('img').src,
        quantity: 1 
    });

    localStorage.setItem('alphaCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} (Size: ${sizeValue}) added to cart!`);
}

// --- 6. Update Navbar Cart Count ---
function updateCartCount() {
    const cartData = localStorage.getItem('alphaCart');
    const count = cartData ? JSON.parse(cartData).length : 0;
    const cartElement = document.getElementById('cart-count');
    if (cartElement) {
        cartElement.innerText = count;
    }
}