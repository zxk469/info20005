// shopping cart 
let cart = JSON.parse(localStorage.getItem("cart")) || [] ;

// add product to cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    alert(name + " added to cart!");
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

        cartItemsContainer.innerHTML += 
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price}</p>               
            </div>
        
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        </div>
        ; 
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
        document.getElementById(productId).src = images{imageIndex[productId]};
    }

    updateCartCount();
    displayCartItems(); 
