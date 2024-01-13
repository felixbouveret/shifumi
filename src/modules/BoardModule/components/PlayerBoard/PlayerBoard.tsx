import "./PlayerBoard.scss";
import React from "react";
import Card from "../Card";
import { BoardParts, CardType } from "@/types/game.enum";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface PlayerBoardProps {
  cardsHidden?: boolean;
  plays: CardType[];
  score: number;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  cardsHidden,
  plays,
  score = 0,
}) => {
  return (
    <Droppable droppableId={BoardParts.BOARD}>
      {(provided) => (
        <div
          id="playerBoard"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="score">
            <p>{score}</p>
          </div>
          {plays.map((play, index) => (
            <Draggable
              key={play}
              draggableId={play}
              index={index}
              isDragDisabled
            >
              {(provided) => (
                <div
                  className="cardWrapper"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    type={play}
                    isFlipped={cardsHidden}
                    hoverable={!cardsHidden}
                    isPlayed
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlayerBoard;
