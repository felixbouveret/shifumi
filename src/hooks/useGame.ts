import useGameUtils from "./useGameUtils";
import usePlayerHand from "./usePlayerHand";
import useGamesHistory from "./useGamesHistory";
import { useState } from "react";
import { moveCardScriptParams } from "./useSensors";
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
    getFreshPlayer,
    checkPoints,
    getRoundResult,
    getRoundWinnerFromResult,
  } = useGameUtils();
  const { getRandomPlayableCard } = usePlayerHand();
  const { saveGame } = useGamesHistory();

  const [game, setGame] = useState<Game | null>(null);
  const [revealPlays, setRevealPlays] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

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

  const start = () => {
    const newGame: Game = {
      id: new Date().getTime().toString(),
      localUser: getFreshPlayer(PlayerType.LOCAL_USER),
      opponent: getFreshPlayer(PlayerType.OPPONENT),
      rounds: 0,
      isGameOver: false,
      winner: null,
      playsHistory: [],
    };

    setGame(newGame);

    setIsGameStarted(true);

    console.log("Waiting for user play...");
  };

  const setCardsReveal = async (bool: boolean): Promise<void> => {
    setRevealPlays(bool);
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  };

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

    setTimeout(revealPlaysAndCalculateWinner, 1000);
  };

  const revealPlaysAndCalculateWinner = async () => {
    if (!game) return;

    await setCardsReveal(true);
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

    setTimeout(() => {
      cleanBoard();
    }, 2000);
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
