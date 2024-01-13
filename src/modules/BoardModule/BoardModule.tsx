import "./BoardModule.scss";
import React from "react";
import PlayerHand from "./components/PlayerHand";
import usePlayerHand from "@/hooks/usePlayerHand";
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
  setPlayerHand: (cards: CardType[]) => void;
  setPlayerPlay: (card: CardType) => void;
}

const BoardModule: React.FC<BoardModuleProps> = ({
  handDisabled,
  showPlay,
  boardSide,
  player,
  onCardPlayed,
  setPlayerHand,
  setPlayerPlay,
}) => {
  const { defaultPlayerHand } = usePlayerHand();

  const isOpponentPlayer = player.type === PlayerType.OPPONENT;
  const playerHand = player.cards || defaultPlayerHand;
  const playerPlay = player.play ? [player.play] : [];

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
      setPlayerPlay(cardPlayed);
      onCardPlayed(cardPlayed, PlayerType.LOCAL_USER);
      return;
    }
  };

  return (
    <div id="playerSide" className={boardSide}>
      <DragDropContext onDragEnd={onDragEnd}>
        <PlayerBoard
          cardsHidden={isOpponentPlayer && !showPlay}
          plays={playerPlay}
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
