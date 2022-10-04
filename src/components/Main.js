import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import LoadingSpinner from "./LoadingSpinner";
import Search from "./Search";
import BasicInfo from "./BasicInfo";
import AllGamesStats from "./AllGamesStats";
import ProgressionStats from "./ProgressionStats";
import MatchHistory from "./MatchHistory";

const Main = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="flexbox main">
      <div className="flexbox main-left">
        <BasicInfo />
        <AllGamesStats />
        <ProgressionStats />
      </div>
      <div className="flexbox main-right">
        <div className="flexbox main-search">
          <Search />
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
