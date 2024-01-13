import "./BoardModule.scss";
import React, { useState } from "react";
import PlayerHand from "./components/PlayerHand";
import PlayerBoard from "./components/PlayerBoard";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardParts, CardType, UserType } from "../../types/game.enum";

interface BoardModuleProps {
  onCardPlayed: (card: CardType, user: UserType) => void;
  isOpponent?: boolean;
}

const BoardModule: React.FC<BoardModuleProps> = ({
  isOpponent,
  onCardPlayed,
}) => {
  const [playerHand, setPlayerHand] = useState<CardType[]>(
    Object.values(CardType).filter((cardType) => cardType !== CardType.UNKNOWN)
  );
  const [playerBoard, setPlayerBoard] = useState<CardType[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const start = result.source.droppableId;
    const end = result.destination?.droppableId;

    if (start === end) {
      const cards = Array.from(playerHand);
      const [reorderedItem] = cards.splice(result.source.index, 1);
      cards.splice(result.destination.index, 0, reorderedItem);
      setPlayerHand(cards);
      return;
    }

    if (start === BoardParts.HAND && end === BoardParts.BOARD) {
      const cards = Array.from(playerHand);
      const [cardPlayed] = cards.splice(result.source.index, 1);
      setPlayerHand(cards);
      setPlayerBoard([cardPlayed]);
      onCardPlayed(cardPlayed, UserType.PLAYER);
      return;
    }
  };

  return (
    <div id="playerSide" className={isOpponent ? "opponentSide" : ""}>
      <DragDropContext onDragEnd={onDragEnd}>
        <PlayerBoard isOpponent={isOpponent} plays={playerBoard} />
        <PlayerHand
          isOpponent={isOpponent}
          playerHand={playerHand}
          hasPlayed={!!playerBoard.length}
        />
      </DragDropContext>
    </div>
  );
};

export default BoardModule;
