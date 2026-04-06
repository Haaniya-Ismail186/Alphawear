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

    // --- Accessories Data ---
    const accNames = [
        "NY Baseball Cap", "Classic Trucker Hat", "Leather Bi-fold Wallet", "Premium Reversible Belt",
        "Ankle Length Socks (Pack of 3)", "Woven Canvas Belt", "Minimalist Card Holder", "Beanie Winter Cap",
        "Aviator Sunglasses", "Stainless Steel Watch", "Sports Wristband", "Formal Leather Belt",
        "Gym Duffel Bag", "Crossbody Tech Bag", "Crew Socks White", "Casual Suede Belt",
        "Textured Leather Wallet", "Bucket Hat Black", "Wayfarer Shades", "No-Show Socks Set"
    ];

    const accImages = [
        "https://imagescdn.simons.ca/images/8106-21101-1-A1_2/new-york-yankees-classic-cap.jpg?__=54",
        "https://buffalojackson.com/cdn/shop/products/trucker-logo-patch-hat-blue_2000x.jpg?v=1645453168",
        "https://hutch.pk/cdn/shop/files/LVLeatherBifoldMenWalletBrownTextured_MadeInItaly.png?v=1759568394",
        "https://www.wildhorn.in/cdn/shop/files/wildhorn-premium-reversible-leather-belt-for-men-wildhorn-79014.jpg?v=1750331742",
        "https://m.media-amazon.com/images/I/818-BYbbCAL.jpg",
        "https://down-my.img.susercontent.com/file/cn-11134207-7r98o-lx6px827an1f93",
        "https://thisiswallet.com/cdn/shop/collections/Smallest-Card-Holders-For-Men.webp?v=1713657894&width=750",
        "https://m.media-amazon.com/images/I/71Hvm64tRCL._AC_UY350_.jpg",
        "https://www.punchwatch.co.uk/cdn/shop/files/maxwell-polarized-unisex-aviator-sunglasses-in-full-black-by-wmp-eyewear-wmp-eyewear-punch-watch-eyewear-7110349.png?v=1760178059&width=2000",
        "https://sc04.alicdn.com/kf/Hfcf89cdabc364ff4941f356298a9fe91h.jpg_350x350.jpg",
        "https://static-01.daraz.pk/p/a0bc13b4c0cf7f8722539c7533861fc6.jpg",
        "https://m.media-amazon.com/images/I/81x3BDu4zBL._AC_UY350_.jpg",
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32193317/2025/1/28/8b5a1917-56f0-4f4c-b73f-29943e5307351738056075860-BOLDFIT-Printed-Medium-Sports-or-Gym-Duffel-Bag-490173805607-1.jpg",
        "https://m.media-amazon.com/images/I/51h5QYHZReL._AC_UF894,1000_QL80_.jpg",
        "https://manmadebrand.com/cdn/shop/files/pdp-socks-crew-white-01.jpg?v=1755100224&width=1946",
        "https://img.kwcdn.com/product/1d18fce2328/47d2c569-9fa7-4e50-999a-b32eb6685359_800x800.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
        "https://menscorner.pk/wp-content/uploads/2023/07/grey-textured.webp",
        "https://lockeddownbrand.com/cdn/shop/files/Bucket_Hat_Black_Lifestyle.jpg?v=1736458609&width=2000",
        "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/19037770/2025/7/24/062cf8a2-9687-4822-8c43-084559ccc37d1753357411272-Voyage-Unisex-Black-Lens--Black-Wayfarer-Sunglasses-with-UV--1.jpg",
        "https://www.32degrees.com/cdn/shop/files/tmbass26srt_men_multi_6pk_720.jpg?format=pjpg&v=1717101524&width=1000"
    ];

    const isAccPage = category.toLowerCase().includes('accessories');

    for (let i = 0; i < 20; i++) {
        const price = isAccPage ? (800 + (i * 150)) : 2000;
        const name = isAccPage ? accNames[i] : `Item ${i+1}`;
        const imgUrl = isAccPage ? accImages[i] : `https://via.placeholder.com/400x550`;

        let sizeHTML = '';
        if (name.toLowerCase().includes('cap') || name.toLowerCase().includes('hat') || name.toLowerCase().includes('socks') || name.toLowerCase().includes('wallet') || name.toLowerCase().includes('bag')) {
            // Free size ko pehle se 'active' rakha hai kyunki isme selection ki zaroorat nahi
            sizeHTML = `<div class="size-box active" style="width: auto; padding: 0 10px;">Free Size</div>`;
        } else if (name.toLowerCase().includes('belt')) {
            sizeHTML = `
                <div class="size-box" onclick="selectSize(this)">32</div>
                <div class="size-box" onclick="selectSize(this)">36</div>
                <div class="size-box" onclick="selectSize(this)">40</div>
            `;
        } else {
            sizeHTML = `<div class="size-box" onclick="selectSize(this)">S</div><div class="size-box" onclick="selectSize(this)">M</div>`;
        }

        const productHTML = `
            <div class="product-card">
                <div class="product-img">
                    <img src="${imgUrl}" alt="${name}">
                </div>
                <div class="product-details">
                    <h3>${name}</h3>
                    <p class="price">Rs. ${price.toLocaleString()}</p>
                    <div class="size-container">
                        ${sizeHTML}
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
    
    // Border reset agar red tha
    parent.style.border = "none";
}

// --- 5. Cart Logic (Updated with Validation) ---
function addToCart(name, price, buttonElement) {
    const productCard = buttonElement.closest('.product-card');
    const selectedSizeBox = productCard.querySelector('.size-box.active');

    // Validation Check
    if (!selectedSizeBox) {
        alert("Please select a size first!");
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