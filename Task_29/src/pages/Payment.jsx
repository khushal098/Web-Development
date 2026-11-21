import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { imgSrc } from "../shoes";

export default function Payment() {
  const { cart, total, clearCart } = useCart(); // cart comes from Context
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [paid, setPaid] = useState(false);

  const handleChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });

  const handleConfirm = (e) => {
    e.preventDefault();
    setPaid(true);
    clearCart();
  };

  if (paid) {
    return (
      <main className="layout">
        <div className="success">
          <h2>Payment Successful!</h2>
          <p>Thank you for shopping with us.</p>
          <button className="primary-btn" onClick={() => navigate("/")}>Back to Shop</button>
        </div>
      </main>
    );
  }

  return (
    <main className="layout">
      <section className="payment">
        <div className="methods">
          <label>
            <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
            Cash on Delivery
          </label>
          <label>
            <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} />
            Credit Card
          </label>
        </div>

        <form onSubmit={handleConfirm}>
          {method === "card" && (
            <div className="card-form">
              <label>Enter your card number:</label>
              <input name="number" placeholder="Card Number" value={card.number}
                onChange={handleChange} maxLength={16} pattern="\d{16}" title="16 digit card number" required />
              <label>Enter your card's expiry date:</label>
              <input name="expiry" placeholder="MM/YY" value={card.expiry}
                onChange={handleChange} maxLength={5} pattern="(0[1-9]|1[0-2])\/\d{2}" title="MM/YY" required />
              <label>Enter your CVV number:</label>
              <input name="cvv" type="password" placeholder="CVV" value={card.cvv}
                onChange={handleChange} maxLength={3} pattern="\d{3}" title="3 digit CVV" required />
            </div>
          )}
          <button type="submit" className="primary-btn confirm" disabled={cart.length === 0}>
            Confirm Payment
          </button>
        </form>
      </section>

      <aside className="cart">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={imgSrc(item.image)} alt={item.name} />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>${item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
        <h3 className="total">Total: ${total.toFixed(2)}</h3>
        <button className="primary-btn" onClick={() => navigate("/")}>Go back to Shopping</button>
      </aside>
    </main>
  );
}
