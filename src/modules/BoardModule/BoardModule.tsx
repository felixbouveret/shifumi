import "./BoardModule.scss";
import React from "react";
import PlayerHand from "./components/PlayerHand";
import usePlayerHand from "@/hooks/usePlayerHand";
import PlayerBoard from "./components/PlayerBoard";
import { Player } from "@/types/game.interface";
import { UseSensorsReturn } from "@/hooks/useSensors";
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
  onCardPlayed: (player: PlayerType) => void;
  setPlayerHand: (cards: CardType[]) => void;
  setPlayerPlay: (card: CardType | undefined) => void;
  sensorHook: UseSensorsReturn;
}

const BoardModule: React.FC<BoardModuleProps> = ({
  handDisabled,
  showPlay,
  boardSide,
  player,
  onCardPlayed,
  setPlayerHand,
  setPlayerPlay,
  sensorHook,
}) => {
  const { defaultPlayerHand, getRandomPlayableCard } = usePlayerHand();

  const isOpponentPlayer = player.type === PlayerType.OPPONENT;
  const playerHand = player.cards || defaultPlayerHand;
  const playerPlay = player.play ? [player.play] : [];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const start = result.source.droppableId;
    const end = result.destination?.droppableId;

    const cards = Array.from(playerHand);

    if (start === end) {
      const [reorderedItem] = cards.splice(result.source.index, 1);
      cards.splice(result.destination.index, 0, reorderedItem);
      setPlayerHand(cards);
      return;
    }

    if (start.includes(BoardParts.HAND) && end.includes(BoardParts.BOARD)) {
      const [cardPlayed] = cards.splice(result.source.index, 1);
      setPlayerHand(cards);
      setPlayerPlay(cardPlayed);
      onCardPlayed(player.type);
      return;
    }

    if (start.includes(BoardParts.BOARD) && end.includes(BoardParts.HAND)) {
      cards.splice(result.destination.index, 0, playerPlay[0]);
      setPlayerHand(cards);
      setPlayerPlay(undefined);
      return;
    }
  };

  const { scriptedSensor, moveCardScript } = sensorHook;

  const randomPlay = () => {
    moveCardScript({
      card: getRandomPlayableCard(),
      to: BoardParts.BOARD,
      side: boardSide,
    });
  };

  return (
    <div id="playerSide" className={boardSide}>
      <DragDropContext onDragEnd={onDragEnd} sensors={[scriptedSensor]}>
        <div>
          <PlayerBoard
            cardsHidden={isOpponentPlayer && !showPlay}
            plays={playerPlay}
            score={player.score}
            boardSide={boardSide}
            randomPlay={randomPlay}
          />
        </div>
        <PlayerHand
          cardsHidden={isOpponentPlayer}
          playerHand={playerHand}
          disabled={handDisabled}
          boardSide={boardSide}
          onDoubleClick={(card) => {
            moveCardScript({
              card: card,
              to: BoardParts.BOARD,
              side: boardSide,
            });
          }}
        />
      </DragDropContext>
    </div>
  );
};

export default BoardModule;
