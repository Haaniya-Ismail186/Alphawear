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
        mobileMenu.onclick = () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        };
    }
}

// --- 3. Dynamic Product Generator ---
function generateProducts(category) {
    const grid = document.getElementById('product-display-grid');
    if(!grid) return;
    grid.innerHTML = ''; 

    const bottomNames = [
        "Baggy Fit Jeans", "Baggy Fit Jeans", "Baggy Fit Jeans", "Cropped Straight Fit Chinos", 
        "Baggy Fit Cargo Pants", "Baggy Fit Pants", "Balloon Fit Jeans", "Slim Fit Jeans", 
        "Slim Fit Jeans", "Baggy Jeans With Laser Print", 
        "Terry Wide Leg Trousers", "Textured Jogger Trousers", "Relaxed Fit Trousers", "Slogan Print Jogger Trousers", 
        "Slogan Print Trousers", "Baggy Fit Trousers", "Basic Jogger Trousers", "Cropped Straight Fit Trousers", 
        "Straight Fit Trousers", "Straight Fit Trousers" 
    ];

    const bottomImages = [
        "https://outfitters.com.pk/cdn/shop/files/F0634109622LOWER._eef8f471-b28b-4be5-bf15-e667154cc8da.jpg?v=1775018787",
        "https://outfitters.com.pk/cdn/shop/files/F0630109622LOWER.jpg?v=1771476387",
        "https://outfitters.com.pk/cdn/shop/files/F0642109901LOWER._163f0fd3-0b00-46f3-b77e-10b2c7c45d65.jpg?v=1773723153",
        "https://outfitters.com.pk/cdn/shop/files/F0693108119LOWER..jpg?v=1773723818",
        "https://outfitters.com.pk/cdn/shop/files/F0691108002LOWEr.jpg?v=1774414575",
        "https://outfitters.com.pk/cdn/shop/files/F0698108801LOWER.jpg?v=1773724583",
        "https://outfitters.com.pk/cdn/shop/files/F0633109625LOWER.jpg?v=1772013669",
        "https://outfitters.com.pk/cdn/shop/files/F0775109622LOWER.jpg?v=1769671433",
        "https://outfitters.com.pk/cdn/shop/files/F0571109622Lower_3_b7eeaa2a-ab35-4435-859b-2efb7b673bea.jpg?v=1755088432",
        "https://outfitters.com.pk/cdn/shop/files/F0639109903LOWER_1.jpg?v=1769686349",
        "https://outfitters.com.pk/cdn/shop/files/F0624108006LOWER.jpg?v=1773726429",
        "https://outfitters.com.pk/cdn/shop/files/F0672108116LOWER_1_..jpg?v=1769748021",
        "https://outfitters.com.pk/cdn/shop/files/F0743108002LOWER.jpg?v=1773725898",
        "https://outfitters.com.pk/cdn/shop/files/F0608108814LOWER_163ae139-6418-4c4e-b3f7-e3a6d8bd178a.jpg?v=1769497047",
        "https://outfitters.com.pk/cdn/shop/files/F0620108901LOWER..jpg?v=1769422799",
        "https://outfitters.com.pk/cdn/shop/files/F0618108915LOWER_e8745253-4cbc-47d8-9d33-9c715dde00a2.jpg?v=1772013349",
        "https://outfitters.com.pk/cdn/shop/files/F0536108901Lower_34.jpg?v=1753097681",
        "https://outfitters.com.pk/cdn/shop/files/F0696108801LOWER..jpg?v=1773724183",
        "https://outfitters.com.pk/cdn/shop/files/F0621108901LOWER.jpg?v=1772602824",
        "https://outfitters.com.pk/cdn/shop/files/F0617108901LOWER_78d0cb14-d382-48de-afd0-ed9bc734c383.jpg?v=1769681891"
    ];

    const isBottomPage = category.toLowerCase().includes('pant') || category.toLowerCase().includes('trouser');

    for (let i = 0; i < 20; i++) {
        const price = isBottomPage ? (3200 + (i * 100)) : 3500;
        const name = isBottomPage ? bottomNames[i] : `Product ${i+1}`;
        const imgUrl = isBottomPage ? bottomImages[i] : `https://via.placeholder.com/400x550`;

        const productHTML = `
            <div class="product-card">
                <div class="product-img">
                    <img src="${imgUrl}" alt="${name}">
                </div>
                <div class="product-details">
                    <h3>${name}</h3>
                    <p class="price">Rs. ${price.toLocaleString()}</p>
                    
                    <div class="size-container">
                        <div class="size-box" onclick="selectSize(this)">30</div>
                        <div class="size-box" onclick="selectSize(this)">32</div>
                        <div class="size-box" onclick="selectSize(this)">34</div>
                        <div class="size-box" onclick="selectSize(this)">36</div>
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

// --- 4. Size Selection Logic ---
function selectSize(element) {
    const parent = element.parentElement;
    const allSizes = parent.querySelectorAll('.size-box');
    allSizes.forEach(box => box.classList.remove('active'));
    element.classList.add('active');
    
    // Reset error styling
    parent.style.border = "none";
}

// --- 5. Cart Logic (Updated with Size Validation) ---
function addToCart(name, price, buttonElement) {
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    // Check if size is selected
    if (!selectedSizeBox) {
        alert("Please select a waist size first!");
        const sizeContainer = productCard.querySelector('.size-container');
        sizeContainer.style.border = "1px solid red";
        sizeContainer.style.borderRadius = "4px";
        return; 
    }

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

function updateCartCount() {
    const cartData = localStorage.getItem('alphaCart');
    const count = cartData ? JSON.parse(cartData).length : 0;
    const cartElement = document.getElementById('cart-count');
    if (cartElement) {
        cartElement.innerText = count;
    }
}





// --- 5. Cart Logic (Updated with Login Check) ---
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