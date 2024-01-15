import usePlayerHand from "@/hooks/usePlayerHand";
import { Game, Player } from "@/types/game.interface";
import { CardType, PlayerType, RoundResult } from "@/types/game.enum";

interface useGameUtilsReturn {
  getFreshPlayer: <T>(type: T) => Player<T>;
  getFreshGame: () => Game;
  checkPoints: (game: Game) => PlayerType | null;
  getRoundWinnerFromResult: (result: RoundResult) => PlayerType | null;
  getRoundResultFromWinner: (result: PlayerType | null) => RoundResult;
  getRoundResult: (game: Game) => RoundResult;
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

  const getFreshGame = (): Game => ({
    id: new Date().getTime().toString(),
    localUser: getFreshPlayer(PlayerType.LOCAL_USER),
    opponent: getFreshPlayer(PlayerType.OPPONENT),
    rounds: 0,
    isGameOver: false,
    winner: null,
    playsHistory: [],
  });

  const checkPoints = (game: Game): PlayerType | null => {
    const { localUser, opponent } = game;

    if (opponent.score === 3) return PlayerType.OPPONENT;
    if (localUser.score === 3) return PlayerType.LOCAL_USER;

    return null;
  };

  const getRoundResult = (game: Game): RoundResult => {
    const { localUser, opponent } = game;

    if (localUser.play === opponent.play) return RoundResult.DRAW;

    if (
      (localUser.play === CardType.ROCK &&
        opponent.play === CardType.SCISSORS) ||
      (localUser.play === CardType.PAPER && opponent.play === CardType.ROCK) ||
      (localUser.play === CardType.SCISSORS && opponent.play === CardType.PAPER)
    )
      return RoundResult.WIN;
    else return RoundResult.LOSE;
  };

  const getRoundWinnerFromResult = (result: RoundResult): PlayerType | null => {
    if (result === RoundResult.DRAW) return null;
    return result === RoundResult.WIN
      ? PlayerType.LOCAL_USER
      : PlayerType.OPPONENT;
  };

  const getRoundResultFromWinner = (player: PlayerType | null): RoundResult => {
    if (player === null) return RoundResult.DRAW;
    return player === PlayerType.LOCAL_USER
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
        return "🙋‍♂️";
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
    getFreshGame,
    checkPoints,
    getRoundWinnerFromResult,
    getRoundResultFromWinner,
    getRoundResult,
    getIconFromEnum,
  };
};

export default useGameUtils;
