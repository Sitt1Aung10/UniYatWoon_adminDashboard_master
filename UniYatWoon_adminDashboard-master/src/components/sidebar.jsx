import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: "Users", path: "/users" },
    { name: "Posts", path: "/posts" },
    { name: "Report", path: "/reports" },
  ];

  return (
    <>
    <img style={{width:'150px',position:'relative',left:'10px',top:'5px'}} src="/img/uni logo.jpg" alt="Logo" />
    <aside className="admin-sidebar">
      {sidebarItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            className={`sidebar-item ${isActive ? "active" : ""}`}
          >
            {item.name}
          </Link>
        );
      })}
    </aside>
    </>
  );
};

export default Sidebar;
