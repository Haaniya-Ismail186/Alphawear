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

    const tShirtNames = [
        "Crew Neck T-Shirt", "Textured Crew Neck T-Shirt", "Striped T-Shirt", "Basic Ottoman T-Shirt",
        "Graphic T-Shirt", "Slogan Print T-Shirt", "Slogan Print T-Shirt", "Slogan Print T-Shirt",
        "Basic Bermuda T-Shirt", "Basic Crew Neck T-Shirt", "Basic Ottoman T-Shirt", "Slogan Print T-Shirt",
        "Slogan Print T-Shirt", "Slogan Print T-Shirt", "Slogan Print T-Shirt", "Slogan Print T-Shirt",
        "Slogan Print T-Shirt", "Graphic T-Shirt", "Graphic T-Shirt", "Graphic T-Shirt"
    ];

    const tShirtImages = [
        "https://outfitters.com.pk/cdn/shop/files/F1754106910.jpg?v=1774438748",
        "https://outfitters.com.pk/cdn/shop/files/F1872106628.jpg?v=1771322248",
        "https://outfitters.com.pk/cdn/shop/files/F1832106901.jpg?v=1769668128",
        "https://outfitters.com.pk/cdn/shop/files/F1828106814_6.jpg?v=1769936076",
        "https://outfitters.com.pk/cdn/shop/files/F1678106102_6.jpg?v=1770108772",
        "https://outfitters.com.pk/cdn/shop/files/F1698106226.jpg?v=1769664386",
        "https://outfitters.com.pk/cdn/shop/files/F1717106628_3_1.jpg?v=1769934917",
        "https://outfitters.com.pk/cdn/shop/files/F1646106635_ef1020e1-6175-433d-9ced-ec6d7d893c83.jpg?v=1769492560",
        "https://outfitters.com.pk/cdn/shop/files/F0168110901LOWER.jpg?v=1769670836",
        "https://outfitters.com.pk/cdn/shop/files/F1742106001._5cab74e2-698f-42b1-a54e-8e27010552d1.jpg?v=1774850464",
        "https://outfitters.com.pk/cdn/shop/files/F1828106814_6.jpg?v=1769936076",
        "https://outfitters.com.pk/cdn/shop/files/F1685106901_375b9c6d-f676-4ddf-b3f6-ba303283c911.jpg?v=1769661955",
        "https://outfitters.com.pk/cdn/shop/files/F1713106001_6e9becec-8331-46c1-a212-c8009103f959.jpg?v=1769666497",
        "https://outfitters.com.pk/cdn/shop/files/F1690106001_2.jpg?v=1769933143",
        "https://outfitters.com.pk/cdn/shop/files/F1702106001_2_1.jpg?v=1769665002",
        "https://outfitters.com.pk/cdn/shop/files/F1737106901_8712ac29-f0fd-43ec-909f-fbebce61e6e9.jpg?v=1771321477",
        "https://outfitters.com.pk/cdn/shop/files/F1658106901_12.jpg?v=1770096005",
        "https://outfitters.com.pk/cdn/shop/files/F1675106901_6.jpg?v=1769931261",
        "https://outfitters.com.pk/cdn/shop/files/F1632106901_4.jpg?v=1769927756",
        "https://outfitters.com.pk/cdn/shop/files/F1682106910_87d746a1-7f8e-42ea-b250-62c2d4bbdf60.jpg?v=1769661737"
    ];

    const isTShirtPage = category.toLowerCase().includes('t-shirt');

    for (let i = 0; i < 20; i++) {
        const price = isTShirtPage ? (1200 + (i * 40)) : 2500;
        const name = isTShirtPage ? tShirtNames[i] : `Product ${i+1}`;
        const imgUrl = isTShirtPage ? tShirtImages[i] : `https://via.placeholder.com/400x550`;

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

// --- 4. Size Selection Logic ---
function selectSize(element) {
    const parent = element.parentElement;
    const allSizes = parent.querySelectorAll('.size-box');
    allSizes.forEach(box => box.classList.remove('active'));
    element.classList.add('active');
    
    // Border color reset karein agar red hua tha
    parent.style.border = "none";
}

// --- 5. Cart Logic (With Size Validation) ---
function addToCart(name, price, buttonElement) {
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    // Agar size select nahi kiya to alert dikhao
    if (!selectedSizeBox) {
        alert("Please select a size before adding to cart!");
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
        size: sizeValue, // Selected size save ho raha hai
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