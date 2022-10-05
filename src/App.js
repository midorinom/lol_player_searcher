import React, { useState, useEffect, useRef, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SearchContext from "./context/searchContext";
import ErrorModal from "./components/ErrorModal";
import LoadingSpinner from "./components/LoadingSpinner";
const Home = React.lazy(() => import("./components/Home"));
const Main = React.lazy(() => import("./components/Main"));

function App() {
  // =================================
  // Declaring Variables and Functions
  // =================================
  const apiKey = "RGAPI-6584f3b5-6a4e-4950-88ec-0de2342a5e85";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerData, setSummonerData] = useState("");
  const [regionalRouting, setRegionalRouting] = useState("");
  const [queueId, setQueueId] = useState("");
  const [allMatchIds, setAllMatchIds] = useState("");
  const [totalStats, setTotalStats] = useState("");
  const [progressionStats, setProgressionStats] = useState("");
  const [individualGameData, setIndividualGameData] = useState("");
  const allIndividualGames = useRef([]);
  const [fetchDoneAllIndividualGames, setFetchDoneAllIndividualGames] =
    useState(false);

  function handleModalOkay() {
    setError(false);
  }

  function getRegionalRouting(platformRouting) {
    switch (platformRouting) {
      case "euw1":
        return "europe";
      case "eun1":
        return "europe";
      case "na1":
        return "americas";
      case "kr":
        return "asia";
      case "jp1":
        return "asia";
      case "br1":
        return "americas";
      case "la1":
        return "americas";
      case "la2":
        return "americas";
      case "oc1":
        return "sea";
      default:
        return;
    }
  }

  // =================================
  // Fetch Summoner Data
  // =================================
  const fetchSummonerData = async (summonerName, platformRouting) => {
    setIsLoading(true);
    setError(null);
    allIndividualGames.current = [];

    try {
      const res = await fetch(
        `https://${platformRouting}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );
      const data = await res.json();

      // Set Regional Routing
      const regionalRouting2 = getRegionalRouting(platformRouting);
      setRegionalRouting(regionalRouting2);

      // Summoner Data
      setSummonerData({
        name: data.name,
        puuid: data.puuid,
        profileIconId: `http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${data.profileIconId}.png`,
        summonerLevel: data.summonerLevel,
      });
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // ===================
  // Fetch All Match Ids
  // ===================
  // useEffect happens after regionalRouting is set
  useEffect(() => {
    if (summonerData !== "") {
      fetchAllMatchIds(summonerData.puuid, regionalRouting, queueId);
    }
  }, [summonerData]);

  // Match Ids Fetch Function
  const fetchAllMatchIds = async (summonerPuuid, regionalRouting, queueId) => {
    setIsLoading(true);

    // Change the count to 100 when the app is done
    try {
      const res = await fetch(
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?api_key=${apiKey}&queue=${queueId}&start=0&count=3`
      );
      const data = await res.json();

      setAllMatchIds(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // ======================
  // Fetch Individual Games
  // ======================
  // useEffect happens after allMatchIds is set
  useEffect(() => {
    if (allMatchIds !== "") {
      fetchAllIndividualGames();
    }
  }, [allMatchIds]);

  // Fetch All Individual Games Function
  async function fetchAllIndividualGames() {
    for (let i = 0; i < allMatchIds.length; i++) {
      await fetchIndividualGame(regionalRouting, allMatchIds[i]);
    }
    setFetchDoneAllIndividualGames(true);
  }

  // Individual Game Fetch Function
  const fetchIndividualGame = async (regionalRouting, matchId) => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/${matchId}/?api_key=${apiKey}`
      );
      const data = await res.json();

      setIndividualGameData(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // useEffect happens after individualGameData is set
  useEffect(() => {
    if (individualGameData !== "") {
      allIndividualGames.current.push(individualGameData);
    }
  }, [individualGameData]);

  // ===============
  // Calculate Stats
  // ===============
  // useEffect happens after  all Individual Games have been fetched

  useEffect(() => {
    if (fetchDoneAllIndividualGames) {
      setFetchDoneAllIndividualGames(false);
      calculateStats();
    }
  }, [fetchDoneAllIndividualGames]);

  // Calculate Stats Function
  function calculateStats() {
    {
      const tempTotalStats = {
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        damageShare: 0,
        goldPerMin: 0,
        deathsPer10Min: 0,
        doubleKills: 0,
        tripleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
      };

      //Total Stats
      for (const item of allIndividualGames.current) {
        totalUpPlayerData(item, tempTotalStats);
      }

      console.log("temptotalStats", tempTotalStats);

      setTotalStats(tempTotalStats);
    }

    // Progression Stats
    const newestGames = allIndividualGames.current.slice(
      0,
      Math.floor(allIndividualGames.current.length / 3)
    );

    // Newest
    const totalNewestGames = {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      damageShare: 0,
      goldPerMin: 0,
      deathsPer10Min: 0,
      doubleKills: 0,
      tripleKills: 0,
      quadraKills: 0,
      pentaKills: 0,
    };

    for (const individualGameData of newestGames) {
      totalUpPlayerData(individualGameData, totalNewestGames);
    }
    setProgressionStats(totalNewestGames);
  }

  // Function that totals stats
  function totalUpPlayerData(individualGameData, totalStats) {
    const playerData = individualGameData.info.participants.find(
      (player) => player.puuid === summonerData.puuid
    );

    console.log(playerData);

    // Easy Stats
    playerData.win ? totalStats.wins++ : totalStats.losses++;

    totalStats.kills += playerData.kills;
    totalStats.deaths += playerData.deaths;
    totalStats.assists += playerData.assists;

    totalStats.goldPerMin +=
      playerData.goldEarned / (individualGameData.info.gameDuration / 60);
    totalStats.deathsPer10Min +=
      playerData.deaths / (individualGameData.info.gameDuration / 600);

    totalStats.doubleKills += playerData.doubleKills;
    totalStats.tripleKills += playerData.tripleKills;
    totalStats.quadraKills += playerData.quadraKills;
    totalStats.pentaKills += playerData.pentaKills;

    // Calculate Damage Share
    let totalTeamDamage = 0;
    for (const player of individualGameData.info.participants) {
      if (player.teamId === playerData.teamId) {
        totalTeamDamage += player.totalDamageDealtToChampions;
      }
    }
    totalStats.damageShare +=
      playerData.totalDamageDealtToChampions / totalTeamDamage;
  }

  // ======
  // Return
  // ======
  return (
    <>
      <SearchContext.Provider
        value={{
          summonerData,
          fetchSummonerData,
          isLoading,
          setQueueId,
          allIndividualGames,
          totalStats,
          progressionStats,
        }}
      >
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {error && (
                    <ErrorModal
                      title="Error Encountered"
                      message={`There is an error with your input. ${error}`}
                      okayClicked={handleModalOkay}
                    ></ErrorModal>
                  )}
                  <Home />
                </>
              }
            />
            {summonerData && (
              <Route
                path="/main"
                element={
                  <>
                    {error && (
                      <ErrorModal
                        title="Error Encountered"
                        message={`There is an error with your input. ${error}`}
                        okayClicked={handleModalOkay}
                      ></ErrorModal>
                    )}
                    <Main />
                  </>
                }
              />
            )}
          </Routes>
        </Suspense>
      </SearchContext.Provider>
    </>
  );
}

export default App;
