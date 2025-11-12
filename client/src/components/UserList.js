import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [API_URL]);

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.name} - {u.email}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
