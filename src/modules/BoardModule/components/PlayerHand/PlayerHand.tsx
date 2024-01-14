import "./PlayerHand.scss";
import React from "react";
import Card from "../Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardParts, BoardSide, CardType } from "@/types/game.enum";

interface PlayerHandProps {
  cardsHidden?: boolean;
  boardSide: BoardSide;
  playerHand: CardType[];
  disabled: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  cardsHidden,
  playerHand,
  boardSide,
  disabled,
}) => {
  return (
    <Droppable droppableId={BoardParts.HAND + boardSide} direction="horizontal">
      {(provided) => (
        <div
          id="playerHand"
          className={[
            disabled ? "handDisabled" : "",
            cardsHidden ? "cardsHidden" : "",
            boardSide,
          ].join(" ")}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {playerHand.map((cardType, index) => {
            return (
              <Draggable
                key={cardType}
                draggableId={cardType + boardSide}
                index={index}
                isDragDisabled={disabled}
              >
                {(provided) => (
                  <div
                    className="cardWrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      type={cardsHidden ? CardType.UNKNOWN : cardType}
                      isFlipped={cardsHidden}
                      hoverable={!cardsHidden}
                      isDisabled={disabled}
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
