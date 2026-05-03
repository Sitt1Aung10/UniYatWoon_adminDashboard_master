import { useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../../endpoints/endpoints";
import { setToken } from "../../src/utils/auth";
import "./login.css";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email, Password })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        // ✅ save JWT
        setToken(data.token);

        // ✅ save user info (UI / later use)
        const userData = {
          username: data.username,
          user_uuid: data.user_uuid
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // navigate to dashboard/home
        navigate('/');
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      {user ? (
        <div className="welcome">Welcome, {user.username} 👋</div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Admin Login</h2>

          <input
            className="login-input"
            type="email"
            value={Email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            value={Password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
