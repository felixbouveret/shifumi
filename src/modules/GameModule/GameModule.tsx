import useGame from "@/hooks/useGame";
import React, { useEffect } from "react";
import style from "./GameModule.module.scss";
import BoardModule from "@/modules/BoardModule";
import useGameUtils from "@/hooks/useGameUtils";
import PlaysHistory from "./components/PlaysHistory";
import PartyEndPopin from "@/components/PartyEndPopin";
import { Player } from "@/types/game.interface";
import { useSensors } from "@/hooks/useSensors";
import { BoardSide, CardType, PlayerType } from "@/types/game.enum";

const GameModule: React.FC = () => {
  const { getFreshPlayer } = useGameUtils();

  const initialPlayer: Player = getFreshPlayer(PlayerType.OPPONENT);

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

  useEffect(() => {
    setTimeout(() => start(), 1000);
  }, []);

  return (
    <div className={style.gameModule}>
      {<PlaysHistory history={game?.playsHistory} />}
      <div className={style.boards}>
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
      <p className={style.roundCount}>Round {game ? game.rounds + 1 : 1}</p>
      <div className={style.boards}>
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
