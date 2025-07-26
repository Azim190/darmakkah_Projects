
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.error || "فشل تسجيل الدخول");
    }
  };

  return (
    <div>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="الإيميل" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" required />
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}
