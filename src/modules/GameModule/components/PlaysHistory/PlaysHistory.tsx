import React from "react";
import Icon from "@/components/Icon";
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
  const { s } = useStyles();
  const { getRoundResultFromWinner } = useGameUtils();

  return (
    <CarpetContainer className={style.playsHistoryContainer} goldFrame>
      <div className={s([style.head, style.row])}>
        <div className={style.cards}>
          <Icon name={PlayerType.LOCAL_USER} size={16} />
          <Icon name={PlayerType.OPPONENT} size={16} />
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
                  <Icon name={play.localUser} size={16} />
                  <Icon name={play.opponent} size={16} />
                </div>
                <Icon
                  className={style.result}
                  name={getRoundResultFromWinner(play.roundWinner)}
                  size={16}
                />
              </div>
            ))}
        </div>
      </div>
    </CarpetContainer>
  );
};

export default PlaysHistory;
