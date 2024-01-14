import usePlayerHand from "./usePlayerHand";
import { useState } from "react";
import { Game } from "@/types/game.interface";
import { moveCardScriptParams } from "./useSensors";
import { BoardParts, BoardSide, CardType, PlayerType } from "@/types/game.enum";

interface UseGameParams {
  topMoveCardScript: (params: moveCardScriptParams) => void;
  bottomMoveCardScript: (params: moveCardScriptParams) => void;
}

interface UseGameReturn {
  game: Game | null;
  start: () => void;
  userPlay: (playerType: PlayerType) => void;
  setPlayerHand: (playerType: PlayerType, cards: CardType[]) => void;
  setPlayerPlay: (playerType: PlayerType, cards: CardType | undefined) => void;
  isGameStarted: boolean;
  revealPlays: boolean;
}

const useGame = ({
  topMoveCardScript,
  bottomMoveCardScript,
}: UseGameParams): UseGameReturn => {
  const { defaultPlayerHand, getRandomPlayableCard } = usePlayerHand();

  const [game, setGame] = useState<Game | null>(null);
  const [revealPlays, setRevealPlays] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const start = () => {
    const newGame: Game = {
      id: new Date().getTime().toString(),

      localUser: {
        type: PlayerType.LOCAL_USER,
        play: undefined,
        cards: defaultPlayerHand,
        score: 0,
        hasPlayed: false,
      },
      opponent: {
        type: PlayerType.OPPONENT,
        play: undefined,
        cards: defaultPlayerHand,
        score: 0,
        hasPlayed: false,
      },
      round: 0,
      isGameOver: false,
      winner: null,
    };

    setGame(newGame);

    setIsGameStarted(true);

    console.log("Waiting for user play...");
  };

  const revealPlaysAndCalculateWinner = () => {
    if (!game) return;

    setRevealPlays(true);

    const newGame = { ...game };
    const { localUser, opponent } = newGame;

    if (localUser.play === opponent.play) {
      console.log("Tie");
    } else if (
      (localUser.play === CardType.ROCK &&
        opponent.play === CardType.SCISSORS) ||
      (localUser.play === CardType.PAPER && opponent.play === CardType.ROCK) ||
      (localUser.play === CardType.SCISSORS && opponent.play === CardType.PAPER)
    ) {
      console.log("Local user wins");
      newGame.localUser.score++;
    } else {
      console.log("Opponent wins");
      newGame.opponent.score++;
    }

    newGame.round++;

    if (newGame.round === 3) {
      newGame.isGameOver = true;
      newGame.winner =
        newGame.localUser.score > newGame.opponent.score
          ? newGame.localUser
          : newGame.opponent;
    }

    setGame(newGame);

    setTimeout(() => {
      setRevealPlays(false);
      resetCards();
    }, 2000);
  };

  const resetCards = () => {
    if (!game) return;
    topMoveCardScript({
      card: game.opponent.play!,
      to: BoardParts.HAND,
      side: BoardSide.TOP,
    });
    bottomMoveCardScript({
      card: game.localUser.play!,
      to: BoardParts.HAND,
      side: BoardSide.BOTTOM,
    });
  };

  const userPlay = (playerType: PlayerType) => {
    if (!game || playerType === PlayerType.OPPONENT) return;
    setTimeout(opponentPlay, 1000);
  };

  const opponentPlay = () => {
    if (!game) return;

    const randomCard = getRandomPlayableCard();

    topMoveCardScript({
      card: randomCard,
      to: BoardParts.BOARD,
      side: BoardSide.TOP,
    });

    setTimeout(revealPlaysAndCalculateWinner, 1000);
  };

  const setPlayerHand = (playerType: PlayerType, cards: CardType[]) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].cards = cards;
    setGame(newGame);
  };

  const setPlayerPlay = (
    playerType: PlayerType,
    card: CardType | undefined
  ) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].play = card;
    newGame[playerType].hasPlayed = !!card;
    setGame(newGame);
  };

  return {
    game,
    isGameStarted,
    revealPlays,
    start,
    userPlay,
    setPlayerHand,
    setPlayerPlay,
  };
};

export default useGame;
