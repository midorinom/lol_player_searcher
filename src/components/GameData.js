import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GameData = (props) => {
  const searchContext = useContext(SearchContext);

  const data = {
    datasets: [
      {
        label: "Win-Loss",
        data: [props.stats.wins, props.stats.losses],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {searchContext.isLoading === false && (
        <div className="gameData">
          <div className="flexbox gameDataWinLoss">
            <p>
              {props.stats.wins} Wins {props.stats.losses} Losses (
              {Math.round(
                (props.stats.wins / (props.stats.wins + props.stats.losses)) *
                  10000
              ) / 100}
              %)
            </p>
            <Pie className="pieChart" data={data} />
          </div>
          <p>
            K/D/A : {props.stats.kills}/{props.stats.deaths}/
            {props.stats.assists} (
            {Math.round(
              ((props.stats.kills + props.stats.assists) / props.stats.deaths) *
                100
            ) / 100}
            )
          </p>
          <p>
            Average Damage Share of Team:{" "}
            {Math.round(
              (props.stats.damageShare / props.numberOfGames) * 10000
            ) / 100}
            %
          </p>
          <p>
            Average Gold per minute :{" "}
            {Math.round((props.stats.goldPerMin / props.numberOfGames) * 100) /
              100}
          </p>
          <p>
            Average Deaths per 10 minutes :{" "}
            {Math.round(
              (props.stats.deathsPer10Min / props.numberOfGames) * 100
            ) / 100}
          </p>
        </div>
      )}
    </>
  );
};

export default GameData;
