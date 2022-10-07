import React, { useContext } from "react";
import SearchContext from "../../context/searchContext";
import ProgressionStatsCard from "./ProgressionStatsCard";

const ProgressionStats = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="flexbox main-progressionStats">
      {searchContext.progressionStats[0] !== "" && (
        <ProgressionStatsCard
          numberOfGames={Math.floor(
            searchContext.allIndividualGames.current.length / 3
          )}
          stats={searchContext.progressionStats[0]}
        >
          Most Recent{" "}
          {Math.floor(searchContext.allIndividualGames.current.length / 3)}{" "}
          Games
        </ProgressionStatsCard>
      )}
      {searchContext.progressionStats[1] !== "" && (
        <ProgressionStatsCard
          numberOfGames={Math.floor(
            searchContext.allIndividualGames.current.length / 3
          )}
          stats={searchContext.progressionStats[1]}
        >
          Middle{" "}
          {Math.floor(searchContext.allIndividualGames.current.length / 3)}{" "}
          Games
        </ProgressionStatsCard>
      )}
      {searchContext.progressionStats[2] !== "" && (
        <ProgressionStatsCard
          numberOfGames={Math.floor(
            searchContext.allIndividualGames.current.length / 3
          )}
          stats={searchContext.progressionStats[2]}
        >
          Oldest{" "}
          {Math.floor(searchContext.allIndividualGames.current.length / 3)}{" "}
          Games
        </ProgressionStatsCard>
      )}
    </div>
  );
};

export default ProgressionStats;
