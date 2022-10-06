import React, { useState, useContext, useEffect } from "react";
import SearchContext from "../context/searchContext";
import MatchHistoryCard from "./MatchHistoryCard";

const MatchHistory = () => {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const searchContext = useContext(SearchContext);
  const [matchHistoryCards, setMatchHistoryCards] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageOptions, setPageOptions] = useState(<option value="1">1</option>);

  function handleClick(e) {
    switch (e.target.value) {
      case "Previous":
        if (pageNumber === 1) {
          return;
        } else {
          setPageNumber((prevState) => prevState - 1);
        }
        break;
      case "Next":
        if (
          pageNumber ===
          Math.ceil(searchContext.allIndividualGames.current.length / 5)
        ) {
          return;
        } else {
          setPageNumber((prevState) => prevState + 1);
        }
        break;
      default:
        return;
    }
  }

  function handlePageChange(e) {
    setPageNumber(Number(e.target.value)); // Convert to number otherwise it is passed as a string
  }

  // useEffect runs when a new search takes place
  useEffect(() => {
    if (searchContext.totalStats !== "") {
      console.log(
        "allIndividualGames",
        searchContext.allIndividualGames.current
      );
      generatePageOptions();
      // If a new search was made while the page was left on 1, the next useEffect won't happen, so will need to generate
      // matchHistoryCards here
      if (pageNumber === 1) {
        generateMatchHistoryCards();
      } else {
        // Make sure a new search always starts on page 1
        setPageNumber(1);
      }
    }
  }, [searchContext.totalStats]);

  // useEffect runs whenever pageNumber changes
  useEffect(() => {
    if (pageNumber > 0) {
      generateMatchHistoryCards();
    }
  }, [pageNumber]);

  // Function to generate MatchHistoryCards components
  function generateMatchHistoryCards() {
    const gamesOnCurrentPage = searchContext.allIndividualGames.current.slice(
      pageNumber * 5 - 5,
      pageNumber * 5
    );

    const matchHistoryCards2 = gamesOnCurrentPage.map((element, index) => {
      const playerStats = {
        championName: "",
        wins: 0,
        losses: 0,
        gameDuration: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        damageShare: 0,
        goldPerMin: 0,
        deathsPer10Min: 0,
        items: {},
      };

      searchContext.totalUpPlayerData(element, playerStats, true);

      return (
        <MatchHistoryCard
          stats={playerStats}
          numberOfGames={1}
          allPlayersStats={element.info.participants}
          key={index}
        />
      );
    });

    setMatchHistoryCards(matchHistoryCards2);
  }

  // Function to generate page Option components
  function generatePageOptions() {
    const pageOptions2 = [];
    for (
      let i = 1;
      i <= Math.ceil(searchContext.allIndividualGames.current.length / 5);
      i++
    ) {
      pageOptions2.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    setPageOptions(pageOptions2);
  }

  return (
    <div className="flexbox main-matchHistory">
      <div className="flexbox matchHistory">
        <header className="flexbox matchHistoryHeader">
          <h3 className="statsHeader">Match History</h3>
          <div className="flexbox matchHistoryHeaderRight">
            <button value="Previous" onClick={handleClick}>
              Previous
            </button>
            <button value="Next" onClick={handleClick}>
              Next
            </button>
            <form>
              <select
                name="region-selector"
                onChange={handlePageChange}
                value={pageNumber}
              >
                {pageOptions}
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
