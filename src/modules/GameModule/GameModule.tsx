import "./GameModule.scss";
import useGame from "@/hooks/useGame";
import React, { useEffect } from "react";
import BoardModule from "@/modules/BoardModule";
import usePlayerHand from "@/hooks/usePlayerHand";
import { Player } from "@/types/game.interface";
import { useSensors } from "@/hooks/useSensors";
import { BoardSide, CardType, PlayerType } from "@/types/game.enum";

const GameModule: React.FC = () => {
  const { defaultPlayerHand } = usePlayerHand();

  const initialPlayer: Player = {
    type: PlayerType.OPPONENT,
    play: undefined,
    score: 0,
    cards: defaultPlayerHand,
    hasPlayed: false,
  };

  const topSensorHook = useSensors();
  const bottomSensorHook = useSensors();

  const {
    game,
    isGameStarted,
    revealPlays,
    start,
    userPlay,
    setPlayerHand,
    setPlayerPlay,
  } = useGame({
    topMoveCardScript: topSensorHook.moveCardScript,
    bottomMoveCardScript: bottomSensorHook.moveCardScript,
  });

  useEffect(() => {
    setTimeout(() => start(), 1000);
  }, []);

  return (
    <div id="gameModule">
      <BoardModule
        handDisabled={!isGameStarted || !!game?.opponent?.hasPlayed}
        boardSide={BoardSide.TOP}
        onCardPlayed={userPlay}
        player={game?.opponent || initialPlayer}
        showPlay={revealPlays}
        setPlayerHand={(cards: CardType[]) =>
          setPlayerHand(PlayerType.OPPONENT, cards)
        }
        setPlayerPlay={(card: CardType | undefined) =>
          setPlayerPlay(PlayerType.OPPONENT, card)
        }
        sensorHook={topSensorHook}
      />
      <BoardModule
        handDisabled={!isGameStarted || !!game?.localUser?.hasPlayed}
        boardSide={BoardSide.BOTTOM}
        onCardPlayed={userPlay}
        player={game?.localUser || initialPlayer}
        setPlayerHand={(cards: CardType[]) =>
          setPlayerHand(PlayerType.LOCAL_USER, cards)
        }
        setPlayerPlay={(card: CardType | undefined) =>
          setPlayerPlay(PlayerType.LOCAL_USER, card)
        }
        sensorHook={bottomSensorHook}
      />
    </div>
  );
};

export default GameModule;
