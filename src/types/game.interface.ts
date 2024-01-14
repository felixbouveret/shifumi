import { CardType, PlayerType } from "./game.enum";

export interface Player<T = PlayerType> {
  type: T;
  play: CardType | undefined;
  cards: CardType[];
  score: number;
}

export interface Game {
  id: string;
  [PlayerType.LOCAL_USER]: Player<PlayerType.LOCAL_USER>;
  [PlayerType.OPPONENT]: Player<PlayerType.OPPONENT>;
  round: number;
  isGameOver: boolean;
  winner: Player | null;
}
