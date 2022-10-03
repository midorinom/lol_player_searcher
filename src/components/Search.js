import React, { useRef, useContext } from "react";
import SearchContext from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const inputRef = useRef("");
  const regionSelectRef = useRef("");
  const gameModeSelectRef = useRef("");
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const summonerName = inputRef.current.value;
    const platformRouting = regionSelectRef.current.value;
    const queueId = gameModeSelectRef.current.value;
    searchContext.fetchSummonerData(summonerName, platformRouting, queueId);

    navigate("/main");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name="region-selector" ref={regionSelectRef}>
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
        <select name="game-mode-selector" ref={gameModeSelectRef}>
          <option value="420">Ranked Solo/Duo</option>
          <option value="440">Ranked Flex</option>
          <option value="400">Normal Draft</option>
          <option value="430">Normal Blind</option>
        </select>
        <input ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
