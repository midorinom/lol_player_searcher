import React from "react";

const GameData = (props) => {
  return (
    <div className="gameData">
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
        Damage Share of Team:{" "}
        {Math.round((props.stats.damageShare / props.numberOfGames) * 10000) /
          100}
        %
      </p>
      <p>
        Gold per minute :{" "}
        {Math.round((props.stats.goldPerMin / props.numberOfGames) * 100) / 100}
      </p>
      <p>
        Deaths per 10 minutes :{" "}
        {Math.round((props.stats.deathsPer10Min / props.numberOfGames) * 100) /
          100}
      </p>
    </div>
  );
};

export default GameData;
