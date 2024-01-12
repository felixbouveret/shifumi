import "./PlayerHand.scss";
import React from "react";
import Card from "../Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardParts, CardType } from "../../../../types/game";

interface PlayerHandProps {
  isOpponent?: boolean;
  playerHand: CardType[];
  hasPlayed?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  isOpponent,
  playerHand,
  hasPlayed,
}) => {
  return (
    <Droppable droppableId={BoardParts.HAND} direction="horizontal">
      {(provided) => (
        <div
          id="playerHand"
          className={hasPlayed ? "hasPlayed" : ""}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {playerHand.map((cardType, index) => {
            return (
              <Draggable
                key={cardType}
                draggableId={cardType}
                index={index}
                isDragDisabled={isOpponent || hasPlayed}
              >
                {(provided) => (
                  <div
                    className="cardWrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      type={isOpponent ? CardType.UNKNOWN : cardType}
                      isFlipped={isOpponent}
                      hoverable={!isOpponent}
                      isDisabled={hasPlayed}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlayerHand;
