import React, { useState, Suspense } from "react";
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
  const [allMatchIds, setAllMatchIds] = useState([
    "NA1_4448483308",
    "NA1_4448437019",
    "NA1_4447662355",
    "NA1_4447616776",
    "NA1_4447631324",
    "NA1_4446707026",
    "NA1_4446742801",
    "NA1_4446048742",
    "NA1_4446090192",
    "NA1_4446005457",
  ]);
  const [allIndividualGames, setAllIndividualGames] = useState([]);
  const [totalStats, setTotalStats] = useState("");

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

  // =========================================
  // Fetch Summoner Data (and everything else)
  // =========================================
  const fetchSummonerData = async (summonerName, platformRouting, queueId) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://${platformRouting}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );
      const data = await res.json();

      // Summoner Data
      setSummonerData({
        name: data.name,
        puuid: data.puuid,
        profileIconId: `http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${data.profileIconId}.png`,
        summonerLevel: data.summonerLevel,
      });

      // Match Ids
      const regionalRouting = getRegionalRouting(platformRouting);
      fetchAllMatchIds(data.puuid, regionalRouting, queueId);

      // All Individual Games
      const arrayAllIndividualGames = [];

      for (let i = 0; i < allMatchIds.length; i++) {
        fetchAllIndividualGames(
          regionalRouting,
          allMatchIds[i],
          arrayAllIndividualGames
        );
      }
      setAllIndividualGames(arrayAllIndividualGames);

      // Totalling Stats
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

        function totalUpPlayerData(individualGameData) {
          const playerData = individualGameData.info.participants.find(
            (player) => player.puuid === summonerData.puuid
          );

          // Easy Stats
          playerData.win ? tempTotalStats.wins++ : tempTotalStats.losses++;

          tempTotalStats.kills += playerData.kills;
          tempTotalStats.deaths += playerData.kills;
          tempTotalStats.assists += playerData.assists;

          tempTotalStats.goldPerMin +=
            playerData.goldEarned / (individualGameData.info.gameDuration / 60);
          tempTotalStats.deathsPer10Min +=
            playerData.deaths / (individualGameData.info.gameDuration / 600);

          tempTotalStats.doubleKills += playerData.doubleKills;
          tempTotalStats.tripleKills += playerData.tripleKills;
          tempTotalStats.quadraKills += playerData.quadraKills;
          tempTotalStats.pentaKills += playerData.pentaKills;

          // Calculate Damage Share
          let totalTeamDamage = 0;
          for (const player of individualGameData.info.participants) {
            if (player.teamId === playerData.teamId) {
              totalTeamDamage += player.totalDamageDealtToChampions;
            }
          }
          tempTotalStats.damageShare +=
            playerData.totalDamageDealtToChampions / totalTeamDamage;
        }

        console.log("allIndividualGames");
        console.log(allIndividualGames);

        for (const individualGameData of allIndividualGames) {
          totalUpPlayerData(individualGameData);
        }

        setTotalStats(tempTotalStats);
      }
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // ===================
  // Fetch All Match Ids
  // ===================
  const fetchAllMatchIds = async (summonerPuuid, regionalRouting, queueId) => {
    setIsLoading(true);
    setError(null);

    // Change the count to 100 when the app is done
    try {
      const res = await fetch(
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?api_key=${apiKey}&queue=${queueId}&start=0&count=10`
      );
      const data = await res.json();

      setAllMatchIds(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // ==========================
  // Fetch All Individual Games
  // ==========================
  const fetchAllIndividualGames = async (regionalRouting, matchId, array) => {
    setIsLoading(true);
    setError(null);

    // Change the count to 100 when the app is done
    try {
      const res = await fetch(
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/${matchId}/?api_key=${apiKey}`
      );
      const data = await res.json();

      array.push(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

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
          allIndividualGames,
          totalStats,
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
