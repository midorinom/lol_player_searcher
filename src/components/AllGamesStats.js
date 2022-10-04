import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";

const AllGamesStats = () => {
  const searchContext = useContext(SearchContext);

  // ======
  // Return
  // ======
  return (
    <div className="allGamesStats">
      <h3>Total Stats</h3>
      <GameData
        numberOfGames={searchContext.allIndividualGames.length}
        stats={searchContext.totalStats}
      />
    </div>
  );
};

export default AllGamesStats;
