import "./BoardModule.scss";
import PlayerHand from "./components/PlayerHand";
import usePlayerHand from "@/hooks/usePlayerHand";
import React, { useEffect, useState } from "react";
import PlayerBoard from "./components/PlayerBoard";
import { Player } from "@/types/game.interface";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  BoardParts,
  BoardSide,
  CardType,
  PlayerType,
} from "@//types/game.enum";

interface BoardModuleProps {
  handDisabled: boolean;
  showPlay?: boolean;
  boardSide: BoardSide;
  player: Player;
  onCardPlayed: (card: CardType, player: PlayerType) => void;
}

const BoardModule: React.FC<BoardModuleProps> = ({
  handDisabled,
  showPlay,
  boardSide,
  player,
  onCardPlayed,
}) => {
  const { defaultPlayerHand } = usePlayerHand();

  const [playerHand, setPlayerHand] = useState<CardType[]>(defaultPlayerHand);
  const [playerBoard, setPlayerBoard] = useState<CardType[]>([]);

  const isOpponentPlayer = player.type === PlayerType.OPPONENT;

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
      onCardPlayed(cardPlayed, PlayerType.LOCAL_USER);
      return;
    }
  };

  useEffect(() => {
    if (player?.play) {
      setPlayerBoard([player.play]);
    }
  }, [player.play]);

  return (
    <div id="playerSide" className={boardSide}>
      <DragDropContext onDragEnd={onDragEnd}>
        <PlayerBoard
          cardsHidden={isOpponentPlayer && !showPlay}
          plays={playerBoard}
        />
        <PlayerHand
          cardsHidden={isOpponentPlayer}
          playerHand={playerHand}
          disabled={handDisabled}
          boardSide={boardSide}
        />
      </DragDropContext>
    </div>
  );
};

export default BoardModule;
