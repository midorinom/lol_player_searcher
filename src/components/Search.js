import React, { useRef, useContext } from "react";
import SearchContext from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef("");
  const selectRef = useRef("");
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const summonerName = inputRef.current.value;
    const region = selectRef.current.value;
    searchContext.fetchSummonerData(summonerName, region);

    navigate("/main");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name="region-selector" ref={selectRef}>
          <option value="euw1">Europe West</option>
          <option value="eun1">Europe Nordic + East</option>
          <option value="na1">North America</option>
          <option value="kr">Korea</option>
          <option value="jp1">Japan</option>
          <option value="br1">Brazil</option>
          <option value="la1">Latin America North</option>
          <option value="la2">Latin America South</option>
          <option value="oc1">Oceania</option>
        </select>
        <input ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
