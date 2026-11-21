import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { SHOES, imgSrc } from "../shoes";

export default function Shop() {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <main className="layout">
      <section className="shoe-list">
        {SHOES.map((shoe) => (
          <article className="shoe-card" key={shoe.id}>
            <img src={imgSrc(shoe.image)} alt={shoe.name} />
            <div className="shoe-info">
              <h3>{shoe.name}</h3>
              <p>${shoe.price}</p>
              <button onClick={() => addToCart(shoe)}>Add to Cart</button>
            </div>
          </article>
        ))}
      </section>

      <aside className="cart">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={imgSrc(item.image)} alt={item.name} />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <div className="qty">
              <button onClick={() => removeFromCart(item.id)} aria-label="Decrease quantity">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)} aria-label="Increase quantity">+</button>
            </div>
          </div>
        ))}
        <h3 className="total">Total: ${total.toFixed(2)}</h3>
        <button
          className="primary-btn"
          disabled={cart.length === 0}
          onClick={() => navigate("/payment")}
        >
          Proceed to Payment
        </button>
      </aside>
    </main>
  );
}
