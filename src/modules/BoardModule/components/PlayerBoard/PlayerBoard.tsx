import React from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import style from "./PlayerBoard.module.scss";
import { Shuffle } from "@mui/icons-material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardPart, BoardSide, CardType } from "@/types/game.enum";

interface PlayerBoardProps {
  cardsHidden?: boolean;
  plays: CardType[];
  score: number;
  boardSide: BoardSide;
  wonTheRound: boolean;
  randomPlay: () => void;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  cardsHidden,
  plays,
  score = 0,
  boardSide,
  wonTheRound,
  randomPlay,
}) => {
  return (
    <div id={style.playerBoard}>
      <p className={style.score}>{score}</p>

      <Droppable droppableId={`${BoardPart.BOARD}${boardSide}`}>
        {(provided) => (
          <div
            className={style.cardSpot}
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
                    className={style.cardWrapper}
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

      <div className={style.action}>
        {boardSide === BoardSide.BOTTOM && (
          <Button
            iconButton
            className={style.button}
            disabled={!!plays.length || cardsHidden}
            onClick={randomPlay}
          >
            <Shuffle />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlayerBoard;
