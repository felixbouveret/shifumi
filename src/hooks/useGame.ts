import usePlayerHand from "./usePlayerHand";
import useGamesHistory from "./useGamesHistory";
import { useState } from "react";
import { moveCardScriptParams } from "./useSensors";
import { Game, Player } from "@/types/game.interface";
import { BoardParts, BoardSide, CardType, PlayerType } from "@/types/game.enum";

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
  const { defaultPlayerHand, getRandomPlayableCard } = usePlayerHand();
  const { saveGame } = useGamesHistory();

  const [game, setGame] = useState<Game | null>(null);
  const [revealPlays, setRevealPlays] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const getPlayer = <T>(playerType: T): Player<T> => ({
    type: playerType,
    play: undefined,
    cards: defaultPlayerHand,
    score: 0,
    wonTheRound: false,
    hasPlayed: false,
  });

  const start = () => {
    const newGame: Game = {
      id: new Date().getTime().toString(),
      localUser: getPlayer(PlayerType.LOCAL_USER),
      opponent: getPlayer(PlayerType.OPPONENT),
      round: 0,
      isGameOver: false,
      winner: null,
    };

    setGame(newGame);

    setIsGameStarted(true);

    console.log("Waiting for user play...");
  };

  const setCardsReveal = async (bool: boolean): Promise<void> => {
    setRevealPlays(bool);
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const checkPoints = (game: Game): PlayerType | null => {
    if (game.opponent.score === 3) return PlayerType.OPPONENT;
    if (game.localUser.score === 3) return PlayerType.LOCAL_USER;
    return null;
  };

  const revealPlaysAndCalculateWinner = async () => {
    if (!game) return;

    await setCardsReveal(true);

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
      newGame.localUser.wonTheRound = true;
      newGame.localUser.score++;
    } else {
      newGame.opponent.wonTheRound = true;
      newGame.opponent.score++;
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

  const cleanBoard = () => {
    if (!game) return;
    const newGame = { ...game };
    newGame.round++;
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
