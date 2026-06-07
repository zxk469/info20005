// shopping cart 
let cart = JSON.parse(localStorage.getItem("cart")) || [] ;

//product images
const clementineImages = [
    "https://www.thehorse.com.au/cdn/shop/files/20231113_THEHORSE_CLE3__8673.jpg?v=1773890607&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/CLE3_0105.jpg?v=1773890607&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/Untitleddesign_3.png?v=1773890607&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/20231113_THEHORSE_CLE3__8677.jpg?v=1773890652&width=1200"
];

const finImages = [
    "https://www.thehorse.com.au/cdn/shop/files/FinDrawstringBagMushroomFDB24_3_97e3c38a-22cb-41f8-bb5d-b0aef6277653.jpg?v=1774302707&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/FDB24_2850.jpg?v=1774302707&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/FinDrawstringBagMushroomFDB24_2.jpg?v=1774302707&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/0073_Capture_0688.jpg?v=1774302707&width=1200"
];

const tillyImages = [
    "https://www.thehorse.com.au/cdn/shop/files/TillyCoffeeTSB3_4.jpg?v=1773892638&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/47_3419.jpg?v=1773892638&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/TillyCoffeeTSB3.jpg?v=1773177232&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/TillyCoffeeTSB3_2.jpg?v=1773892638&width=1200"
];

const esmeImages = [
    "https://www.thehorse.com.au/cdn/shop/files/EsmeToteBlackESM1_3.jpg?v=1773872244&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/ESM1_1450_1_1.jpg?v=1773872244&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/EsmeToteBlackESM1_5.jpg?v=1773872244&width=1200",
    "https://www.thehorse.com.au/cdn/shop/files/EsmeToteBlackESM1_7.jpg?v=1773872244&width=1200"
];

// add product to cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    showToast(name + " added to cart!");
}

//update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

//show cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartItemsContainer || !totalContainer) {
        return; 
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalContainer.innerText = "Total: $0";
        return;
    }
    
    cart.forEach((item, index) => {
        total += item.price;

        cartItemsContainer.innerHTML += `
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price}</p>               
            </div>
        
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        </div>
        `; 
    });

    totalContainer.innerText = "Total: $" + total; }

    // remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    //clear cart 
    function clearCart() {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayCartItems(); 
    }

    //checkout
    function checkout() {
        const fullName = document.getElementById("full-name");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const postcode = document.getElementById("postcode");
        const payment = document.querySelector("input[name='payment']:checked");

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!fullName.value || !address.value || !city.value || !postcode.value) {
            alert("Please complete your delivery details.");
            return;
        }

        if (!payment) {
            alert("Please select a payment method.");
            return;
        }

        alert("Thank you for your order, " + fullName.value + "!");
        clearCart();
    }

    //product image slider
    let imageIndex = {};
    function changeImage(productId, images, direction) {
        if (imageIndex[productId] === undefined) {
            imageIndex[productId] = 0;
        }
        imageIndex[productId] += direction;

        if (imageIndex[productId] < 0) {
            imageIndex[productId] = images.length - 1;
        }

        if (imageIndex[productId] >= images.length) {
            imageIndex[productId] = 0;
        }
        document.getElementById(productId).src = images[imageIndex[productId]];
    }

    function showToast(message) {
        let toast = document.getElementById("toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            document.body.appendChild(toast);
        }

        toast.innerText = message;
        toast.className = "show";

        setTimeout(function () {
            toast.className = "";
        }, 2500);
    }

    const products = {
        clementine: {
            name: "Clementine Bag",
            price: 299,
            description: "A soft sculptural bag designed for refined everyday elegance."
            images: clementineImages
        },
        fin: {
            name: "Fin Drawstring Bag",
            price: 159,
            description: "A relaxed drawstring bag with a modern luxury silhouette.",
            images: finImages
        },
        tilly: {
            name: "Tilly Bag",
            price: 299,
            description: "A compact luxury bag designed with soft structure and timeless style.",
            images: tillyImages
        },
        esme: {
            name: "Esme Bag",
            price: 249,
            description: "A minimal tote made for everyday function and quiet luxury.",
            images: esmeImages
        }
    };

    let currentProduct = null;
    let currentProductImageIndex = 0;

    function loadProductPage() {
        const params = new URLSearchParams(window.location.search);
        const productKey = params.get("product");

        if (!productKey || !products[productKey]) {
            return;
        }

        currentProduct = products[productKey];

        document.getElementById("product-name").innerText = currentProduct.name;
        document.getElementById("product-price").innerText = currentProduct.price;
        document.getElementById("product-description").innerText = currentProduct.description;
        document.getElementById("main-product-image").src = currentProduct.images[0];

        document.getElementById("add-product-button").onclick = function () {
            addToCart(currentProduct.name, currentProduct.price);
        };

        const thumbnails = document.getElementById("thumbnail-column");
        thumbnails.innerHTML = "";

        currentProduct.images.forEach(function (image, index) {
            thumbnails.innerHTML += `
            <img src="${image}" onclick="selectProductImage(${index})" alt="Product thumbnail"> 
            `;
        });
    }

    function selectProductImage(index) {
        currentProductImageIndex = index;
        document.getElementById("main-product-image").src = currentProduct.images[index];
    }

    function nextProductImage() {
        if (!currentProduct) return;

        currentProductImageIndex++;

        if (currentProductImageIndex >= currentProduct.images.length) {
            currentProductImageIndex = 0;
        } 

        selectProductImage(currentProductImageIndex);
      }

      function previousProductImage() {
        if (!currentProduct) return;

        currentProductImageIndex--;

        if (currentProductImageIndex < 0) {
            currentProductImageIndex = currentProduct.images.length - 1;
        }

        selectProductImage(currentProductImageIndex);
      }

      loadProductPage();

    updateCartCount();
    displayCartItems(); 
