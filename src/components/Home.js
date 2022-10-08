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
        <h1>Enter a Summoner Name:</h1>
        <Search className="homeSearch" inputClassName="homeSearchInputs" />
      </div>
      <div className="filler"></div>
      <a
        href="https://github.com/midorinom/lol_player_searcher"
        target="_blank"
      >
        <button id="githubButton">Github Repo</button>
      </a>
    </div>
  );
};

export default Home;
