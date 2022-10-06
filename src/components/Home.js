import React from "react";
import Search from "./Search";
import logo from "../logo.png";
import background from "../background.jpg";

const Home = () => {
  return (
    <div
      className="flexbox home"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={logo} alt="logo" className="logo" />
      <div className="flexbox title-and-search">
        <h1>Input a Summoner Name:</h1>
        <Search className="homeSearch" />
      </div>
    </div>
  );
};

export default Home;
