import React from "react";
import HomePage from "../components/HomePage";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Kisan Sarthi</h1>
      <p>Empowering farmers with the best rental solutions.</p>

      <div className="mt-5">
        <HomePage />
      </div>
    </div>
  );
};

export default Home;
