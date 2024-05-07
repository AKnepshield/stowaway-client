import React from "react";

export const HomePage = () => {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url("https://www.rockarchive.com/media/3620/spines-spines005keha.jpg?crop=0.11492281303602059,0.11320754716981132,0.11320754716981132,0.11492281303602059&cropmode=percentage&width=800&height=800&rnd=133141109250000000&overlay=watermark.png&overlay.size=230,20&overlay.position=0,780")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Set minimum height to cover the viewport height
        display: "flex", // Use flexbox to center content vertically
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
        flexDirection: "column", // Align content in a column
        color: "#ffffff", // Set text color to white
        textAlign: "center", // Center text horizontally
      }}
    >
      <div style={{ backgroundColor: "black", padding: "20px" }}>
        <h1>Welcome To Stowaway Records</h1>
      </div>
    </div>
  );
};
