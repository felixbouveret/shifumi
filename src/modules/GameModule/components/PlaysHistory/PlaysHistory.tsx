import "./PlaysHistory.scss";
import React from "react";
import useCards from "@/hooks/useCards";
import useGameUtils from "@/hooks/useGameUtils";
import { PlaysHistory } from "@/types/game.interface";

interface PlaysHistoryProps {
  history: PlaysHistory[] | undefined;
}

const PlaysHistory: React.FC<PlaysHistoryProps> = ({ history }) => {
  const { getCardContent } = useCards();
  const { getIconFromEnum, getRoundResult } = useGameUtils();

  return (
    <div id="PlaysHistory">
      <div className="placeholder" />
      <div className="inner">
        {history &&
          history.map((play, index) => (
            <div className="play" key={index}>
              <div className="cards">
                <div>{getCardContent(play.localUser).icon}</div>
                <div>{getCardContent(play.opponent).icon}</div>
              </div>
              <div className="result">
                {getIconFromEnum(getRoundResult(play.roundWinner))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaysHistory;
