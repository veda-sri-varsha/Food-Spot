// import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const handleClick = () => {
    console.log("User started");
  };

  return (
    <div className="home">
      <img
        src="https://i.pinimg.com/474x/e6/17/f1/e617f1bfb9af4d9cf132cd3dec0da072.jpg"
        alt="logo"
        // style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "12px" }}
      />
      <h1>Welcome to the Food-Court</h1>
      <p>We are glad to have you here.</p>

      <Link to="/FoodList">
        <button className="start" onClick={handleClick}>
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
