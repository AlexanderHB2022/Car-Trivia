import React from "react";

export default function TopBar({ title, actionIcon = "❓", onAction }) {
  return (
    <div
      className="top-bar"
      style={{ backdropFilter: "blur(4px)", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
    >
      <div className="top-bar-spacer" />
      <h1>{title}</h1>
      <button className="give-up-btn" onClick={onAction}>
        {actionIcon}
      </button>
    </div>
  );
}
