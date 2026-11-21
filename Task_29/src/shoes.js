export const SHOES = [
  { id: 1, name: "White Casual Sneaker", price: 70, image: "images/white-casual-sneaker.jpeg" },
  { id: 2, name: "MACTREE Men's Mid Top Ankle Boots", price: 90, image: "images/mactree-boots.jpeg" },
  { id: 3, name: "Campus Men's Sneakers", price: 50, image: "images/campus-sneakers.jpeg" },
  { id: 4, name: "Campus Men's OG-03 Sneakers", price: 75, image: "images/campus-og-03.jpeg" },
  { id: 5, name: "ASIAN Men's Sports Shoes", price: 68, image: "images/asian-sports-shoes.jpeg" },
  { id: 6, name: "ASIAN Mens Thar-13 Sneaker", price: 120, image: "images/asian-thar-13.jpeg" },
  { id: 7, name: "ASIAN Men's AIRWEAVE-02 Sports Shoes", price: 40, image: "images/asian-airweave-02.jpeg" },
];

// Works with the Vite base path (/shoes-cart-app/) in dev and on GitHub Pages
export const imgSrc = (path) => import.meta.env.BASE_URL + path;