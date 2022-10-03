import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import LoadingSpinner from "./LoadingSpinner";

const Main = () => {
  const searchContext = useContext(SearchContext);

  return (
    <>
      <h1>Main</h1>
      {searchContext.isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default Main;
