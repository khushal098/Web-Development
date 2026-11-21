import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">S</div>
      <Link to="/">Home</Link>
      <a href="#categories">Categories</a>
      <a href="#about">About Us</a>
    </nav>
  );
}
