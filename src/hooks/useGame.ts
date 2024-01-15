import useGameUtils from "@/hooks/useGameUtils";
import usePlayerHand from "@/hooks/usePlayerHand";
import useGamesHistory from "@/hooks/useGamesHistory";
import { useState } from "react";
import { moveCardScriptParams } from "@/hooks/useSensors";
import { Game, PlaysHistory } from "@/types/game.interface";
import {
  BoardPart,
  BoardSide,
  CardType,
  PlayerType,
  RoundResult,
} from "@/types/game.enum";

interface UseGameParams {
  topMoveCardScript: (params: moveCardScriptParams) => void;
  bottomMoveCardScript: (params: moveCardScriptParams) => void;
}

interface UseGameReturn {
  game: Game | null;
  start: () => void;
  restart: () => void;
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
  const {
    getFreshGame,
    checkPoints,
    getRoundResult,
    getRoundWinnerFromResult,
  } = useGameUtils();
  const { getRandomPlayableCard } = usePlayerHand();
  const { saveGame } = useGamesHistory();

  const [game, setGame] = useState<Game | null>(null);
  const [revealPlays, setRevealPlays] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  // State setters
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

  // Game logic
  const start = () => {
    const newGame: Game = getFreshGame();

    setGame(newGame);

    setIsGameStarted(true);
  };

  const wait = async (ms: number): Promise<void> =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  const resetCards = () => {
    if (!game) return;
    topMoveCardScript({
      card: game.opponent.play!,
      to: BoardPart.HAND,
      side: BoardSide.TOP,
    });
    bottomMoveCardScript({
      card: game.localUser.play!,
      to: BoardPart.HAND,
      side: BoardSide.BOTTOM,
    });
  };

  const cleanBoard = () => {
    if (!game) return;
    const newGame = { ...game };

    newGame.rounds++;
    newGame.localUser.wonTheRound = false;
    newGame.opponent.wonTheRound = false;

    setGame(newGame);

    setRevealPlays(false);
    resetCards();
  };

  const userPlay = (playerType: PlayerType) => {
    if (!game || playerType === PlayerType.OPPONENT) return;
    opponentPlay();
  };

  const opponentPlay = () => {
    if (!game) return;

    const randomCard = getRandomPlayableCard();

    topMoveCardScript({
      card: randomCard,
      to: BoardPart.BOARD,
      side: BoardSide.TOP,
    });

    revealPlaysAndCalculateWinner();
  };

  const revealPlaysAndCalculateWinner = async () => {
    await wait(1000); // Wait for card to be moved

    if (!game) return;

    setRevealPlays(true);
    await wait(1000); // Wait for cards to be revealed
    savePlay();

    const newGame = { ...game };

    const roundWinner = getRoundResult(newGame);

    switch (roundWinner) {
      case RoundResult.WIN:
        newGame.localUser.wonTheRound = true;
        newGame.localUser.score++;
        break;
      case RoundResult.LOSE:
        newGame.opponent.wonTheRound = true;
        newGame.opponent.score++;
        break;
      case RoundResult.DRAW:
        break;
      default:
        break;
    }

    const winner = checkPoints(newGame);

    if (winner !== null) {
      newGame.isGameOver = true;
      newGame.winner = winner;
    }

    setGame(newGame);

    if (winner) return saveGame(newGame);

    if (roundWinner !== RoundResult.DRAW) await wait(1500); // Wait for win animation

    cleanBoard();
  };

  const savePlay = () => {
    if (!game) return;

    const newGame = { ...game };
    const { localUser, opponent } = newGame;

    if (!localUser.play || !opponent.play) return;

    const history: PlaysHistory = {
      [PlayerType.LOCAL_USER]: localUser.play,
      [PlayerType.OPPONENT]: opponent.play,
      roundWinner: getRoundWinnerFromResult(getRoundResult(newGame)),
    };
    newGame.playsHistory.push(history);

    setGame(newGame);
  };

  const restart = () => {
    setGame(null);
    setIsGameStarted(false);
    start();
  };

  return {
    game,
    isGameStarted,
    revealPlays,
    start,
    userPlay,
    setPlayerHand,
    setPlayerPlay,
    restart,
  };
};

export default useGame;
