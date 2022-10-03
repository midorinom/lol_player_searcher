import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import LoadingSpinner from "./LoadingSpinner";
import Search from "./Search";
import BasicInfo from "./BasicInfo";

const Main = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="flexbox main">
      <div className="flexbox main-left">
        <BasicInfo />
      </div>
      <div className="flexbox main-right">
        <Search />
        {searchContext.isLoading && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
