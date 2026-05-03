import React, { useState, useEffect } from 'react';
import endpoints, { BASE_URL } from '../../endpoints/endpoints';
import { useParams } from 'react-router-dom';
import { getAuthHeader } from '../../src/utils/auth';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user_uuid } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = user_uuid
          ? `${endpoints.profile}?user_uuid=${encodeURIComponent(user_uuid.trim())}`
          : endpoints.profile;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            ...getAuthHeader() // ✅ JWT (optional)
          }
        });

        const data = await res.json();
        console.log("PROFILE RESPONSE:", data);

        // ✅ always normalize shape
        setUserProfile({
          isOwnProfile: !!data.isOwnProfile,
          posts: Array.isArray(data.posts) ? data.posts : []
        });

      } catch (err) {
        console.error(err);
        setUserProfile({ isOwnProfile: false, posts: [] });
      }
    };

    fetchProfile();
  }, [user_uuid]);

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

 return (
  <div className="main-content">
    {/* ================= PROFILE HEADER ================= */}
    <div className="profile-header">
      <img
        src={
          userProfile.posts[0]?.Profile_photo
            ? `${BASE_URL}/${encodeURI(userProfile.posts[0].Profile_photo)}`
            : `${BASE_URL}/uploads/default-profile.png`
        }
        alt="Profile"
      />

      <div>
        <h2>{userProfile.posts[0]?.Username || "User"}</h2>
        <p>{userProfile.posts[0]?.Major}</p>
        <span>{userProfile.posts.length} Posts</span>
      </div>
    </div>

    {/* ================= POSTS ================= */}
    <div className="profile-posts">
      {userProfile.posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        userProfile.posts.map((post) => (
          <div className="post-card profile-post-card" key={post.id}>
            {/* Header */}
            <div className="post-card-header">
              <div className="user-info">
                <img
                  src={
                    post.Profile_photo
                      ? `${BASE_URL}/${encodeURI(post.Profile_photo)}`
                      : `${BASE_URL}/uploads/default-profile.png`
                  }
                  alt=""
                />
                <span>{post.Username}</span>
              </div>
              <span className="post-date">{post.Created_at}</span>
            </div>

            {/* Description */}
            <p className="post-desc">
              {post.Description}
            </p>

            {/* Media */}
            {Array.isArray(post.media) && post.media.length > 0 && (
              <div className="post-media profile-media">
                {post.media[0].Media_type === "image" ? (
                  <img
                    src={`${BASE_URL}/${encodeURI(post.media[0].Media_url)}`}
                    alt=""
                  />
                ) : (
                  <video
                    src={`${BASE_URL}/${encodeURI(post.media[0].Media_url)}`}
                    controls
                  />
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

};

export default Profile;
