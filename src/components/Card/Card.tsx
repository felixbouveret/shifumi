import React from "react";
import style from "./Card.module.scss";
import useCards from "@/hooks/useCards";
import useStyles from "@/hooks/useStyles";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import { CardType } from "@/types/game.enum";

interface CardProps {
  type?: CardType;
  isFlipped?: boolean;
  flipOnHover?: boolean;
  hoverable?: boolean;
  isPlayed?: boolean;
  isDisabled?: boolean;
  winnerCard?: boolean;
}

const Card: React.FC<CardProps> = ({
  type,
  isFlipped,
  flipOnHover,
  hoverable,
  isPlayed,
  isDisabled,
  winnerCard,
}) => {
  const { getCardContent } = useCards();
  const { s } = useStyles();

  const confettiConfig: ConfettiProps = {
    force: 0.4,
    duration: 2500,
    particleCount: 30,
    width: 400,
  };

  const cardType = type || CardType.UNKNOWN;

  return (
    <div
      className={s([
        style.cardContainer,
        {
          [style.playedContainer]: isPlayed,
          [style.winnerContainer]: winnerCard,
          [style.flipOnHover]: flipOnHover,
        },
      ])}
    >
      <div className={style.confetti}>
        {winnerCard && <ConfettiExplosion {...confettiConfig} />}
      </div>
      <div
        className={s([
          style.card,
          { [style.hoverable]: hoverable },
          { [style.flipped]: isFlipped },
          { [style.played]: isPlayed },
          { [style.disabled]: isDisabled },
        ])}
      >
        <div className={style.back}>
          <div className={style.content}>
            <div className={style.detail}>
              <h2>♠️</h2>
            </div>
          </div>
        </div>
        <div className={style.front}>
          <div className={style.content}>
            <p className={s([style.letters, style.top])}>
              {getCardContent(cardType).title[0]}
            </p>
            <h2>{getCardContent(cardType).icon}</h2>
            <p className={s([style.letters, style.bot])}>
              {getCardContent(cardType).title[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
