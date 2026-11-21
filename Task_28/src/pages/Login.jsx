import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Demo only: a real app would call an API here.
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={onChange} />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required minLength={6} value={form.password} onChange={onChange} />
        <button className="btn btn-block" type="submit">LOGIN</button>
        <p className="auth-alt">New here? <Link to="/signup">Create an account</Link></p>
      </form>
    </div>
  );
}
