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

const winningCombos = {
  [CardType.PAPER]: [CardType.ROCK, CardType.WELL],
  [CardType.WELL]: [CardType.ROCK, CardType.SCISSORS],
  [CardType.ROCK]: [CardType.SCISSORS],
  [CardType.SCISSORS]: [CardType.PAPER],
  [CardType.UNKNOWN]: [CardType.UNKNOWN],
};

const icons = {
  [CardType.PAPER]: "📄",
  [CardType.WELL]: "🕳️",
  [CardType.ROCK]: "🪨",
  [CardType.SCISSORS]: "✂️",
  [CardType.UNKNOWN]: "❓",
  [PlayerType.LOCAL_USER]: "🙋‍♂️",
  [PlayerType.OPPONENT]: "🤖",
  [RoundResult.WIN]: "🎉",
  [RoundResult.LOSE]: "😭",
  [RoundResult.DRAW]: "🤝",
};

const useGameUtils = (): useGameUtilsReturn => {
  const { getDefaultPlayerHand } = usePlayerHand();

  const getFreshPlayer = <T>(type: T): Player<T> => ({
    type,
    play: undefined,
    cards: getDefaultPlayerHand(),
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

    if (
      localUser.play === undefined ||
      opponent.play === undefined ||
      localUser.play === opponent.play
    )
      return RoundResult.DRAW;

    if (winningCombos[localUser.play].includes(opponent.play))
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
    if (code === null) return null;
    return icons[code];
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
