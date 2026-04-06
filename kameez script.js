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

// --- 2. Navigation Toggle ---
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }
}

// --- 3. Dynamic Product Generator ---
function generateProducts(category) {
    const grid = document.getElementById('product-display-grid');
    if (!grid) return;
    grid.innerHTML = ''; // Clear existing content

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

                    <button class="btn-add" onclick="addToCart('${name}', ${price})">
                        Add To Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML; // This was missing - essential to show cards
    }
}

// --- 4. Size Selection Function ---
function selectSize(element) {
    const parent = element.parentElement;
    const allSizes = parent.querySelectorAll('.size-box');
    
    // Pehle sab se 'active' class hatao
    allSizes.forEach(box => box.classList.remove('active'));
    
    // Phir jis par click hua usse 'active' kar do
    element.classList.add('active');
}

// --- 5. Cart Logic ---
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    cart.push({ id: Date.now(), name: name, price: price });
    localStorage.setItem('alphaCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartCount() {
    const cartData = localStorage.getItem('alphaCart');
    const count = cartData ? JSON.parse(cartData).length : 0;
    const cartElement = document.getElementById('cart-count');
    if (cartElement) {
        cartElement.innerText = count;
    }
}