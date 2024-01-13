import "./PlayerBoard.scss";
import React from "react";
import Card from "../Card";
import { BoardParts, CardType } from "@/types/game.enum";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface PlayerBoardProps {
  isOpponent?: boolean;
  plays: CardType[];
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ isOpponent, plays }) => {
  return (
    <Droppable droppableId={BoardParts.BOARD}>
      {(provided) => (
        <div
          id="playerBoard"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
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
                    isFlipped={isOpponent}
                    hoverable={!isOpponent}
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
