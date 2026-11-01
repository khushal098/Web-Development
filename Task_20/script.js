/* =========================================================
   FreshFold Laundry Services – script.js
   ========================================================= */

/* ---------- 1. EmailJS configuration (REPLACE THESE) ---------- */
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // Account > General > Public Key
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // Email Services > Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Email Templates > Template ID

/* ---------- 2. Data ---------- */
const SERVICES = [
  { id: 1, name: "Dry Cleaning",          price: 200,  icon: "👔" },
  { id: 2, name: "Wash & Fold",           price: 100,  icon: "🧺" },
  { id: 3, name: "Ironing",               price: 30,   icon: "♨️" },
  { id: 4, name: "Stain Removal",         price: 500,  icon: "✨" },
  { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "🧥" },
  { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👰" }
];

let cart = []; // array of service ids, kept in the order they were added

/* ---------- 3. DOM references ---------- */
const serviceList = document.getElementById("serviceList");
const cartBody    = document.getElementById("cartBody");
const totalEl     = document.getElementById("totalAmount");
const form        = document.getElementById("bookingForm");
const formMsg     = document.getElementById("formMsg");
const bookBtn     = document.getElementById("bookBtn");
const userChip    = document.getElementById("userChip");
const navToggle   = document.getElementById("navToggle");
const navLinks    = document.getElementById("navLinks");

/* ---------- 4. Helpers ---------- */
const formatINR = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const getService = (id) => SERVICES.find((s) => s.id === id);
const cartTotal  = () => cart.reduce((sum, id) => sum + getService(id).price, 0);

function showMessage(el, text, type) {
  el.textContent = text;
  el.className = el.className.split(" ")[0] + (type ? " " + type : "");
}

/* ---------- 5. Render services ---------- */
function renderServices() {
  serviceList.innerHTML = "";
  SERVICES.forEach((s) => {
    const added = cart.includes(s.id);
    const li = document.createElement("li");
    li.className = "service-item";
    li.innerHTML = `
      <span class="service-name">
        <span aria-hidden="true">${s.icon}</span>
        ${s.name}
        <span class="sep">•</span>
        <span class="price">${formatINR(s.price)}</span>
      </span>
      <button type="button" class="svc-btn ${added ? "added" : ""}" data-id="${s.id}"
              aria-pressed="${added}">
        ${added ? "Remove Item ⊖" : "Add Item ⊕"}
      </button>`;
    serviceList.appendChild(li);
  });
}

/* ---------- 6. Render cart ---------- */
function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = `<tr class="empty-row"><td colspan="3">No items added yet.</td></tr>`;
  } else {
    cartBody.innerHTML = cart
      .map((id, i) => {
        const s = getService(id);
        return `<tr><td>${i + 1}</td><td>${s.name}</td><td>${formatINR(s.price)}</td></tr>`;
      })
      .join("");
  }
  totalEl.textContent = formatINR(cartTotal());
}

function refresh() {
  renderServices();
  renderCart();
}

/* ---------- 7. Add / Remove (event delegation) ---------- */
serviceList.addEventListener("click", (e) => {
  const btn = e.target.closest(".svc-btn");
  if (!btn) return;
  const id = Number(btn.dataset.id);

  if (cart.includes(id)) {
    cart = cart.filter((x) => x !== id);
  } else {
    cart.push(id);
  }
  showMessage(formMsg, "", "");
  refresh();
});

/* ---------- 8. Validation ---------- */
function validate(name, email, phone) {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[0-9]{10}$/.test(phone);

  form.fullName.classList.toggle("invalid", !name);
  form.email.classList.toggle("invalid", !emailOk);
  form.phone.classList.toggle("invalid", !phoneOk);

  if (cart.length === 0) return "Add at least one service to your cart before booking.";
  if (!name)    return "Enter your full name.";
  if (!emailOk) return "Enter a valid email address, like name@example.com.";
  if (!phoneOk) return "Enter a 10-digit phone number with no spaces.";
  return "";
}

/* ---------- 9. Book Now → EmailJS ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name  = form.fullName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  const error = validate(name, email, phone);
  if (error) {
    showMessage(formMsg, error, "error");
    return;
  }

  const orderId = "ORD-" + Date.now().toString().slice(-8);
  const itemsText = cart
    .map((id, i) => `${i + 1}. ${getService(id).name} - ${formatINR(getService(id).price)}`)
    .join("\n");

  // Variable names must match the {{placeholders}} in your EmailJS template
  const templateParams = {
    order_id:       orderId,
    customer_name:  name,
    customer_email: email,
    customer_phone: phone,
    order_items:    itemsText,
    total_amount:   formatINR(cartTotal()),
    order_date:     new Date().toLocaleString("en-IN")
  };

  bookBtn.disabled = true;
  bookBtn.textContent = "Booking...";
  showMessage(formMsg, "", "");

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY
    });

    showMessage(formMsg, `Booking confirmed! Your order ID is ${orderId}.`, "success");
    userChip.textContent = name.split(" ")[0];
    cart = [];
    form.reset();
    refresh();
  } catch (err) {
    console.error("EmailJS error:", err);
    showMessage(
      formMsg,
      "We couldn't send your booking. Check your connection and EmailJS keys, then try again.",
      "error"
    );
  } finally {
    bookBtn.disabled = false;
    bookBtn.textContent = "Book now";
  }
});

// Clear red borders as the user fixes a field
["fullName", "email", "phone"].forEach((field) =>
  form[field].addEventListener("input", () => form[field].classList.remove("invalid"))
);
// Keep phone numeric
form.phone.addEventListener("input", () => {
  form.phone.value = form.phone.value.replace(/\D/g, "");
});

/* ---------- 10. Newsletter ---------- */
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name  = document.getElementById("newsName").value.trim();
  const email = document.getElementById("newsEmail").value.trim();
  const msg   = document.getElementById("newsMsg");

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Enter your name and a valid email to subscribe.";
    return;
  }
  msg.textContent = `Thanks, ${name.split(" ")[0]}! You're subscribed.`;
  e.target.reset();
});

/* ---------- 11. Navigation: mobile menu + active link ---------- */
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

const sections = ["home", "services", "about", "contact"].map((id) => document.getElementById(id));
const links = [...navLinks.querySelectorAll("a")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => s && observer.observe(s));

/* ---------- 12. Init ---------- */
if (typeof emailjs !== "undefined") emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
refresh();
