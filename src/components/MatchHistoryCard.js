import React from "react";

const MatchHistoryCard = (props) => {
  return (
    <div className="flexbox matchHistoryCard">
      <img
        className="matchHistoryCardChampion"
        src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${props.stats.championName}.png`}
        alt={props.stats.championName}
      />
      <div className="matchHistoryCardStats">
        <p>{props.stats.wins === 1 ? "Victory" : "Defeat"}</p>
        <p>
          K/D/A : {props.stats.kills}/{props.stats.deaths}/{props.stats.assists}{" "}
          (
          {Math.round(
            ((props.stats.kills + props.stats.assists) / props.stats.deaths) *
              100
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
          {Math.round((props.stats.goldPerMin / props.numberOfGames) * 100) /
            100}
        </p>
        <p>
          Average Deaths per 10 minutes :{" "}
          {Math.round(
            (props.stats.deathsPer10Min / props.numberOfGames) * 100
          ) / 100}
        </p>
      </div>
    </div>
  );
};

export default MatchHistoryCard;
