import React, { useContext } from "react";
import SearchContext from "../context/searchContext";
import HighlightsCard from "./HighlightsCard";

const Highlights = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="flexbox highlights-main">
      <HighlightsCard
        highlightsStats={searchContext.highlightsStats}
        stat="highestWinrate"
        percentSign="%"
      >
        Highest Winrate
      </HighlightsCard>
      <HighlightsCard
        highlightsStats={searchContext.highlightsStats}
        stat="highestKda"
      >
        Highest Kda
      </HighlightsCard>
      <HighlightsCard
        highlightsStats={searchContext.highlightsStats}
        stat="highestDamageshare"
      >
        Highest Damage Share
      </HighlightsCard>
      <HighlightsCard
        highlightsStats={searchContext.highlightsStats}
        stat="highestGoldPerMin"
      >
        Highest Gold Per Min
      </HighlightsCard>
      <HighlightsCard
        highlightsStats={searchContext.highlightsStats}
        stat="lowestDeathsPer10Min"
      >
        Lowest Deaths per 10 Min
      </HighlightsCard>
    </div>
  );
};

export default Highlights;
