// src/components/BackToLogin.tsx
import React from 'react';

type Props = {
  forceLogin?: boolean;
};

const BackToLogin: React.FC<Props> = ({ forceLogin = false }) => {
  const LOGIN_URL = "http://localhost:3001/";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (forceLogin) {
      window.location.href = LOGIN_URL;
      return;
    }

    // Normal pages → Go back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = LOGIN_URL;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "58px",         // aligns PERFECTLY with your header
        left: "20px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid #d0d0d0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "16px" }}>←</span>
        <span>Back to login</span>
      </button>
    </div>
  );
};

export default BackToLogin;
