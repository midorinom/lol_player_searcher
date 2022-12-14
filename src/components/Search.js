import React, { useRef, useContext } from "react";
import SearchContext from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
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
    const queueId2 = gameModeSelectRef.current.value;

    searchContext.setQueueId(queueId2);
    searchContext.setPlatformRouting(platformRouting);
    searchContext.fetchSummonerData(summonerName, platformRouting, queueId2);

    inputRef.current.value = "";
    navigate(`/search/${platformRouting}/${summonerName}`);
  }

  return (
    <div className={props.className}>
      <form onSubmit={handleSubmit}>
        <select
          className={props.inputClassName}
          name="region-selector"
          ref={regionSelectRef}
        >
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
        <select
          className={props.inputClassName}
          name="game-mode-selector"
          ref={gameModeSelectRef}
        >
          <option value="420">Ranked Solo/Duo</option>
          <option value="440">Ranked Flex</option>
          <option value="400">Normal Draft</option>
          <option value="430">Normal Blind</option>
        </select>
        <input ref={inputRef} />
        <button className={props.inputClassName} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
