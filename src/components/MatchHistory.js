import React, { useState, useContext, useRef, useEffect } from "react";
import SearchContext from "../context/searchContext";
import GameData from "./GameData";

const MatchHistory = () => {
  const searchContext = useContext(SearchContext);
  const pageSelectRef = useRef("");
  const [matchHistory, setMatchHistory] = useState([]);

  function handleSubmit() {
    return;
  }

  // let allMatchHistoryCards = "";

  useEffect(() => {
    if (searchContext.totalStats !== "") {
      const gamesOnCurrentPage = searchContext.allIndividualGames.current.slice(
        searchContext.matchHistoryPageNumber * 5 - 5,
        searchContext.matchHistoryPageNumber * 5 - 1
      );

      setMatchHistory(gamesOnCurrentPage);

      // allMatchHistoryCards = gamesOnCurrentPage.map((element) => {
      //   const playerStats = {
      //     wins: 0,
      //     losses: 0,
      //     kills: 0,
      //     deaths: 0,
      //     assists: 0,
      //     damageShare: 0,
      //     goldPerMin: 0,
      //     deathsPer10Min: 0,
      //   };

      //   searchContext.totalUpPlayerData(element, playerStats);

      //   return <GameData stats={playerStats} numberOfGames={1} />;
      // });

      // console.log("allMatchHistoryCards", allMatchHistoryCards);
      // setMatchHistory(true);
    }
  }, [searchContext.totalStats]);

  // console.log({ allMatchHistoryCards });

  const history = matchHistory.map((element) => {
    const playerStats = {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      damageShare: 0,
      goldPerMin: 0,
      deathsPer10Min: 0,
    };

    searchContext.totalUpPlayerData(element, playerStats);

    return <GameData stats={playerStats} numberOfGames={1} />;
  });

  return (
    <div className="flexbox main-matchHistory">
      <div className="matchHistory">
        <header className="flexbox matchHistoryHeader">
          <h3 className="statsHeader">Match History</h3>
          <div className="flexbox matchHistoryHeaderRight">
            <button>Previous</button>
            <button>Next</button>
            <form onSubmit={handleSubmit}>
              <select name="region-selector" ref={pageSelectRef}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </form>
          </div>
        </header>
        <main className="flexbox MatchHistoryCards">{history}</main>
      </div>
    </div>
  );
};

export default MatchHistory;
