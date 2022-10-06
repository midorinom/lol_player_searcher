import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import LoadingSpinner from "./LoadingSpinner";
import Search from "./Search";
import BasicInfo from "./BasicInfo";
import AllGamesStats from "./AllGamesStats";
import ProgressionStats from "./ProgressionStats";
import MatchHistory from "./MatchHistory";
import background from "../background.jpg";

const Main = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div
      className="flexbox main"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flexbox main-left">
        <BasicInfo />
        <AllGamesStats />
        <ProgressionStats />
      </div>
      <div className="flexbox main-right">
        <div className="flexbox main-search">
          <Search className="mainSearch" />
          {searchContext.isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <MatchHistory />
      </div>
    </div>
  );
};

export default Main;
