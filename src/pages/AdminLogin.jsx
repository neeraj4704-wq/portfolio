import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";

import "../styles/AdminLogin.css";

function AdminLogin() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin/dashboard");

    } catch (err) {

      setError(err.message);

    }

  };

  return (

    <div className="admin-login">

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <h1>Portfolio CMS</h1>

        <p>Sign in to manage your projects</p>

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && (
          <p style={{color:"red",marginTop:"15px"}}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default AdminLogin;