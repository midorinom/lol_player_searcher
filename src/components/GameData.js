import React from "react";

const GameData = (props) => {
  return (
    <div className="gameData">
      <h3>({props.numberOfGames} Games):</h3>
      <p>
        {props.stats.wins} Wins {props.stats.losses} Losses (
        {Math.round(
          (props.stats.wins / (props.stats.wins + props.stats.losses)) * 10000
        ) / 100}
        %)
      </p>
      <p>
        K/D/A : {props.stats.kills}/{props.stats.deaths}/{props.stats.assists} (
        {Math.round(
          ((props.stats.kills + props.stats.assists) / props.stats.deaths) * 100
        ) / 100}
        )
      </p>
      <p>
        Average Damage Share of Team:{" "}
        {Math.round((props.stats.damageShare / props.numberOfGames) * 10000) /
          100}
        %
      </p>
      <p>
        Average Gold per minute :{" "}
        {Math.round((props.stats.goldPerMin / props.numberOfGames) * 100) / 100}
      </p>
      <p>
        Average Deaths per 10 minutes :{" "}
        {Math.round((props.stats.deathsPer10Min / props.numberOfGames) * 100) /
          100}
      </p>
      <p>
        Multikills : {props.stats.doubleKills} doublekills,{" "}
        {props.stats.tripleKills} triplekills, {props.stats.quadraKills}{" "}
        quadrakills, {props.stats.pentaKills} pentakills
      </p>
    </div>
  );
};

export default GameData;
