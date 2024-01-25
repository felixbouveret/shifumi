import React from "react";
import useCards from "@/hooks/useCards";
import useStyles from "@/hooks/useStyles";
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
  const { s } = useStyles();
  const { getIconFromEnum, getRoundResultFromWinner } = useGameUtils();

  return (
    <CarpetContainer className={style.playsHistoryContainer} goldFrame>
      <div className={s([style.head, style.row])}>
        <div className={style.cards}>
          <span>{getIconFromEnum(PlayerType.LOCAL_USER)}</span>
          <span>{getIconFromEnum(PlayerType.OPPONENT)}</span>
        </div>
        <span className={style.result}>R</span>
      </div>
      <div className={style.playsHistory}>
        <div className={style.placeholder} />
        <div className={style.inner}>
          {history &&
            history.map((play, index) => (
              <div className={s([style.play, style.row])} key={index}>
                <p className={style.index}>{index + 1}</p>
                <div className={style.cards}>
                  <span>{getCardContent(play.localUser).icon}</span>
                  <span>{getCardContent(play.opponent).icon}</span>
                </div>
                <span className={style.result}>
                  {getIconFromEnum(getRoundResultFromWinner(play.roundWinner))}
                </span>
              </div>
            ))}
        </div>
      </div>
    </CarpetContainer>
  );
};

export default PlaysHistory;
