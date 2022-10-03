import React, { useContext, useEffect } from "react";
import SearchContext from "../context/searchContext";

const AllGamesStats = (props) => {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const searchContext = useContext(SearchContext);

  useEffect(() => {
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

    for (const individualGameData of searchContext.allIndividualGames) {
      totalUpPlayerData(individualGameData, totalStats);
    }

    if (props.totalStats === "") {
      props.setTotalStats(totalStats);
    }
  }, []);

  function totalUpPlayerData(individualGameData, totalStats) {
    const playerData = individualGameData.info.participants.find(
      (player) => player.puuid === searchContext.summonerData.puuid
    );

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
        {props.totalStats.wins} Wins {props.totalStats.losses} Losses (
        {Math.round(
          (props.totalStats.wins /
            (props.totalStats.wins + props.totalStats.losses)) *
            100
        ) / 100}
        %)
      </p>
      <p>
        K/D/A: {props.totalStats.kills} / {props.totalStats.deaths} /
        {props.totalStats.assists}
      </p>
      <p>
        Multikills: {props.totalStats.doubleKills} doublekills,{" "}
        {props.totalStats.tripleKills} triplekills,{" "}
        {props.totalStats.quadraKills} quadrakills,{" "}
        {props.totalStats.pentaKills} pentakills
      </p>
    </div>
  );
};

export default AllGamesStats;
