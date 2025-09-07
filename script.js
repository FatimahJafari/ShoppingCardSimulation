// Product List
const products = [
  { id: 1, name: "Laptop", price: 1000, image: "" },
  { id: 2, name: "Headphones", price: 150, image: "" },
  { id: 3, name: "Keyboard", price: 80, image: "" },
  { id: 4, name: "Mouse", price: 50, image: "" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
const productList = document.getElementById("product-list");
const displayProducts = (items) => {
  productList.innerHTML = items.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
};
displayProducts(products);

// Add to Cart
const addToCart = (id) => {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
 item ? item.quantity++ : cart.push({ ...product, quantity: 1 });

  saveCart();
  renderCart();
  alert(`${product.name} added to cart!`);
};

// Render Cart
const cartContainer = document.getElementById("cart");
const renderCart = () => {
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h4>${item.name}</h4>
      <p>Price: $${item.price}</p>
      <p>Quantity: 
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        ${item.quantity}
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </p>
      <p>Subtotal: $${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total").textContent = `Total: $${total}`;
};
// Update Quantity
const updateQuantity = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) removeFromCart(id);

  saveCart();
  renderCart();
};

// Remove Item
const removeFromCart = (id) => {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
};

// Save to Local Storage
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

// Search Products (Bonus)
document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  displayProducts(filtered);
});
// Initial Render
renderCart();
