import React, { use } from 'react'
import endpoints from '../../endpoints/endpoints'
import { BASE_URL } from '../../endpoints/endpoints'
import { useState, useEffect } from 'react'
import { filterByQuery } from '../../src/utils/search'
import '../Posts/postCss.css'
import { getAuthHeader } from '../../src/utils/auth'

const Fetchreportposts = () => {
  const [reportPosts, setReportPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${endpoints.fetchreportposts}`, {
      headers: {
        ...getAuthHeader()
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then(data => {
        // Safety: guarantee media exists
        const normalized = data.map(r => ({
          ...r,
          media: Array.isArray(r.media) ? r.media : []
        }));

        setReportPosts(normalized);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load reports");
      })
      .finally(() => setLoading(false));
  }, []);

  const mediaStyle = {
    minWidth: "330px",
    objectFit: "contain",
    scrollSnapAlign: "start",
  };

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: "5px",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    fontSize: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 2,
  });



  const handleDelete = async (Reported_post_id) => {
  if (!Reported_post_id) {
    alert("Invalid post ID");
    return;
  }

  try {
    const res = await fetch(endpoints.deletePost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader()
      },
      body: JSON.stringify({ Reported_post_id }) // string is fine
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.message || "Delete failed");

    // Remove from UI
    setReportPosts(prev =>
      prev.filter(r => r.Reported_post_id !== Reported_post_id)
    );

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reportpost_container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <h2>Reported Posts</h2>
        <input
          className="search-input"
          placeholder="Search reports..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginLeft: "12px", padding: "6px", minWidth: "240px" }}
        />
      </div>
      {reportPosts.length === 0 && <p>No reports found.</p>}

      {filterByQuery(reportPosts, query, ["Reporter_username", "Reason", "Username", "Description"]).map(report => (
        <div className="reportpostCard" key={report.id}>
          <h2>Reported Post</h2>

          <p><strong>Reporter:</strong> {report.Reporter_username}</p>
          <p><strong>Reason:</strong> {report.Reason}</p>
          <p><strong>Post Owner : {report.Username} </strong></p>
          <p
            style={{
              maxHeight: expandedPost === report.Reported_post_id ? "1000px" : "20px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            {report.Description}
          </p>

          {/* MEDIA */}
          {/* MEDIA */}
          {report.media.length > 0 && (
            <div style={{ position: "relative", width: "330px" }}>

              {/* LEFT ARROW */}
              <button
                onClick={(e) => {
                  const box = e.currentTarget.nextSibling;
                  box.scrollBy({ left: -330, behavior: "smooth" });
                }}
                style={arrowStyle("left")}
              >
                ‹
              </button>

              {/* MEDIA CONTAINER */}
              <div
                className="hide-scrollbar"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                }}
              >
                {report.media.map((m, idx) =>
                  m.Media_type === "image" ? (
                    <img
                      key={idx}
                      src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                      alt="post media"
                      style={mediaStyle}
                    />
                  ) : (
                    <video
                      key={idx}
                      controls
                      src={`${BASE_URL}/${encodeURI(m.Media_url)}`}
                      style={mediaStyle}
                    />
                  )
                )}
              </div>

              {/* RIGHT ARROW */}
              <button
                onClick={(e) => {
                  const box = e.currentTarget.previousSibling;
                  box.scrollBy({ left: 330, behavior: "smooth" });
                }}
                style={arrowStyle("right")}
              >
                ›
              </button>

              <br />
              <button
                onClick={() => handleDelete(report.Reported_post_id)}
                style={{ backgroundColor: "red", color: "black", fontWeight: "bolder" }}
              >
                Delete Post
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
export default Fetchreportposts