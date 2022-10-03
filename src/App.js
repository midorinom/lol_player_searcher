import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SearchContext from "./context/searchContext";
import ErrorModal from "./components/ErrorModal";
import Home from "./components/Home";

function App() {
  const apiKey = "RGAPI-d08bfd72-72f6-4d71-82e6-579609a94595";
  const [error, setError] = useState(null);
  const [summonerData, setSummonerData] = useState("");

  function handleModalOkay() {
    setError(false);
  }

  const fetchSummonerData = async (summonerName) => {
    setError(null);

    try {
      const res = await fetch(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );
      const data = await res.json();

      setSummonerData({
        name: data.name,
        puuid: data.puuid,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel,
      });

      console.log(summonerData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <SearchContext.Provider value={{ fetchSummonerData }}>
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
                <Home fetchSummonerData={fetchSummonerData} />
              </>
            }
          />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
