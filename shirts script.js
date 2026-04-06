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

    // --- Data for Shirts ---
    const shirtNames = [
        "Embroidered Shirt", "Striped Shirt", "Textured Striped Shirt", "Textured Striped Shirt",
        "Checkered Shirt", "Textured Resort Collar Shirt", "Textured Resort Collar Shirt", "Textured Striped Shirt",
        "Textured Striped Shirt", "Checkered Shirt", "Striped Shirt", "Button Up Shirt",
        "Striped Jacquard Shirt", "Striped Graphic Shirt", "Jacquard Shirt", "Striped Jacquard Shirt",
        "Striped Jacquard Shirt", "Striped Jacquard Shirt", "Textured Striped Shirt", "Textured Print Shirt"
    ];

    const shirtImages = [
        "https://outfitters.com.pk/cdn/shop/files/F0899103901.jpg?v=1764134557",
        "https://outfitters.com.pk/cdn/shop/files/F1052103629_10.jpg?v=1770091901",
        "https://outfitters.com.pk/cdn/shop/files/F1042103618.jpg?v=1769425850",
        "https://outfitters.com.pk/cdn/shop/files/F1042103910_5.jpg?v=1769755525",
        "https://outfitters.com.pk/cdn/shop/files/F1062103112_e6601597-9ce3-420a-8b3b-6117755d155d.jpg?v=1769426180",
        "https://outfitters.com.pk/cdn/shop/files/F1090103001_91c668d7-7e32-4d3e-985a-6e86ffc8e2ca.jpg?v=1772600938",
        "https://outfitters.com.pk/cdn/shop/files/F1090103703.jpg?v=1775026786",
        "https://outfitters.com.pk/cdn/shop/files/F1073103803.jpg?v=1771913764",
        "https://outfitters.com.pk/cdn/shop/files/F1073103603.jpg?v=1773732473",
        "https://outfitters.com.pk/cdn/shop/files/F1078103701_7_b0e0e906-fac2-4ed5-8060-0dd509958a95.jpg?v=1771920626",
        "https://outfitters.com.pk/cdn/shop/files/F1049103630.jpg?v=1769499671",
        "https://outfitters.com.pk/cdn/shop/files/F1013103802_768f1acc-eab6-45b8-833e-971e2351bf20.jpg?v=1773731412",
        "https://outfitters.com.pk/cdn/shop/files/F1050103002.jpg?v=1769504752",
        "https://outfitters.com.pk/cdn/shop/files/F1041103999-4.jpg?v=1771915422",
        "https://outfitters.com.pk/cdn/shop/files/F1076103128_21ae1b8e-781d-4830-9413-8da9f6f88e5a.jpg?v=1769507437",
        "https://outfitters.com.pk/cdn/shop/files/F1044103999-4.jpg?v=1773117400",
        "https://outfitters.com.pk/cdn/shop/files/F1050103002.jpg?v=1769504752",
        "https://outfitters.com.pk/cdn/shop/files/F1031103619-3.jpg?v=1771914510",
        "https://outfitters.com.pk/cdn/shop/files/F1017103901.jpg?v=1772523412",
        "https://outfitters.com.pk/cdn/shop/files/F1084103999_f21b4d3f-8132-4b62-bc56-9b8409698ccf.jpg?v=1771926384"
    ];

    const isShirtPage = category.toLowerCase().includes('shirt');
    const displayNames = isShirtPage ? shirtNames : []; 
    const displayImages = isShirtPage ? shirtImages : [];

    for (let i = 0; i < 20; i++) {
        const price = isShirtPage ? (2200 + (i * 50)) : 3500;
        const name = displayNames[i] || `Shirt Collection ${i+1}`;
        const imgUrl = displayImages[i] || `https://via.placeholder.com/400x550`;

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

// --- 4. Selection Logic ---
function selectSize(element) {
    const parent = element.parentElement;
    const allSizes = parent.querySelectorAll('.size-box');
    allSizes.forEach(box => box.classList.remove('active'));
    element.classList.add('active');
    // Error border reset
    parent.style.border = "none";
}

// --- 5. Cart Logic (Updated Size Validation) ---
function addToCart(name, price, buttonElement) {
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    // Agar size select nahi kiya gaya
    if (!selectedSizeBox) {
        alert("Please select a size first!");
        const sizeContainer = productCard.querySelector('.size-container');
        sizeContainer.style.border = "1px solid red";
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