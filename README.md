# lol_player_searcher

# Introduction

This project was created as part of General Assembly's Software Engineering Immersive course. It is deployed <a href ="https://sword-and-shield.vercel.app" target="_blank">here</a>.

This app allows the user to search any League of Legends player and then it displays stats and data on the player's recent played games. The user has to select a region to search from as well as a game mode to filter by. Currently, this app only supports searching from the classic Summoner's Rift game modes (normal blind, normal draft, ranked solo/duo, ranked flex) as the stats I have chosen for the app to display are most relevant in these modes and would make less sense in other modes. 

Upon searching for a player, the player's summoner icon, account level and name are shown at the top left of the screen. The left side of the screen contains two main windows. 

The upper window shows the total stats from all the recent games played by the player in the searched game mode, alongside a section that highlights the player's champions with the best overall stats. The lower window shows the stats being split up into three sections. Each of these sections shows the total stats from a third of the total games played, with the newest to oldest games being shown from left to right respectively. 

The right side of the screen displays the match history of the player, with the stats from each individual game being shown. Five games are displayed at a time, with buttons to navigate to the next or previous page, as well as the option to skip to a specific page. The user can also expand the view of each match to show the stats of all 10 players in that particular game. Clicking on any of the 10 players's name would automatically search for that player. 

# Component Hierarchy

* App
  * Home
    * Search
  * Main
    * Basic Info
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
