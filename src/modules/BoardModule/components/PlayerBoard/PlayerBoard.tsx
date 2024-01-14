import "./PlayerBoard.scss";
import React from "react";
import Card from "../Card";
import { IconButton } from "@mui/joy";
import { Shuffle } from "@mui/icons-material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardParts, BoardSide, CardType } from "@/types/game.enum";

interface PlayerBoardProps {
  cardsHidden?: boolean;
  plays: CardType[];
  score: number;
  boardSide: BoardSide;
  wonTheRound: boolean;
  randomPlay: () => void;
}

const buttonStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "#185118",
  boxShadow: "0 0 0 2px #185118, 0 0 0 4px rgba(0, 0, 0, 0.3)",
};

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  cardsHidden,
  plays,
  score = 0,
  boardSide,
  wonTheRound,
  randomPlay,
}) => {
  return (
    <div id="playerBoard">
      <div className="action">
        {boardSide === BoardSide.BOTTOM && (
          <IconButton
            className="button"
            disabled={!!plays.length}
            size="lg"
            onClick={randomPlay}
            style={buttonStyle}
          >
            <Shuffle />
          </IconButton>
        )}
      </div>
      <Droppable droppableId={`${BoardParts.BOARD}${boardSide}`}>
        {(provided) => (
          <div
            className="cardSpot"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {plays.map((play, index) => (
              <Draggable
                key={play}
                draggableId={play + boardSide}
                index={index}
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
                      winnerCard={wonTheRound}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <p className="score">{score}</p>
    </div>
  );
};

export default PlayerBoard;
