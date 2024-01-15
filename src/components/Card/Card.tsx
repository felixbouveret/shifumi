import "./Card.scss";
import React from "react";
import useCards from "@/hooks/useCards";
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

  const confettiConfig: ConfettiProps = {
    force: 0.4,
    duration: 2500,
    particleCount: 30,
    width: 400,
  };

  const cardType = type || CardType.UNKNOWN;

  return (
    <div
      className={[
        "cardContainer",
        isPlayed ? "playedContainer" : "",
        winnerCard ? "winnerContainer" : "",
        flipOnHover ? "flipOnHover" : "",
      ].join(" ")}
    >
      <div className="confetti">
        {winnerCard && <ConfettiExplosion {...confettiConfig} />}
      </div>
      <div
        className={[
          "card",
          hoverable ? "hoverable" : "",
          isFlipped ? "flipped" : "",
          isPlayed ? "played" : "",
          isDisabled ? "disabled" : "",
        ].join(" ")}
      >
        <div className="back">
          <div className="content">
            <div className="detail">
              <h2>♠️</h2>
            </div>
          </div>
        </div>
        <div className="front">
          <div className="content">
            <p className="letters top">{getCardContent(cardType).title[0]}</p>
            <h2>{getCardContent(cardType).icon}</h2>
            <p className="letters bot">{getCardContent(cardType).title[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
