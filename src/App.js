import React, { useState, useEffect, useRef, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SearchContext from "./context/searchContext";
import ErrorModal from "./components/auxiliary/ErrorModal";
import LoadingSpinner from "./components/auxiliary/LoadingSpinner";
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
  const [platformRouting, setPlatformRouting] = useState("");
  const [regionalRouting, setRegionalRouting] = useState("");
  const [queueId, setQueueId] = useState("");
  const [allMatchIds, setAllMatchIds] = useState("");
  const [totalStats, setTotalStats] = useState("");
  const [progressionStats, setProgressionStats] = useState(["", "", ""]);
  const [individualGameData, setIndividualGameData] = useState("");
  const allIndividualGames = useRef([]);
  const [fetchDoneAllIndividualGames, setFetchDoneAllIndividualGames] =
    useState(false);
  const [highlightsStats, setHighlightsStats] = useState("");

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
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?api_key=${apiKey}&queue=${queueId}&start=0&count=32`
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
    console.log(allIndividualGames.current);
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
      };

      // Total Stats
      for (const item of allIndividualGames.current) {
        totalUpPlayerData(item, tempTotalStats);
      }

      setTotalStats(tempTotalStats);
    }

    // Progression Stats
    const newestProgressionStats = totalUpProgressionStats(
      0,
      Math.floor(allIndividualGames.current.length / 3)
    );

    let middleProgressionStats = "";
    if (allIndividualGames.current.length > 1) {
      middleProgressionStats = totalUpProgressionStats(
        Math.floor(allIndividualGames.current.length / 3),
        Math.floor(allIndividualGames.current.length / 3) * 2
      );
    }

    let oldestProgressionStats = "";
    if (allIndividualGames.current.length > 2) {
      oldestProgressionStats = totalUpProgressionStats(
        Math.floor(allIndividualGames.current.length / 3) * 2,
        Math.floor(allIndividualGames.current.length / 3) * 3
      );
    }

    const progressionStats2 = [
      newestProgressionStats,
      middleProgressionStats,
      oldestProgressionStats,
    ];

    setProgressionStats(progressionStats2);

    // Highlights Stats
    const championStats = totalUpChampionStats();

    // Add in KDA to championStats
    for (const item of Object.values(championStats)) {
      item.kda =
        Math.round(((item.kills + item.assists) / item.deaths) * 100) / 100;
    }

    totalUpHighlightsStats(championStats);
  }

  // Function that totals stats
  function totalUpPlayerData(
    individualGameData,
    totalStats,
    isMatchHistoryCard = false
  ) {
    const playerData = individualGameData.info.participants.find(
      (player) => player.puuid === summonerData.puuid
    );

    // Easy Stats
    playerData.win ? totalStats.wins++ : totalStats.losses++;

    totalStats.kills += playerData.kills;
    totalStats.deaths += playerData.deaths;
    totalStats.assists += playerData.assists;

    totalStats.goldPerMin +=
      playerData.goldEarned / (individualGameData.info.gameDuration / 60);
    totalStats.deathsPer10Min +=
      playerData.deaths / (individualGameData.info.gameDuration / 600);

    // Calculate Damage Share
    let totalTeamDamage = 0;
    for (const player of individualGameData.info.participants) {
      if (player.teamId === playerData.teamId) {
        totalTeamDamage += player.totalDamageDealtToChampions;
      }
    }
    totalStats.damageShare +=
      playerData.totalDamageDealtToChampions / totalTeamDamage;

    // Additional Stats for Match History
    if (isMatchHistoryCard) {
      totalStats.championName = playerData.championName;
      totalStats.gameDuration = individualGameData.info.gameDuration;
      totalStats.items = {
        item0: playerData.item0,
        item1: playerData.item1,
        item2: playerData.item2,
        item3: playerData.item3,
        item4: playerData.item4,
        item5: playerData.item5,
        item6: playerData.item6,
      };
    }
  }

  // Function to Total Up Progression Stats
  function totalUpProgressionStats(startIndex, endIndex) {
    const progressionGames = allIndividualGames.current.slice(
      startIndex,
      endIndex
    );

    const totalProgressionStats = {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      damageShare: 0,
      goldPerMin: 0,
      deathsPer10Min: 0,
    };

    for (const item of progressionGames) {
      totalUpPlayerData(item, totalProgressionStats);
    }
    return totalProgressionStats;
  }

  // Function to Total Up Champion Stats
  function totalUpChampionStats() {
    const championData = {};
    for (const item of allIndividualGames.current) {
      const playerData = item.info.participants.find(
        (player) => player.puuid === summonerData.puuid
      );

      championData[playerData.championName] = {
        numberOfGames: 0,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        damageShare: 0,
        goldPerMin: 0,
        deathsPer10Min: 0,
      };
    }

    for (const item of allIndividualGames.current) {
      const playerData = item.info.participants.find(
        (player) => player.puuid === summonerData.puuid
      );

      totalUpPlayerData(item, championData[playerData.championName]);
      championData[playerData.championName].numberOfGames += 1;
    }

    return championData;
  }

  // Function to Total Up Highlights Stats
  function totalUpHighlightsStats(championStats) {
    const highestWinrate = findChampionWithHighestStats(championStats, "wins");
    highestWinrate[1] = Math.round(highestWinrate[1] * 10000) / 100;

    const highestKda = findChampionWithHighestStats(championStats, "kda");
    highestKda[1] = Math.round(highestKda[1] * 100) / 100;

    const highestDamageshare = findChampionWithHighestStats(
      championStats,
      "damageShare"
    );
    highestDamageshare[1] = Math.round(highestDamageshare[1] * 10000) / 100;

    const highestGoldPerMin = findChampionWithHighestStats(
      championStats,
      "goldPerMin"
    );
    highestGoldPerMin[1] = Math.round(highestGoldPerMin[1] * 100) / 100;

    const lowestDeathsPer10Min = findChampionWithHighestStats(
      championStats,
      "deathsPer10Min",
      true
    );
    lowestDeathsPer10Min[1] = Math.round(lowestDeathsPer10Min[1] * 100) / 100;

    const highlightsStats2 = {
      highestWinrate: highestWinrate,
      highestKda: highestKda,
      highestDamageshare: highestDamageshare,
      highestGoldPerMin: highestGoldPerMin,
      lowestDeathsPer10Min: lowestDeathsPer10Min,
    };

    setHighlightsStats(highlightsStats2);
  }

  // Function to Find The Champion with the Highest Stats
  function findChampionWithHighestStats(
    championStats,
    stat,
    lowestStatsInstead = false
  ) {
    const championStatsValues = Object.values(championStats);
    let championHighestStats = "";

    // Map out an array containing all the total of the stat for each champion, averaged out according to number of games
    const statsArray = championStatsValues.map(
      (element) => element[stat] / element["numberOfGames"]
    );
    let highestStats = 0;

    // If looking for Lowest Stats instead of Highest
    if (lowestStatsInstead) {
      highestStats = Math.min(...statsArray);
    } else {
      highestStats = Math.max(...statsArray);
    }

    for (const stats of championStatsValues) {
      if (stats[stat] === highestStats * stats["numberOfGames"]) {
        for (const championName of Object.keys(championStats)) {
          if (championStats[championName] === stats) {
            // Only take the first champion with the highest stats, ignore subsequent ones with equivalent stats
            if (championHighestStats === "") {
              championHighestStats = championName;
            }
          }
        }
      }
    }

    return [championHighestStats, highestStats];
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
          queueId,
          setQueueId,
          platformRouting,
          setPlatformRouting,
          allIndividualGames,
          totalStats,
          progressionStats,
          totalUpPlayerData,
          highlightsStats,
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
            <Route path="/search" element={<Navigate replace to="/" />} />
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
                path="/search/:platformRouting/:summonerName"
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
