import "./GameModule.scss";
import useGame from "@/hooks/useGame";
import React, { useEffect } from "react";
import BoardModule from "@/modules/BoardModule";
import usePlayerHand from "@/hooks/usePlayerHand";
import PartyEndPopin from "@/components/PartyEndPopin";
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
    wonTheRound: false,
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
    restart,
  } = useGame({
    topMoveCardScript: topSensorHook.moveCardScript,
    bottomMoveCardScript: bottomSensorHook.moveCardScript,
  });
  console.log(game);

  useEffect(() => {
    setTimeout(() => start(), 1000);
  }, []);

  return (
    <div id="gameModule">
      <div className="boards">
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
      </div>
      <p className="roundCount">Round {game ? game.round + 1 : 1}</p>
      <div className="boards">
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

      {!!game?.winner && (
        <PartyEndPopin
          visible={!!game?.winner}
          player={game?.winner}
          onClosed={restart}
        />
      )}
    </div>
  );
};

export default GameModule;
