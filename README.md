# lol_player_searcher

# Introduction

This project was created as part of General Assembly's Software Engineering Immersive course. It is deployed <a href ="https://sword-and-shield.vercel.app" target="_blank">here</a>.

Using the Riot Games API, this app allows the user to search any League of Legends player and then it displays stats and data on the player's recent played games. The user has to select a region to search from as well as a game mode to filter by. Currently, this app only supports searching from the classic Summoner's Rift game modes (normal blind, normal draft, ranked solo/duo, ranked flex) as the stats I have chosen for the app to display are most relevant in these modes and would make less sense in other modes. Also, due to the API request limitations set by Riot Games, the app cannot make more than 200 requests in 2 minutes, so I decided to limit the number of matches searched at a time to a maximum of 30.

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

# MatchHistory

The `MatchHistory` component uses a `pageNumber` state that is set to the current page that the user is viewing, with the default being set to 1 whenever a new search happens. The array of `allindividualGames` is spliced into a new smaller array of 5 games with the games being determined by the `pageNumber`. The array of these 5 games are then mapped out to return an array containing 5 `MatchHistoryCard` components with the props containing the data from each individual game of these 5 games.

The `MatchHistoryCard` component will mount either the `MatchHistoryCard1Player` or `MatchHistoryCard10Players` component depending on whether the `viewMoreClicked` state is true or false. This state is toggled when the "View More" button is clicked. 

The `MatchHistoryCard1Player` component simply takes the data from using the `totalUpPlayerData` function defined in the `App` component and then displays them in the format that I wanted. 

The `MatchHistoryCard10Players` component takes the individual game data and splits the data of individual players into their respective teams and with the blue team's data being displayed on the left and the red team's data being displayed on the right. There is also a "Back" button that when clicked will toggle the `viewMoreClicked` function defined in the `MatchHistoryCard` component that will switch the view back to `MatchHistoryCard1Player` view. 

The `MatchHistoryCard10Players` component also generates a total of 10 `TenPlayersCard` components. Each one contains the data of each individual player in its props and then displays them, alongside an `onClick` function on the player name that will invoke `fetchSummonerData` to search for the player who is clicked on. An exception is made for clicking on the currently searched player's name such that a search would not take place.

# Areas for Improvement

* Error modal does not appear if something goes wrong during any of the fetch function, so that could be fixed.
* Adding a form validation for making a blank search.
* If a player searched does not exist or if there are no games played in the mode that is searched, the search still resolves but some of the stats will be shown as NaN. Could make an error catcher for this scenario.
* Make the fetch abort its current fetch if a new fetch is made. Currently, if the user makes multiple searches before the current search is resolved, the app could crash or the API request limit would be reached extremely quickly.
* Currently when "View More" is clicked on a match history card, the other match history cards will be collapsed with the words overflowing out of the screen. Could instead make the words of the other match history cards truncate to "..." when a "View More" is clicked.
* The stats in the "Highlights" section are sometimes overrepresented by a small sample size or appear climsily (e.g. if a champion is only played once and results in a win, it will be shown in the highlights as having 100% winrate, or if the player has 0 total deaths on any champion it will be shown as having a KDA of Infinity).
* Adding more features such as the ability to filter the searched by specific champions, displaying the recent searches or being able to favourite a player's profile so as to revisit it easily again.
