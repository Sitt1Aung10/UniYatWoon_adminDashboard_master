import React from "react";
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header className="admin-header">
      {/* Left */}
      <h1 className="header-title">Dashboard</h1>

      {/* Right */}
      {token && (
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
