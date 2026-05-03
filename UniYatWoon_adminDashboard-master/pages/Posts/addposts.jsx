import React, { useState } from 'react'
import endpoints from '../../endpoints/endpoints'
import { getAuthHeader } from '../../src/utils/auth'

const Addposts = () => {
  const [Description, setDescription] = useState("");
  const [Media, setMedia] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Description", Description);

    if (Media) {
      formData.append("media[]", Media); // PHP expects media[]
    }

    const res = await fetch(endpoints.addposts, {
      method: "POST",
      headers: {
        ...getAuthHeader(), // add JWT for authenticated uploads
      },
      body: formData // ❗ NO Content-Type when sending FormData
    });

    // const data = await res.json();
    // console.log("POST RESPONSE:", data);
    const text = await res.text();
    console.log("RAW RESPONSE:", text);

  };

  return (
    <form onSubmit={handlePost}>
      <input
        type="text"
        name="Description"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        name="media"
        onChange={(e) => setMedia(e.target.files[0])}
      />

      <select>
        <option onChange={e.target.value} value="normal">Normal Post</option>
        <option onChange={e.target.value} value="lost_found">Lost & Found</option>
        <option onChange={e.target.value} value="announcement">Announcement</option>
      </select>

      <button type="submit">Post</button>
    </form>
  );
};

export default Addposts;
