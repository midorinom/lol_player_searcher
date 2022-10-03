import React, { useContext } from "react";
import SearchContext from "../context/searchContext";

const AllGamesStats = () => {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const searchContext = useContext(SearchContext);

  const totalStats = {
    wins: 0,
    losses: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    damageShare: 0,
    goldPerMin: 0,
    deathsPer10Min: 0,
    doubleKills: 0,
    tripleKills: 0,
    quadraKills: 0,
    pentaKills: 0,
  };

  function getPlayerData(individualGameData) {
    return individualGameData.info.participants.find(
      (player) => player.puuid === searchContext.summonerData.puuid
    );
  }

  for (const individualGameData of searchContext.allIndividualGames) {
    const playerData = getPlayerData(individualGameData);

    playerData.win ? totalStats.wins++ : totalStats.losses++;
    totalStats.kills += playerData.kills;
    totalStats.deaths += playerData.kills;
    totalStats.assists += playerData.assists;
    totalStats.doubleKills += playerData.doubleKills;
    totalStats.tripleKills += playerData.tripleKills;
    totalStats.quadraKills += playerData.quadraKills;
    totalStats.pentaKills += playerData.pentaKills;
  }

  // ======
  // Return
  // ======
  return (
    <div className="allGamesStats">
      <h3>
        Total Stats (Recent {searchContext.allIndividualGames.length} Games):
      </h3>
      <p>
        {totalStats.wins} Wins {totalStats.losses} Losses (
        {Math.round(
          (totalStats.wins / (totalStats.wins + totalStats.losses)) * 100
        ) / 100}
        %)
      </p>
      <p>
        K/D/A: {totalStats.kills} / {totalStats.deaths} /{totalStats.assists}
      </p>
      <p>
        Multikills: {totalStats.doubleKills} doublekills,{" "}
        {totalStats.tripleKills} triplekills, {totalStats.quadraKills}{" "}
        quadrakills, {totalStats.pentaKills} pentakills
      </p>
    </div>
  );
};

export default AllGamesStats;
