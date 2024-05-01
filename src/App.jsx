import React from "react";
import "./App.css"; // Import your external CSS file for styling

const App = () => {
  return (
    <div className="landing-page">
      <img
        src="https://www.rockarchive.com/media/3620/spines-spines005keha.jpg?crop=0.11492281303602059,0.11320754716981132,0.11320754716981132,0.11492281303602059&cropmode=percentage&width=480&height=480&rnd=133141109250000000"
        alt="Stowaway Records"
        className="background-image"
      />
      <div className="overlay">
        <h1>Welcome To Stowaway Records</h1>
      </div>
    </div>
  );
};

export default App;
