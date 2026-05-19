// shopping cart 
let cart = JSON.parse(localStorage.getItem("cart"))  ;

// add product to cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

// save updated cart
localStorage.setItem("cart", JsSON.stringify(cart));

// update cart number
updateCartCount();

//Popup message
alert(name + " added to cart!");
}

//update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementedById("cart0-count");

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
    cart.forEach((item, index) => {
        total += item.price;

        cartItemsContainer.innerHTML +=
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        </div>
        ; 
    })
}