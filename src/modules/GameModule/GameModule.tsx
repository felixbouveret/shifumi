import "./GameModule.scss";
import useGame from "@/hooks/useGame";
import React, { useEffect } from "react";
import BoardModule from "@/modules/BoardModule";
import usePlayerHand from "@/hooks/usePlayerHand";
import { IconButton } from "@mui/joy";
import { Settings } from "@mui/icons-material";
import { Player } from "@/types/game.interface";
import { BoardSide, CardType, PlayerType } from "@/types/game.enum";

const GameModule: React.FC = () => {
  const { defaultPlayerHand } = usePlayerHand();

  const initialPlayer: Player = {
    type: PlayerType.OPPONENT,
    play: undefined,
    score: 0,
    cards: defaultPlayerHand,
  };

  const {
    isGameStarted,
    game,
    revealPlays,
    start,
    userPlay,
    setPlayerHand,
    setPlayerPlay,
  } = useGame();

  const onCardPlayed = (card: CardType) => {
    userPlay(card);
  };

  useEffect(() => {
    setTimeout(() => start(), 1000);
  }, []);

  return (
    <div id="gameModule">
      <div className="header">
        <IconButton className="settingsButton" size="lg">
          <Settings />
        </IconButton>
      </div>
      <BoardModule
        handDisabled={!isGameStarted}
        boardSide={BoardSide.TOP}
        onCardPlayed={onCardPlayed}
        player={game?.opponent || initialPlayer}
        showPlay={revealPlays}
        setPlayerHand={(cards: CardType[]) =>
          setPlayerHand(PlayerType.OPPONENT, cards)
        }
        setPlayerPlay={(card: CardType) =>
          setPlayerPlay(PlayerType.LOCAL_USER, card)
        }
      />
      <BoardModule
        handDisabled={!isGameStarted}
        boardSide={BoardSide.BOTTOM}
        onCardPlayed={onCardPlayed}
        player={game?.localUser || initialPlayer}
        setPlayerHand={(cards: CardType[]) =>
          setPlayerHand(PlayerType.LOCAL_USER, cards)
        }
        setPlayerPlay={(card: CardType) =>
          setPlayerPlay(PlayerType.LOCAL_USER, card)
        }
      />
    </div>
  );
};

export default GameModule;
