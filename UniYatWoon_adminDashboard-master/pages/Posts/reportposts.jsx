// components/Posts/reportposts.jsx
import React, { useState } from "react";
import endpoints from "../../endpoints/endpoints";
import "../Posts/postCss.css";

const Reportposts = ({ post_id, onReportComplete }) => {
  const [reason, setReason] = useState("");

  const handleReport = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post_id", post_id);
    formData.append("Reason", reason);

    try {
      const res = await fetch(endpoints.reportposts, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to report post");

      setReason("");
      onReportComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reported-card">
      <h3 className="reported-title">Reported Post</h3>

      <div className="reported-body">
        {/* LEFT INFO */}
        <div className="reported-info">
          <div className="info-row">
            <span>Reporter</span>
            <strong>Aung Si Phyo</strong>
          </div>

          <div className="info-row">
            <span>Reason</span>
            <strong>{reason || "-"}</strong>
          </div>

          <div className="info-row">
            <span>Post Owner</span>
            <strong>Htet Linn Htoo</strong>
          </div>

          <button className="delete-btn">Delete Post</button>
        </div>

        {/* RIGHT POST PREVIEW */}
        <div className="reported-preview">
          <div className="preview-header">
            <strong>Htet Linn Htoo</strong>
            <span>13-01-2026 22:28</span>
          </div>

          <p className="preview-text">
            Lorem ipsum dolor sit amet consectetur. Feugiat sed lorem velit
            sapien faucibus sed posuere egestas augue.
          </p>

          <div className="preview-media" />
        </div>
      </div>

      {/* REPORT FORM */}
      <form className="reportForm" onSubmit={handleReport}>
        <div className="reportReasons">
          {[
            { v: "spam", l: "Spam" },
            { v: "abuse", l: "Abusive Content" },
            { v: "nudity", l: "Nudity" },
            { v: "false_information", l: "False Information" },
          ].map((r) => (
            <label key={r.v}>
              <input
                type="radio"
                name="Reason"
                value={r.v}
                checked={reason === r.v}
                onChange={(e) => setReason(e.target.value)}
              />
              {r.l}
            </label>
          ))}
        </div>

        <button className="submit-report" type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Reportposts;
