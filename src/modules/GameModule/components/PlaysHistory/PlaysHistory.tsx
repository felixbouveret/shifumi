import "./PlaysHistory.scss";
import React from "react";
import useCards from "@/hooks/useCards";
import useGameUtils from "@/hooks/useGameUtils";
import CarpetContainer from "@/components/CarpetContainer";
import { PlayerType } from "@/types/game.enum";
import { PlaysHistory } from "@/types/game.interface";

interface PlaysHistoryProps {
  history: PlaysHistory[] | undefined;
}

const PlaysHistory: React.FC<PlaysHistoryProps> = ({ history }) => {
  const { getCardContent } = useCards();
  const { getIconFromEnum, getRoundResultFromWinner } = useGameUtils();

  return (
    <CarpetContainer className="PlaysHistoryContainer" goldFrame>
      <div className="labels">
        <div className="cards">
          <span>{getIconFromEnum(PlayerType.LOCAL_USER)}</span>
          <span>{getIconFromEnum(PlayerType.OPPONENT)}</span>
        </div>
        <span className="result">R</span>
      </div>
      <div className="PlaysHistory">
        <div className="placeholder" />
        <div className="inner">
          {history &&
            history.map((play, index) => (
              <div className="play" key={index}>
                <p className="index">{index + 1}</p>
                <div className="cards">
                  <div>{getCardContent(play.localUser).icon}</div>
                  <div>{getCardContent(play.opponent).icon}</div>
                </div>
                <div className="result">
                  {getIconFromEnum(getRoundResultFromWinner(play.roundWinner))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </CarpetContainer>
  );
};

export default PlaysHistory;
