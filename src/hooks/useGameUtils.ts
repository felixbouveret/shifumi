import usePlayerHand from "./usePlayerHand";
import { Game, Player } from "@/types/game.interface";
import { CardType, PlayerType, RoundResult } from "@/types/game.enum";

interface useGameUtilsReturn {
  getFreshPlayer: <T>(type: T) => Player<T>;
  checkPoints: (game: Game) => PlayerType | null;
  checkRoundWinner: (game: Game) => PlayerType | null;
  getRoundResult: (roundWinner: PlayerType | null) => RoundResult;
  getIconFromEnum: (
    roundWinner: PlayerType | RoundResult | CardType | null
  ) => string | null;
}

const useGameUtils = (): useGameUtilsReturn => {
  const { defaultPlayerHand } = usePlayerHand();

  const getFreshPlayer = <T>(type: T): Player<T> => ({
    type,
    play: undefined,
    cards: defaultPlayerHand,
    score: 0,
    wonTheRound: false,
    hasPlayed: false,
  });

  const checkPoints = (game: Game): PlayerType | null => {
    const { localUser, opponent } = game;

    if (opponent.score === 3) return PlayerType.OPPONENT;
    if (localUser.score === 3) return PlayerType.LOCAL_USER;

    return null;
  };

  const checkRoundWinner = (game: Game): PlayerType | null => {
    const { localUser, opponent } = game;

    if (localUser.play === opponent.play) return null;

    if (
      (localUser.play === CardType.ROCK &&
        opponent.play === CardType.SCISSORS) ||
      (localUser.play === CardType.PAPER && opponent.play === CardType.ROCK) ||
      (localUser.play === CardType.SCISSORS && opponent.play === CardType.PAPER)
    )
      return PlayerType.LOCAL_USER;
    else return PlayerType.OPPONENT;
  };

  const getRoundResult = (roundWinner: PlayerType | null): RoundResult => {
    if (roundWinner === null) return RoundResult.DRAW;
    return roundWinner === PlayerType.LOCAL_USER
      ? RoundResult.WIN
      : RoundResult.LOSE;
  };

  const getIconFromEnum = (
    code: CardType | PlayerType | RoundResult | null
  ): string | null => {
    switch (code) {
      case CardType.ROCK:
        return "🪨";
      case CardType.PAPER:
        return "📄";
      case CardType.SCISSORS:
        return "✂️";
      case CardType.UNKNOWN:
        return "❓";
      case PlayerType.LOCAL_USER:
        return "👤";
      case PlayerType.OPPONENT:
        return "🤖";
      case RoundResult.WIN:
        return "🎉";
      case RoundResult.LOSE:
        return "😭";
      case RoundResult.DRAW:
        return "🤝";
      default:
        return null;
    }
  };

  return {
    getFreshPlayer,
    checkPoints,
    checkRoundWinner,
    getRoundResult,
    getIconFromEnum,
  };
};

export default useGameUtils;
