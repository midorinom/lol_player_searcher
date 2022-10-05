import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";

const ProgressionStats = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="progressionStats">
      <h3 className="statsHeader">Newest Games</h3>
      <GameData
        numberOfGames={Math.floor(
          searchContext.allIndividualGames.current.length / 3
        )}
        stats={searchContext.progressionStats}
      />
    </div>
  );
};

export default ProgressionStats;
