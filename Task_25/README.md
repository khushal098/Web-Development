# Shoe Store (React + useState)

A simple online shoe store built with React. Users can browse shoes, add them to a cart, reduce quantities, and see the total cost. Cart state is managed with the `useState` hook.

## Features

- Shoe list on the left with image, name, and price
- Cart on the right with name, price, and quantity
- **Add to Cart** button on every shoe
- **+ / -** buttons in the cart to change quantity (item is removed at 0)
- Live cart total

## Project Structure

```
shoe-store/
├── public/
│   └── images/        # shoe images go here
└── src/
    ├── App.jsx        # components and cart logic
    └── App.css        # styling
```

## Setup

1. Create a React app (Vite):
   ```
   npm create vite@latest shoe-store -- --template react
   cd shoe-store
   npm install
   ```
2. Replace `src/App.jsx` and `src/App.css` with the files from this project.
3. Add your shoe images to `public/images/` and make sure the file names match the `SHOES` array in `App.jsx`.
4. Start the app:
   ```
   npm run dev
   ```

## How It Works

- `const [cart, setCart] = useState([])` stores the cart items.
- `addToCart(shoe)` adds a new item or increases its quantity by 1.
- `removeFromCart(id)` decreases quantity by 1 and removes the item at 0.
- `total` is the sum of `price × quantity` for all cart items.

## Tech Used

- React
- JavaScript (ES6)
- CSS
