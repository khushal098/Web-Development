import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Go to home">
        <span className="logo-mark">U</span>
        <span className="logo-text">UpskillMafia</span>
      </Link>

      <nav className="nav" aria-label="Main">
        <NavLink to="/" end className="nav-title">Home</NavLink>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
      </nav>

      <div className="auth-buttons">
        <Link to="/login" className="btn btn-small">Login</Link>
        <Link to="/signup" className="btn btn-small">SignUp</Link>
      </div>
    </header>
  );
}
