import "./Card.scss";
import React from "react";
import { CardType } from "../../../../types/game";

interface CardProps {
  type: CardType;
  isFlipped?: boolean;
  hoverable?: boolean;
  isPlayed?: boolean;
  isDisabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  type,
  isFlipped,
  hoverable,
  isPlayed,
  isDisabled,
}) => {
  const cardContent = () => {
    switch (type) {
      case CardType.ROCK:
        return { icon: "🪨", title: "Rock" };
      case CardType.PAPER:
        return { icon: "📄", title: "Paper" };
      case CardType.SCISSORS:
        return { icon: "✂️", title: "Scissors" };
      case CardType.UNKNOWN:
        return { icon: "❓", title: "Unknown" };
    }
  };

  return (
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
        <div className="content"></div>
      </div>
      <div className="front">
        <div className="content">
          <h2>{cardContent().icon}</h2>
          <p>{cardContent().title}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
