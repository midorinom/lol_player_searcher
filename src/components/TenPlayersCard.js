import React, { useContext } from "react";
import SearchContext from "../context/searchContext";

const TenPlayersCard = (props) => {
  const searchContext = useContext(SearchContext);

  function handleClick(e) {
    if (e.target.innerText !== searchContext.summonerData.name) {
      props.setViewMoreClicked(false);
      searchContext.fetchSummonerData(
        e.target.innerText,
        searchContext.platformRouting,
        searchContext.queueId
      );
    }
  }

  return (
    <div className="flexbox tenPlayersCard">
      <img
        className="tenPlayersChampion"
        src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${props.stats.championName}.png`}
        alt={props.stats.championName}
      />
      <p className="tenPlayersCardName" onClick={handleClick}>
        {props.stats.summonerName}
      </p>
      <p>
        KDA: {props.stats.kills} / {props.stats.deaths} / {props.stats.assists}
      </p>
      <p>Damage Dealt: {props.stats.totalDamageDealt}</p>
      <p>Gold Earned: {props.stats.goldEarned}</p>
    </div>
  );
};

export default TenPlayersCard;
