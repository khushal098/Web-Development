# FreshFold – Laundry Service Web App

A responsive single-page website for a laundry service. Visitors can browse services, add or remove them from a cart, see the running total, and book an appointment. When they click **Book now**, the order details are emailed to the shop owner using [EmailJS](https://www.emailjs.com/).

## Features

- Sticky navigation (Home, Services, About Us, Contact Us) with smooth scrolling and active-link highlighting
- Hero section, achievements band, feature highlights, newsletter signup and footer
- Services list with **Add Item / Remove Item** toggle buttons
- Live "Added Items" table with serial numbers and total amount (₹)
- Booking form with validation (name, email, 10-digit phone, non-empty cart)
- Order email sent through EmailJS, with a generated order ID
- Success and error messages shown inline; cart resets after a successful booking
- Mobile-friendly layout with a collapsible menu

## Project Structure

```
laundry-service/
├── index.html   # Page structure
├── style.css    # Styling and responsive layout
├── script.js    # Cart logic, validation, EmailJS
└── README.md
```

### Run it
Open `index.html` in a browser, or use a local server such as the VS Code **Live Server** extension.

## How to Use

1. Click **Add Item** next to each service you want. Click **Remove Item** to take it out.
2. Check the Added Items table and total.
3. Fill in your name, email and phone number.
4. Click **Book now**. You'll see a confirmation with your order ID, and the order email arrives in your inbox.

## Customising

- **Services and prices:** edit the `SERVICES` array in `script.js`.
- **Colours:** change the CSS variables at the top of `style.css`.
- **Shop name:** replace "FreshFold" in `index.html`.

## Troubleshooting

| Problem | Fix |
|---|---|
| "We couldn't send your booking" | Check the three EmailJS keys and that the template variable names match exactly. |
| No email received | Check your spam folder and the **To Email** field in the template. |
| Nothing happens on Book now | Open the browser console (F12) to see the error. |

## Tech Stack

HTML5, CSS3, vanilla JavaScript, EmailJS browser SDK (loaded from CDN).
