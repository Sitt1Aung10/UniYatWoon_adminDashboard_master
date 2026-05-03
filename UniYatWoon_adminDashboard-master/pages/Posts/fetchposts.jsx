import React, { useState, useEffect } from 'react';
import endpoints, { BASE_URL } from '../../endpoints/endpoints';
// import Reportposts from './reportposts';
import '../Posts/postCss.css';
import { filterByQuery } from '../../src/utils/search';
import { getAuthHeader } from '../../src/utils/auth';

const Fetchposts = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('normal');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);
  const [savingPostId, setSavingPostId] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);

  const isAdmin = localStorage.getItem("is_admin") === "1";


  /* ===================== FETCH POSTS ===================== */

  useEffect(() => {
    let url = `${endpoints.fetchposts}?type=${activeTab}&page=${currentPage}`;

    fetch(url, {
      headers: {
        ...getAuthHeader()
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("FETCH POSTS RESPONSE:", data);

        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotalPages(data.total_pages || 1);
        } else {
          setPosts([]);
        }
      })
      .catch(err => {
        console.error(err);
        setPosts([]);
      });

  }, [activeTab, currentPage]);



  const fetchCommentsForPost = async (postId) => {
    setSelectedPostId(postId);
    try {
      const res = await fetch(endpoints.comment, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ post_id: postId, page: 1 }),
      });
      const data = await res.json();
      setCommentsMap((prev) => ({ ...prev, [postId]: data.comments || [] }));
    } catch (err) {
      console.error(err);
      setCommentsMap((prev) => ({ ...prev, [postId]: [] }));
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      console.log("Deleting post ID:", postId);

      const res = await fetch(endpoints.deletePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          post_id: Number(postId), // make sure it's a number
        }),
      });

      const data = await res.json();
      console.log("Delete response:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to delete post");
      }

      alert(data.message || "Post deleted successfully");

      // Remove from UI immediately
      setPosts((prev) => prev.filter((post) => post.id !== postId));

    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete the post");
    }
  };


  const mediaStyle = {
    minWidth: "330px",
    objectFit: "contain",
    scrollSnapAlign: "start"
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

  return (
    <div className="main-content">
      {/* Page header */}
      <div className="content-header">
        <h1>Posts</h1>
        <input
          className="search-input"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginLeft: "12px", padding: "6px", minWidth: "240px" }}
        />
      </div>

      {/* Tabs */}
      <div className="post-tabs">
        <button
          className={activeTab === "normal" ? "active" : ""}
          onClick={() => {
            setActiveTab("normal");
            setCurrentPage(1);
          }}
        >
          Posts
        </button>
        <button
          className={activeTab === "lost_found" ? "active" : ""}
          onClick={() => {
            setActiveTab("lost_found");
            setCurrentPage(1);
          }}
        >
          Lost & Found
        </button>
        <button
          className={activeTab === "announcement" ? "active" : ""}
          onClick={() => {
            setActiveTab("announcement");
            setCurrentPage(1);
          }}
        >
          Announcements
        </button>
        <button
          className={activeTab === "marketplace" ? "active" : ""}
          onClick={() => {
            setActiveTab("marketplace");
            setCurrentPage(1);
          }}
        >
          Marketplace
        </button>
      </div>

      {/* Posts Grid */}
      <div className="post-grid">
        {filterByQuery(posts, query, ["Description", "Username"]).map((post) => (
          <div className="post-card" style={{ position: 'relative' }} key={post.id}>
            <button className='bg-white' style={{ color: 'red', fontWeight: 'bold', position: 'absolute', right: '10px', top: '10px' }} onClick={() => deletePost(post.id)}>Delete Post</button>
            {/* Header */}
            <div className="post-card-header">
              <div className="user-info">
                <img
                  src={`${BASE_URL}/${encodeURI(post.Profile_photo)}`}
                  alt=""
                />
                <span>{post.Username}</span>
              </div>
              <span className="post-date">{post.Created_at}</span>
            </div>

            {/* Description */}
            <p className="post-desc">
              {expandedPost === post.id
                ? post.Description
                : post.Description.slice(0, 120)}

              {post.Description.length > 120 && (
                <span
                  className="see-more"
                  onClick={() =>
                    setExpandedPost(
                      expandedPost === post.id ? null : post.id
                    )
                  }
                >
                  {expandedPost === post.id ? " See less" : " See more"}
                </span>
              )}
            </p>

            {/* Media */}
            <div className="post-media">
              {post.media.length > 0 &&
                (post.media[0].Media_type === "image" ? (
                  <img
                    src={`${BASE_URL}/${encodeURI(
                      post.media[0].Media_url
                    )}`}
                    alt=""
                  />
                ) : (
                  <video
                    src={`${BASE_URL}/${encodeURI(
                      post.media[0].Media_url
                    )}`}
                    controls
                  />
                ))}
            </div>

            {/* Actions: likes & comments counts */}
            <div className="post-actions">
              <span className="like-count">❤️ {post.like_count ?? 0}</span>
              <button
                className="comment-btn"
                onClick={() => fetchCommentsForPost(post.id)}
              >
                💬 {post.comment_count ?? 0}
              </button>
            </div>

            {/* Comments section */}
            {selectedPostId === post.id && (
              <div className="comments-section">
                <div className="comments-list">
                  {(commentsMap[post.id] || []).map((c) => (
                    <div
                      key={c.id}
                      className={`comment-item ${c.reply_to_username ? 'comment-reply' : ''}`}
                    >
                      <div className="comment-header">
                        <img
                          className="comment-avatar"
                          src={`${BASE_URL}/${encodeURI(c.Profile_photo || '')}`}
                          alt={c.Username}
                        />

                        <div className="comment-meta">
                          <div className="comment-name">
                            <strong>{c.Username}</strong>
                            {c.reply_to_username && (
                              <span className="reply-badge">reply to <strong>{c.reply_to_username}</strong></span>
                            )}
                          </div>
                          <div className="comment-time">{c.Created_at}</div>
                        </div>
                      </div>

                      <div className="comment-body">{c.Description}</div>

                      <div className="comment-divider" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );


};

export default Fetchposts;
