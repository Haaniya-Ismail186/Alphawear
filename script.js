// 1. Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Toggle Menu Logic ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            // Menu ko show/hide karne ke liye class toggle
            navList.classList.toggle('active');
            // Hamburger icon ko 'X' banane ke liye class toggle
            mobileMenu.classList.toggle('is-active');
        });

        // Agar user kisi link par click kare to menu band ho jaye
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }

    // --- Cart Counter Fix ---
    updateCartCount();

    // --- Active Link Highlight ---
    highlightCurrentPage();
});

/**
 * Function to update the cart number in navbar
 * It checks localStorage and defaults to 0
 */
function updateCartCount() {
    const cartData = localStorage.getItem('alphaCart');
    let count = 0;

    if (cartData) {
        try {
            const cartArray = JSON.parse(cartData);
            count = cartArray.length;
        } catch (e) {
            console.error("Error parsing cart data", e);
            count = 0;
        }
    }

    const cartElement = document.getElementById('cart-count');
    if (cartElement) {
        cartElement.innerText = count;
    }
}

/**
 * Function to highlight the current page in Navbar
 */
function highlightCurrentPage() {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.style.borderBottom = "2px solid #dcd0c0"; // Beige underline for active page
            item.style.paddingBottom = "5px";
        }
    });
}

/**
 * Global function to add items to cart
 * You can call this from any product page
 */
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('alphaCart')) || [];
    
    const newProduct = {
        id: Date.now(),
        name: productName,
        price: price
    };

    cart.push(newProduct);
    localStorage.setItem('alphaCart', JSON.stringify(cart));
    
    // Counter ko foran update karein
    updateCartCount();
    
    alert(`${productName} has been added to your cart!`);
}