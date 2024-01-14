import "./PlayerBoard.scss";
import React from "react";
import Card from "../Card";
import { IconButton } from "@mui/joy";
import { QuestionMark } from "@mui/icons-material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardParts, BoardSide, CardType } from "@/types/game.enum";

interface PlayerBoardProps {
  cardsHidden?: boolean;
  plays: CardType[];
  score: number;
  boardSide: BoardSide;
  randomPlay: () => void;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  cardsHidden,
  plays,
  score = 0,
  boardSide,
  randomPlay,
}) => {
  return (
    <Droppable droppableId={`${BoardParts.BOARD}${boardSide}`}>
      {(provided) => (
        <div
          id="playerBoard"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="score">
            <p>{score}</p>
          </div>
          {boardSide === BoardSide.BOTTOM && (
            <IconButton className="button" size="lg" onClick={randomPlay}>
              <QuestionMark />
            </IconButton>
          )}
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
