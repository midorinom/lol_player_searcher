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
  const apiKey = "RGAPI-d08bfd72-72f6-4d71-82e6-579609a94595";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerData, setSummonerData] = useState("");
  const [allMatchIds, setAllMatchIds] = useState("");
  const [allMatchData, setAllMatchData] = useState([]);

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

  // ===================
  // Fetch Summoner Data
  // ===================
  const fetchSummonerData = async (summonerName, platformRouting, queueId) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://${platformRouting}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );
      const data = await res.json();

      setSummonerData({
        name: data.name,
        puuid: data.puuid,
        profileIconId: `http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${data.profileIconId}.png`,
        summonerLevel: data.summonerLevel,
      });

      const regionalRouting = getRegionalRouting(platformRouting);

      fetchAllMatchIds(data.puuid, regionalRouting, queueId);

      for (let i = 0; i < allMatchIds.length; i++) {
        fetchAllIndividualGames(regionalRouting, allMatchIds[i]);
      }

      console.log(allMatchData);
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

  const fetchAllIndividualGames = async (regionalRouting, matchId) => {
    setIsLoading(true);
    setError(null);

    // Change the count to 100 when the app is done
    try {
      const res = await fetch(
        `https://${regionalRouting}.api.riotgames.com/lol/match/v5/matches/${matchId}/?api_key=${apiKey}`
      );
      const data = await res.json();

      setAllMatchData((prevState) => [...prevState, data]);
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
        value={{ summonerData, fetchSummonerData, isLoading }}
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
