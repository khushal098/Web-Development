export const SHOES = [
  { id: 1, name: "White Casual Sneaker", price: 70, image: "images/white-casual-sneaker.jpeg" },
  { id: 2, name: "MACTREE Men's Mid Top Ankle Boots", price: 90, image: "images/mactree-boots.jpeg" },
  { id: 3, name: "Campus Men's Sneakers", price: 50, image: "images/campus-sneakers.jpeg" },
  { id: 4, name: "Campus Men's OG-03 Sneakers", price: 75, image: "images/Campus Men's OG-03 Sneakers.jpeg" },
  { id: 5, name: "ASIAN Men's Sports Shoes", price: 68, image: "images/ASIAN Mens Thar-13 Sneaker.jpeg" },
  { id: 6, name: "ASIAN Mens Thar-13 Sneaker", price: 120, image: "images/ASIAN Men's Sports Shoes.jpeg" },
  { id: 7, name: "ASIAN Men's AIRWEAVE-02 Sports Shoes", price: 40, image: "images/ASIAN Men's AIRWEAVE-02 Sports Shoes.jpeg" },
];

// Leading "/" keeps image paths working on every route (/ and /payment)
export const imgSrc = (path) => encodeURI("/" + path);
