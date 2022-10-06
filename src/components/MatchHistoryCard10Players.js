import React from "react";

const MatchHistoryCard10Players = (props) => {
  return (
    <div className="flexbox matchHistoryCard">
      <p>Testing</p>
      <p>{props.allPlayersStats[0].championName}</p>
      <button onClick={props.onClick}>View More</button>
    </div>
  );
};

export default MatchHistoryCard10Players;
