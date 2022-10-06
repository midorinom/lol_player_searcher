import React from "react";

const MatchHistoryCard1Player = (props) => {
  return (
    <div className="flexbox matchHistoryCard1Player">
      <img
        className="matchHistoryCardChampion"
        src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${props.stats.championName}.png`}
        alt={props.stats.championName}
      />
      <div className="flexbox items-and-trinket">
        <div className="flexbox items">
          <div className="flexbox itemsTopRow">
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item0}.png`}
              alt={props.stats.items.item0}
            />
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item1}.png`}
              alt={props.stats.items.item1}
            />
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item2}.png`}
              alt={props.stats.items.item2}
            />
          </div>
          <div className="flexbox itemsBottomRow">
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item3}.png`}
              alt={props.stats.items.item3}
            />
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item4}.png`}
              alt={props.stats.items.item4}
            />
            <img
              className="matchHistoryCardItem"
              src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item5}.png`}
              alt={props.stats.items.item5}
            />
          </div>
        </div>
        <img
          className="matchHistoryCardItem trinket"
          src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${props.stats.items.item6}.png`}
          alt={props.stats.items.item6}
        />
      </div>

      <div className="matchHistoryCardStats">
        <p>{props.stats.wins === 1 ? "Victory" : "Defeat"}</p>
        <p>
          {Math.floor(props.stats.gameDuration / 60)} :
          {props.stats.gameDuration % 60}
        </p>
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
          Damage Share of Team:{" "}
          {Math.round((props.stats.damageShare / props.numberOfGames) * 10000) /
            100}
          %
        </p>
        <p>
          Gold per minute :{" "}
          {Math.round((props.stats.goldPerMin / props.numberOfGames) * 100) /
            100}
        </p>
        <p>
          Deaths per 10 minutes :{" "}
          {Math.round(
            (props.stats.deathsPer10Min / props.numberOfGames) * 100
          ) / 100}
        </p>
      </div>
      <button onClick={props.onClick}>View More</button>
    </div>
  );
};

export default MatchHistoryCard1Player;
