import React, { useState, useEffect } from "react";
import TenPlayersCard from "./TenPlayersCard";

const MatchHistoryCard10Players = (props) => {
  const [blueTeamCards, setBlueTeamCards] = useState([]);
  const [redTeamCards, setRedTeamCards] = useState([]);

  // useEffect Runs on Mount
  useEffect(() => {
    const blueTeam = props.allPlayersStats.slice(0, 5);
    const redTeam = props.allPlayersStats.slice(5);

    const blueTeamCards2 = blueTeam.map((element, index) => {
      return (
        <TenPlayersCard
          stats={element}
          setViewMoreClicked={props.setViewMoreClicked}
          key={index}
        />
      );
    });

    const redTeamCards2 = redTeam.map((element, index) => {
      return (
        <TenPlayersCard
          stats={element}
          setViewMoreClicked={props.setViewMoreClicked}
          key={index}
        />
      );
    });

    setBlueTeamCards(blueTeamCards2);
    setRedTeamCards(redTeamCards2);
  }, []);

  return (
    <div className="flexbox matchHistoryCard10Players">
      <div className="flexbox matchHistoryCard10Players-left">
        <div className="flexbox matchHistoryCard10Players-header">
          <h3>
            Blue Team ({props.allPlayersStats[0].win ? "VICTORY" : "DEFEAT"})
          </h3>
        </div>
        <div className="flexbox tenPlayersStats">{blueTeamCards}</div>
      </div>
      <div className="flexbox matchHistoryCard10Players-right">
        <div className="flexbox matchHistoryCard10Players-header">
          <h3>
            Red Team ({props.allPlayersStats[5].win ? "VICTORY" : "DEFEAT"})
          </h3>
        </div>
        <div className="flexbox tenPlayersStats">{redTeamCards}</div>
      </div>
      <button className="backButton" onClick={props.onClick}>
        Back
      </button>
    </div>
  );
};

export default MatchHistoryCard10Players;
