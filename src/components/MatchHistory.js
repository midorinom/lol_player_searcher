import React, { useState, useContext, useRef, useEffect } from "react";
import SearchContext from "../context/searchContext";
import MatchHistoryCard from "./MatchHistoryCard";

const MatchHistory = () => {
  const searchContext = useContext(SearchContext);
  const pageSelectRef = useRef("");
  const [matchHistoryCards, setMatchHistoryCards] = useState([]);

  function handleSubmit() {
    return;
  }

  useEffect(() => {
    if (searchContext.totalStats !== "") {
      const gamesOnCurrentPage = searchContext.allIndividualGames.current.slice(
        searchContext.matchHistoryPageNumber * 5 - 5,
        searchContext.matchHistoryPageNumber * 5
      );

      console.log(searchContext.allIndividualGames.current);

      const matchHistoryCards2 = gamesOnCurrentPage.map((element, index) => {
        const playerStats = {
          wins: 0,
          losses: 0,
          championName: "",
          kills: 0,
          deaths: 0,
          assists: 0,
          damageShare: 0,
          goldPerMin: 0,
          deathsPer10Min: 0,
        };

        searchContext.totalUpPlayerData(element, playerStats, true);

        console.log("playerstats", playerStats);

        return (
          <MatchHistoryCard stats={playerStats} numberOfGames={1} key={index} />
        );
      });

      setMatchHistoryCards(matchHistoryCards2);
    }
  }, [searchContext.totalStats]);

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
        <main className="flexbox matchHistoryCards">{matchHistoryCards}</main>
      </div>
    </div>
  );
};

export default MatchHistory;
