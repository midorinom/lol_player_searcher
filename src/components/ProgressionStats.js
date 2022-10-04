import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";

const ProgressionStats = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="progressionStats">
      Newest Games:
      <GameData
        numberOfGames={Math.floor(searchContext.allIndividualGames.length / 3)}
        stats={searchContext.progressionStats}
      />
    </div>
  );
};

export default ProgressionStats;
