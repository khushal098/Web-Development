
const services = [
  { name: "Dry Cleaning",          price: 200,  img: "images/dry-cleaning.jpg",   icon: "🧺" },
  { name: "Leather & Suede Cleaning", price: 999, img: "images/leather-suede.jpg", icon: "🛋️" },
  { name: "Ironing",               price: 30,   img: "images/ironing.jpg",        icon: "👔" },
  { name: "Wedding Dress Cleaning", price: 2400, img: "images/wedding-dress.jpg", icon: "👰" },
  { name: "Wash And Fold",         price: 140,  img: "images/wash-fold.jpg",      icon: "🧼" },
  { name: "Stain Removal",         price: 500,  img: "images/stain-removal.jpg",  icon: "👕" }
];

let currentIndex = 0;  
let cart = [];         


const cartBody     = document.getElementById("cartBody");
const totalAmount  = document.getElementById("totalAmount");
const serviceBox   = document.getElementById("service");
const serviceImg   = document.getElementById("serviceImg");
const serviceName  = document.getElementById("serviceName");
const servicePrice = document.getElementById("servicePrice");
const doneBox      = document.getElementById("doneBox");
const addBtn       = document.getElementById("addBtn");
const skipBtn      = document.getElementById("skipBtn");
const bookBtn      = document.getElementById("bookBtn");
const message      = document.getElementById("message");
const fullName     = document.getElementById("fullName");
const email        = document.getElementById("email");
const phone        = document.getElementById("phone");
const logoutBtn    = document.getElementById("logoutBtn");


const formatPrice = (n) => "₹" + n.toFixed(2);


function showService() {
  if (currentIndex >= services.length) {
    serviceBox.hidden = true;
    doneBox.hidden = false;
    return;
  }

  const s = services[currentIndex];
  serviceName.textContent = s.name;
  servicePrice.textContent = formatPrice(s.price);

  serviceImg.textContent = "";
  serviceImg.style.backgroundImage = "";
  const test = new Image();
  test.onload = () => { serviceImg.style.backgroundImage = `url("${s.img}")`; };
  test.onerror = () => { serviceImg.textContent = s.icon; };
  test.src = s.img;
}

function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-cart">
        <div class="info-icon">i</div>
        <p class="empty-title">No Items Added</p>
        <p class="empty-sub">Add items to the cart from the services bar</p>
      </div>`;
  } else {
    cart.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <span>${i + 1}</span>
        <span>${item.name}</span>
        <span>${formatPrice(item.price)}</span>`;
      cartBody.appendChild(row);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = total === 0 ? "₹ 0" : "₹ " + total.toFixed(2);

  bookBtn.disabled = cart.length === 0;
}

addBtn.addEventListener("click", () => {
  if (currentIndex >= services.length) return;
  cart.push(services[currentIndex]);
  currentIndex++;
  renderCart();
  showService();
  clearMessage();
});

skipBtn.addEventListener("click", () => {
  if (currentIndex >= services.length) return;
  currentIndex++;
  showService();
});

// ---------- Booking ----------
function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

bookBtn.addEventListener("click", () => {
  const nameVal  = fullName.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();

  [fullName, email, phone].forEach((el) => el.classList.remove("invalid"));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  const phoneOk = /^\d{10}$/.test(phoneVal);

  if (nameVal === "") {
    fullName.classList.add("invalid");
    showMessage("Enter your full name.", "error");
    return;
  }
  if (!emailOk) {
    email.classList.add("invalid");
    showMessage("Enter a valid email address.", "error");
    return;
  }
  if (!phoneOk) {
    phone.classList.add("invalid");
    showMessage("Enter a 10-digit phone number.", "error");
    return;
  }

  showMessage("Thank you for contacting, we will get back to you soon", "success");


  fullName.value = "";
  email.value = "";
  phone.value = "";
  cart = [];
  renderCart();
});


logoutBtn.addEventListener("click", () => {
  alert("You have been logged out.");
});


renderCart();
showService();