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

// --- 2. Navigation Toggle (Mobile Menu) ---
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

    const hoodieNames = [
        "BASIC TEXTURED PULL-OVER", "BASIC ZIPPER HOODIE", "Navy Blue Fleece", "Sporty Grey Hoodie",
        "Crimson Red Pull-Over", "Mustard Street Wear", "Basic Black Hoodie", "Sand Beige Hoodie",
        "Urban Charcoal Hoodie", "Graphic Print Hoodie", "Slogan Print Hoodie", "Color-Block Graphic",
        "Color-Block Pull-Over", "Basic Vest Hoodie", "Raglan Style Hoodie", "Street Graphic Hoodie",
        "Vintage Pull-Over", "Slogan Print Pull-Over", "Midnight Graphic Hoodie", "Slogan Print Hoodie"
    ];

    const hoodieImages = [
        "https://outfitters.com.pk/cdn/shop/files/F0567107113_4bca2fd6-1c4c-467b-9f61-cc2ffece5a14.jpg?v=1760511735",
        "https://outfitters.com.pk/cdn/shop/files/F0543107802.jpg?v=1764831012",
        "https://outfitters.com.pk/cdn/shop/files/F0543107901.jpg?v=1765264194",
        "https://outfitters.com.pk/cdn/shop/files/F0552107618.jpg?v=1759297340",
        "https://outfitters.com.pk/cdn/shop/files/F0552107117_43e0614e-df4e-4172-9a60-196089612141.jpg?v=1762410362",
        "https://outfitters.com.pk/cdn/shop/files/F0552107904.jpg?v=1765264567",
        "https://outfitters.com.pk/cdn/shop/files/F0541107901_79a51485-deb3-4db7-9c9e-5261019dae82.jpg?v=1767589632",
        "https://outfitters.com.pk/cdn/shop/files/F0541107915._7f40a52b-8ffa-44c4-b947-2a1b15b6968b.jpg?v=1767589632",
        "https://outfitters.com.pk/cdn/shop/files/F0551107003_f7638f9b-590d-4bb1-b2a1-ace9bbb2c247.jpg?v=1762414724",
        "https://outfitters.com.pk/cdn/shop/files/F0568107901.jpg?v=1763381245",
        "https://outfitters.com.pk/cdn/shop/files/F0572107911_e3ff6298-5b24-43c2-85a0-9896f41a5f42.jpg?v=1763726047",
        "https://outfitters.com.pk/cdn/shop/files/F05351070022.jpg?v=1759381775",
        "https://outfitters.com.pk/cdn/shop/files/F0555107006.jpg?v=1760510808",
        "https://outfitters.com.pk/cdn/shop/files/F0546107901.jpg?v=1756979244",
        "https://outfitters.com.pk/cdn/shop/files/F0574107118.jpg?v=1765969711",
        "https://outfitters.com.pk/cdn/shop/files/F0599107602.jpg?v=1763464933",
        "https://outfitters.com.pk/cdn/shop/files/F0605107317.jpg?v=1760513506",
        "https://outfitters.com.pk/cdn/shop/files/F0583107805_b05fd28a-23c2-45e3-b48c-cc84b2860cdc.jpg?v=1760512910",
        "https://outfitters.com.pk/cdn/shop/files/F0590107912_892a3360-8b04-411d-82b2-c0deefc2e52a.jpg?v=1765264707",
        "https://outfitters.com.pk/cdn/shop/files/F0606107618_949fb3ea-52d7-4dc8-b326-67ae3c1d22fa.jpg?v=1763728363"
    ];

    const isHoodiePage = category.toLowerCase().includes('hoodie');

    for (let i = 0; i < 20; i++) {
        const price = isHoodiePage ? (2800 + (i * 100)) : (3500 + (i * 120));
        const name = hoodieNames[i] || `${category} Edition ${i+1}`;
        const imgUrl = hoodieImages[i] || `https://via.placeholder.com/400x550`;

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
    
    // Border reset agar red tha
    parent.style.border = "none";
}

// --- 5. Cart Logic with Validation ---
function addToCart(name, price, buttonElement) {
    // Current product card dhoondna
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    // Validation Check
    if (!selectedSizeBox) {
        alert("Please select a size first!");
        
        // Visual cue (Border red)
        const sizeContainer = productCard.querySelector('.size-container');
        sizeContainer.style.border = "1px solid red";
        sizeContainer.style.borderRadius = "4px";
        return; 
    }

    const sizeValue = selectedSizeBox.innerText;
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    
    // Item ko details ke sath add karna
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