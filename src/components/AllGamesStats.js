import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";
import Highlights from "./Highlights";

const AllGamesStats = () => {
  const searchContext = useContext(SearchContext);

  // ======
  // Return
  // ======
  return (
    <div className="flexbox allGamesStats">
      <div classname="allGamesStats-left">
        <h3 className="statsHeader">
          Total Stats ({searchContext.allIndividualGames.current.length} Games)
        </h3>
        <GameData
          numberOfGames={searchContext.allIndividualGames.current.length}
          stats={searchContext.totalStats}
        />
      </div>
      <div className="allGamesStats-right">
        <Highlights />
      </div>
    </div>
  );
};

export default AllGamesStats;
