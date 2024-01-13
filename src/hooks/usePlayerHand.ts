import { CardType } from "@/types/game.enum";

interface usePlayerHandReturn {
  defaultPlayerHand: Omit<CardType[], CardType.UNKNOWN>;
  defaultOpponentHand: CardType.UNKNOWN[];
}

const usePlayerHand = (): usePlayerHandReturn => {
  const defaultPlayerHand = Object.values(CardType).filter(
    (cardType) => cardType !== CardType.UNKNOWN
  );
  const defaultOpponentHand = new Array(3).fill(CardType.UNKNOWN);

  return { defaultPlayerHand, defaultOpponentHand };
};

export default usePlayerHand;
