import React, { useRef, useContext } from "react";
import SearchContext from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef("");
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const summonerName = inputRef.current.value;
    searchContext.fetchSummonerData(summonerName);
    navigate("/main");
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
