import React, { useState, useEffect } from "react";
import endpoints, { BASE_URL } from "../../endpoints/endpoints";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../src/utils/auth";
import "../../src/App.css";
import { filterByQuery } from "../../src/utils/search";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [totalUsers, setTotalusers] = useState(0);
  const [banLoadingUUID, setBanLoadingUUID] = useState(null);

  const navigate = useNavigate();

  const isBanned = (banUntil) => {
    if (!banUntil) return false;
    return new Date(banUntil).getTime() > Date.now();
  };

const fetchUsers = () => {
  fetch(endpoints.users, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Fetched users:", data); // check this
      setUsers(data.users || []);
      setTotalusers(data.total_users || 0);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      setUsers([]);
    });
};

useEffect(() => {
  fetchUsers();
}, []);




  const handleban_unban = async (e, user_uuid) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) return;

    setBanLoadingUUID(user_uuid);

    try {
      const res = await fetch(endpoints.ban_account, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ user_uuid }),
      });

      const data = await res.json();

      setUsers((prev) =>
        prev.map((u) =>
          u.user_uuid === user_uuid ? { ...u, Ban_until: data.Ban_until } : u
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setBanLoadingUUID(null);
      fetchUsers();
    }
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="content-header">
        <h1>Users</h1>
        <span>Total Users: {totalUsers}</span>
        <input
          className="search-input"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginLeft: "12px", padding: "6px", minWidth: "200px" }}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Major</th>
              <th>Year</th>
              <th>Role</th>
              <th>NRC</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterByQuery(users, query, [
              "Username",
              "Phone",
              "Email",
              "Major",
              "Year",
              "role",
              "NRC",
            ]).map((user) => (
              <tr key={user.user_uuid}>
                <td className="user-cell">
                  <img
                    src={`${BASE_URL}/${encodeURI(user.Profile_photo)}`}
                    alt={user.Username}
                  />
                  <span>{user.Username}</span>
                </td>

                <td>{user.Phone}</td>
                <td>{user.Email}</td>
                <td>{user.Major}</td>
                <td>{user.Year}</td>
                <td>{user.role}</td>
                <td>{user.Student_nrc}</td>

                <td className="action-cell">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/profile/${user.user_uuid}`)}
                  >
                    View
                  </button>

                  <button
                    className="ban-btn"
                    disabled={
                      banLoadingUUID === user.user_uuid ||
                      isBanned(user.Ban_until)
                    }
                    onClick={(e) => handleban_unban(e, user.user_uuid)}
                  >
                    {banLoadingUUID === user.user_uuid
                      ? "..."
                      : isBanned(user.Ban_until)
                      ? "Banned"
                      : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
