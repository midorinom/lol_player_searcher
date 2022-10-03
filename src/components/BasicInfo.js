import React, { useContext } from "react";
import SearchContext from "../context/searchContext";

const BasicInfo = () => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="flexbox basic-info">
      <div className="flexbox basic-info-left">
        <div className=" flexbox profile-picture-and-summoner-level">
          <img
            src={searchContext.summonerData.profileIconId}
            className="profile-picture"
          />
          <div className="summoner-level">
            {searchContext.summonerData.summonerLevel}
          </div>
        </div>
      </div>
      <div className="flexbox basic-info-right">
        <h1 className="summoner-name">{searchContext.summonerData.name}</h1>
      </div>
    </div>
  );
};

export default BasicInfo;
