import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";

const AllGamesStats = () => {
  const searchContext = useContext(SearchContext);

  // ======
  // Return
  // ======
  return (
    <GameData
      numberOfGames={searchContext.allIndividualGames.length}
      stats={searchContext.totalStats}
    />
  );
};

export default AllGamesStats;
