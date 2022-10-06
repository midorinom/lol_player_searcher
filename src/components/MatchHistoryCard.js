import React, { useState, useContext } from "react";
import MatchHistoryCard1Player from "./MatchHistoryCard1Player";
import MatchHistoryCard10Players from "./MatchHistoryCard10Players";
import SearchContext from "../context/searchContext";

const MatchHistoryCard = (props) => {
  const [viewMoreClicked, setViewMoreClicked] = useState(false);
  const searchContext = useContext(SearchContext);

  function handleClick() {
    if (viewMoreClicked) {
      setViewMoreClicked(false);
    } else {
      setViewMoreClicked(true);
    }
  }

  return (
    <>
      {viewMoreClicked === false && searchContext.isLoading === false && (
        <MatchHistoryCard1Player
          stats={props.stats}
          numberOfGames={props.numberOfGames}
          onClick={handleClick}
        />
      )}
      {viewMoreClicked && searchContext.isLoading === false && (
        <MatchHistoryCard10Players
          allPlayersStats={props.allPlayersStats}
          numberOfGames={props.numberOfGames}
          onClick={handleClick}
          setViewMoreClicked={setViewMoreClicked}
        />
      )}
    </>
  );
};

export default MatchHistoryCard;
