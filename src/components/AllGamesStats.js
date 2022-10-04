import React, { useContext } from "react";
import SearchContext from "../context/searchContext";

const AllGamesStats = () => {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const searchContext = useContext(SearchContext);

  // ======
  // Return
  // ======
  return (
    <div className="allGamesStats">
      <h3>
        Total Stats (Recent {searchContext.allIndividualGames.length} Games):
      </h3>
      <p>
        {searchContext.totalStats.wins} Wins {searchContext.totalStats.losses}{" "}
        Losses (
        {Math.round(
          (searchContext.totalStats.wins /
            (searchContext.totalStats.wins + searchContext.totalStats.losses)) *
            10000
        ) / 100}
        %)
      </p>
      <p>
        K/D/A : {searchContext.totalStats.kills}/
        {searchContext.totalStats.deaths}/{searchContext.totalStats.assists} (
        {Math.round(
          ((searchContext.totalStats.kills + searchContext.totalStats.assists) /
            searchContext.totalStats.deaths) *
            100
        ) / 100}
        )
      </p>
      <p>
        Average Damage Share of Team:{" "}
        {Math.round((searchContext.totalStats.damageShare / 10) * 10000) / 100}%
      </p>
      <p>
        Average Gold per minute :{" "}
        {Math.round((searchContext.totalStats.goldPerMin / 10) * 100) / 100}
      </p>
      <p>
        Average Deaths per 10 minutes :{" "}
        {Math.round((searchContext.totalStats.deathsPer10Min / 10) * 100) / 100}
      </p>
      <p>
        Multikills : {searchContext.totalStats.doubleKills} doublekills,{" "}
        {searchContext.totalStats.tripleKills} triplekills,{" "}
        {searchContext.totalStats.quadraKills} quadrakills,{" "}
        {searchContext.totalStats.pentaKills} pentakills
      </p>
    </div>
  );
};

export default AllGamesStats;
