import React from "react";
import GameData from "../GameData";

const ProgressionStatsCard = (props) => {
  return (
    <div className="progressionStats">
      <h3 className="statsHeader">{props.children}</h3>
      <GameData numberOfGames={props.numberOfGames} stats={props.stats} />
    </div>
  );
};

export default ProgressionStatsCard;
