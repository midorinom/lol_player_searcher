# lol_player_searcher

# Introduction

This project was created as part of General Assembly's Software Engineering Immersive course. It is deployed <a href ="https://sword-and-shield.vercel.app" target="_blank">here</a>.

Using the Riot Games API, this app allows the user to search any League of Legends player and then it displays stats and data on the player's recent played games. The user has to select a region to search from as well as a game mode to filter by. Currently, this app only supports searching from the classic Summoner's Rift game modes (normal blind, normal draft, ranked solo/duo, ranked flex) as the stats I have chosen for the app to display are most relevant in these modes and would make less sense in other modes. 

Upon searching for a player, the player's summoner icon, account level and name are shown at the top left of the screen. The left side of the screen contains two main windows. 

The upper window shows the total stats from all the recent games played by the player in the searched game mode, alongside a section that highlights the player's champions with the best overall stats. The lower window shows the stats being split up into three sections. Each of these sections shows the total stats from a third of the total games played, with the newest to oldest games being shown from left to right respectively. 

The right side of the screen displays the match history of the player, with the stats from each individual game being shown. Five games are displayed at a time, with buttons to navigate to the next or previous page, as well as the option to skip to a specific page. The user can also expand the view of each match to show the stats of all 10 players in that particular game. Clicking on any of the 10 players's name would automatically search for that player. 

# Component Hierarchy

* App
  * Home
    * Search
  * Main
    * BasicInfo
    * AllGamesStats
      * GameData
      * Highlights
        * HighlightsCard
    * ProgressionStats
      * ProgressionStatsCard
        * GameData
    * Search
    * MatchHistory
      * MatchHistoryCard
        * MatchHistoryCard1Player
        * MatchHistoryCard10Players
          * TenPlayersCard

# App

The `App` contains all the fetch functions that fetch the required data from the Riot API. Whenever a search happens, the first fetch function to be called is `fetchSummonerData` which takes the inputted summonerName, chosen region and game mode and puts them into the url to perform the fetch. The data retrieved is set to a `summonerData` state which contains the name, puuid, profile icon and summoner level. This data is used to display the information in the `BasicInfo` component. 

Upon setting `summonerData`, a `useEffect` with `summonerData` being one of its dependencies will run, invoking the `fetchAllMatchIds` function which then takes the puuid from `summonerData` and puts it into the url. After the data containing all the player's match ids have been retrieved, the data is set to a `allMatchIds` state.

Upon setting `allMatchIds`, a `useEffect` with `allMatchIds` being one of its dependencies will run, invoking the `fetchAllIndividualGames` function which then runs a for loop. The for loop runs as many times as the number of match ids and in each iteration, it invokes the `fetchIndividualGame` function which fetches the individual game data by taking the i-th index of the `allMatchIds` array and puts it into the url. Then, the individual game data is set to a `individualGameData` state.

Upon setting `individualGameData`, a `useEffect` with `individualGameData` being one of its dependencies will run, pushing the data into the `allIndividualGames` array which is also set as a state. Thus, at the end of the for loop of `fetchAllIndividualGames`, each individual game data will be all stored inside the `allIndividualGames` state as an array. Also, at the end of the for loop, the `fetchDoneAllIndividualGames` state is set to true.

Upon setting `fetchDoneAllIndividualGames`, a `useEffect` with `fetchDoneAllIndividualGames` being one of its dependencies will run, which then runs the `calculateStats` function. The `calculateStats` function is a huge function that performs various object, array manipulation and arithmetic to extract all the data that I want to display and performing the required math (averaging out, rounding to 2 decimal places, converting to percentage and etc.). 

At the end of the `calculateStats` function, the `totalStats`, `highlightsStats` and `progressionStats` states will be set with the respective data. These states will then be used in their respective components to display the respective pieces of data.



