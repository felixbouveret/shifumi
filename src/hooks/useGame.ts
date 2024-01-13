import usePlayerHand from "./usePlayerHand";
import { useState } from "react";
import { Game } from "@/types/game.interface";
import { CardType, PlayerType } from "@/types/game.enum";

interface UseGameReturn {
  game: Game | null;
  start: () => void;
  userPlay: (play: CardType) => void;
  setPlayerHand: (playerType: PlayerType, cards: CardType[]) => void;
  setPlayerPlay: (playerType: PlayerType, cards: CardType) => void;
  isGameStarted: boolean;
  revealPlays: boolean;
}

const useGame = (): UseGameReturn => {
  const { defaultPlayerHand } = usePlayerHand();

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
      },
      opponent: {
        type: PlayerType.OPPONENT,
        play: undefined,
        cards: defaultPlayerHand,
        score: 0,
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

      console.log("Waiting for user play...");
    }, 2000);
  };

  const resetCards = () => {
    if (!game) return;
    const newGame = { ...game };
    newGame.localUser.cards = defaultPlayerHand;
    newGame.opponent.cards = defaultPlayerHand;
    newGame.localUser.play = undefined;
    newGame.opponent.play = undefined;
    setGame(newGame);
  };

  const setPlay = (playerType: PlayerType, play: CardType) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].play = play;
    setGame(newGame);
  };

  const userPlay = (play: CardType) => {
    if (!game) return;
    console.log(game);
    setPlay(PlayerType.LOCAL_USER, play);
    setTimeout(opponentPlay, 1000);
  };

  const opponentPlay = () => {
    if (!game) return;

    const cards = game.opponent.cards;
    const randomPlay = Math.floor(Math.random() * cards.length);
    const play = cards[randomPlay];

    setPlay(PlayerType.OPPONENT, play);
    setPlayerHand(
      PlayerType.OPPONENT,
      cards.filter((c) => c !== play)
    );
    setTimeout(revealPlaysAndCalculateWinner, 1000);
  };

  const setPlayerHand = (playerType: PlayerType, cards: CardType[]) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].cards = cards;
    setGame(newGame);
  };

  const setPlayerPlay = (playerType: PlayerType, card: CardType) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].play = card;
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
