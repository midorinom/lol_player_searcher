import React from "react";

const HighlightsCard = (props) => {
  return (
    <div className="flexbox highlightsCard">
      <p>
        {props.children}: {props.highlightsStats[props.stat][1]}
        {props.percentSign}
      </p>
      <img
        className="highlightsChampion"
        src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${
          props.highlightsStats[props.stat][0]
        }.png`}
      />
    </div>
  );
};

export default HighlightsCard;
