import React from "react";
import useCards from "@/hooks/useCards";
import style from "./PlaysHistory.module.scss";
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
    <CarpetContainer className={style.PlaysHistoryContainer} goldFrame>
      <div className={style.labels}>
        <div className={style.cards}>
          <span>{getIconFromEnum(PlayerType.LOCAL_USER)}</span>
          <span>{getIconFromEnum(PlayerType.OPPONENT)}</span>
        </div>
        <span className={style.result}>R</span>
      </div>
      <div className={style.PlaysHistory}>
        <div className={style.placeholder} />
        <div className={style.inner}>
          {history &&
            history.map((play, index) => (
              <div className={style.play} key={index}>
                <p className={style.index}>{index + 1}</p>
                <div className={style.cards}>
                  <div>{getCardContent(play.localUser).icon}</div>
                  <div>{getCardContent(play.opponent).icon}</div>
                </div>
                <div className={style.result}>
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
