import React, { useRef, useContext } from "react";
import SearchContext from "../context/searchContext";

const Search = () => {
  const inputRef = useRef("");
  const searchContext = useContext(SearchContext);

  function handleSubmit(e) {
    e.preventDefault();
    const summonerName = inputRef.current.value;
    searchContext.fetchSummonerData(summonerName);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
