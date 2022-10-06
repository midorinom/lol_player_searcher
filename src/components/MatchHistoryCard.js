import React, { useState } from "react";
import MatchHistoryCard1Player from "./MatchHistoryCard1Player";
import MatchHistoryCard10Players from "./MatchHistoryCard10Players";

const MatchHistoryCard = (props) => {
  const [viewMoreClicked, setViewMoreClicked] = useState(false);

  function handleClick() {
    if (viewMoreClicked) {
      setViewMoreClicked(false);
      console.log("set to false");
    } else {
      setViewMoreClicked(true);
      console.log("set to true");
    }
  }

  return (
    <>
      {viewMoreClicked === false && (
        <MatchHistoryCard1Player
          stats={props.stats}
          numberOfGames={props.numberOfGames}
          onClick={handleClick}
        />
      )}
      {viewMoreClicked && (
        <MatchHistoryCard10Players
          allPlayersStats={props.allPlayersStats}
          numberOfGames={props.numberOfGames}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default MatchHistoryCard;
