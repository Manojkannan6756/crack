// Product Data
const products = [
  {name:"Sparklers Small", category:"sparklers", price:50},
  {name:"Sparklers Big", category:"sparklers", price:100},
  {name:"Bijili 100 wala", category:"bijili", price:120},
  {name:"Chakkara Small", category:"chakkara", price:60},
  {name:"Chakkara Big", category:"chakkara", price:150},
  {name:"Atom Bomb", category:"bomb", price:200},
  {name:"Rockets 10 pcs", category:"rockets", price:180},
  {name:"Sky Shot 12 pcs", category:"sky", price:300},
];

const productList = document.getElementById('product-list');
const cart = [];
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartBox = document.getElementById('cart');

// Load products
function displayProducts(items) {
  productList.innerHTML = '';
  items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick='addToCart("${p.name}",${p.price})'>Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}
displayProducts(products);

// Filter products
function filterProducts(category) {
  if (category === 'all') displayProducts(products);
  else displayProducts(products.filter(p => p.category === category));
}

// Add to cart
function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
}

// Update Cart
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// Toggle Cart
function toggleCart() {
  cartBox.classList.toggle('active');
}

// Checkout
function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
}

document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const paymentMethod = document.getElementById('paymentMethod').value;

  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  if(paymentMethod === "cod"){
    alert(`🎉 Order Placed Successfully!\nThank you ${name}, your order will be delivered to ${address} with Cash on Delivery.`);
    cart.length = 0;
    updateCart();
    toggleCart();
    return;
  }

  // Generate UPI Link
  const upiId = "manojkannan065@oksbi"; // Your UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=Revathi%20Crackers&am=${totalAmount}&cu=INR&tn=Order%20Payment`;

  // Open UPI App
  window.location.href = upiLink;

  alert(`Please complete the payment of ₹${totalAmount} using UPI.
Once done, we will verify and confirm your order!`);
  
  // Reset cart after redirect
  cart.length = 0;
  updateCart();
  toggleCart();
});


