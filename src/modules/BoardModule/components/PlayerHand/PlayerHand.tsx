import Card from "@/components/Card";
import React, { useMemo } from "react";
import useStyles from "@/hooks/useStyles";
import style from "./PlayerHand.module.scss";
import { useMediaQuery } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardPart, BoardSide, CardType } from "@/types/game.enum";

interface PlayerHandProps {
  cardsHidden?: boolean;
  boardSide: BoardSide;
  playerHand: CardType[];
  disabled: boolean;
  onCardPlay: (card: CardType) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  cardsHidden,
  playerHand,
  boardSide,
  disabled,
  onCardPlay,
}) => {
  const { s } = useStyles();
  const matches = useMediaQuery("(min-width: 540px)");
  const cardsNumber = useMemo(() => playerHand.length, []);

  const playerHandStyle = {
    width: matches
      ? 138 * cardsNumber - 8 + "px"
      : 108 * cardsNumber - 8 + "px",
  };

  return (
    <Droppable droppableId={BoardPart.HAND + boardSide} direction="horizontal">
      {(provided) => (
        <div
          className={s([
            style.playerHand,
            style[boardSide],
            { [style.handDisabled]: disabled },
            { [style.cardsHidden]: cardsHidden },
          ])}
          style={playerHandStyle}
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
                    onDoubleClick={() => onCardPlay(cardType)}
                    onClick={() => onCardPlay(cardType)}
                    className={style.cardWrapper}
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
