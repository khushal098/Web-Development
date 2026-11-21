import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" required value={form.name} onChange={onChange} />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={onChange} />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required minLength={6} value={form.password} onChange={onChange} />
        <button className="btn btn-block" type="submit">SIGN UP</button>
        <p className="auth-alt">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
