document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    updateCartCount();
    loadProfile();
});

// 1. Mobile Navigation
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

// 2. Load User Profile
function loadProfile() {
    // LocalStorage se user check karein (Login page ke data ke mutabiq)
    const activeUser = JSON.parse(localStorage.getItem('alphaUser'));
    
    if (activeUser) {
        document.getElementById('user-name').innerText = activeUser.name || "User";
        document.getElementById('user-email').innerText = activeUser.email || "No Email";
    }
}

// 3. Cart Count Update
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
    }
}

// 4. Logout Function
function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        // User ka data remove karein lekin CART ka data save rehne dein
        localStorage.removeItem('alphaUser');
        alert("You have been logged out.");
        window.location.href = "index.html";
    }
}