import { useState } from "react";
import { Game } from "@/types/game.interface";
import { CardType, PlayerType } from "@/types/game.enum";

interface UseGameReturn {
  game: Game | null;
  start: () => void;
  userPlay: (play: CardType) => void;
  isGameStarted: boolean;
  revealPlays: boolean;
}

const useGame = (): UseGameReturn => {
  const [game, setGame] = useState<Game | null>(null);
  const [revealPlays, setRevealPlays] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const start = () => {
    const newGame: Game = {
      id: new Date().getTime().toString(),

      localUser: {
        type: PlayerType.LOCAL_USER,
        play: undefined,
        score: 0,
      },
      opponent: {
        type: PlayerType.OPPONENT,
        play: undefined,
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
  };

  const setPlayer = (play: CardType, playerType: PlayerType) => {
    if (!game) return;
    const newGame = { ...game };
    newGame[playerType].play = play;
    setGame(newGame);
  };

  const userPlay = (play: CardType) => {
    if (!game) return;
    console.log(game);
    setPlayer(play, PlayerType.LOCAL_USER);
    setTimeout(opponentPlay, 1000);
  };

  const opponentPlay = () => {
    if (!game) return;

    const cards = Object.values(CardType).filter((c) => c !== CardType.UNKNOWN);
    const randomPlay = Math.floor(Math.random() * cards.length);
    const play = cards[randomPlay];

    setPlayer(play, PlayerType.OPPONENT);
    setTimeout(revealPlaysAndCalculateWinner, 1000);
  };

  return { game, isGameStarted, revealPlays, start, userPlay };
};

export default useGame;
