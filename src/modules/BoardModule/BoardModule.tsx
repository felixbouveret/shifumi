import React from "react";
import useStyles from "@/hooks/useStyles";
import style from "./BoardModule.module.scss";
import PlayerHand from "./components/PlayerHand";
import usePlayerHand from "@/hooks/usePlayerHand";
import PlayerBoard from "./components/PlayerBoard";
import CarpetContainer from "@/components/CarpetContainer";
import { Player } from "@/types/game.interface";
import { UseSensorsReturn } from "@/hooks/useSensors";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardPart, BoardSide, CardType, PlayerType } from "@//types/game.enum";

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
  const { getDefaultPlayerHand, getRandomPlayableCard } = usePlayerHand();
  const { s } = useStyles();

  const isOpponentPlayer = player.type === PlayerType.OPPONENT;
  const playerHand = player.cards || getDefaultPlayerHand();
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

    if (start.includes(BoardPart.HAND) && end.includes(BoardPart.BOARD)) {
      const [cardPlayed] = cards.splice(result.source.index, 1);
      setPlayerHand(cards);
      setPlayerPlay(cardPlayed);
      onCardPlayed(player.type);
      return;
    }

    if (start.includes(BoardPart.BOARD) && end.includes(BoardPart.HAND)) {
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
      to: BoardPart.BOARD,
      side: boardSide,
    });
  };

  return (
    <div className={s([style.playerSide, style[boardSide]])}>
      <DragDropContext onDragEnd={onDragEnd} sensors={[scriptedSensor]}>
        <CarpetContainer className={style.playerBoard} goldInset>
          <PlayerBoard
            cardsHidden={isOpponentPlayer && !showPlay}
            plays={playerPlay}
            score={player.score}
            boardSide={boardSide}
            randomPlay={randomPlay}
            wonTheRound={player.wonTheRound}
          />
        </CarpetContainer>
        <PlayerHand
          cardsHidden={isOpponentPlayer}
          playerHand={playerHand}
          disabled={handDisabled}
          boardSide={boardSide}
          onCardPlay={(card) => {
            moveCardScript({
              card: card,
              to: BoardPart.BOARD,
              side: boardSide,
            });
          }}
        />
      </DragDropContext>
    </div>
  );
};

export default BoardModule;
