import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import { AuthService } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = AuthService.login({ email, password });
      login({ name: user.name || "Demo User", email: user.email, token: user.token });
      nav("/showTime");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formPanel}>
        <h2>Login</h2>
        <p>Logging into CineFLEX will give you access to full videos and movies. You can sit back, relax and watch at your home.</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className={styles.loginBtn} type="submit">LOGIN</button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
