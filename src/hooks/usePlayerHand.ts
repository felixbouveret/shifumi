import { CardType } from "@/types/game.enum";

interface usePlayerHandReturn {
  defaultPlayerHand: Omit<CardType[], CardType.UNKNOWN>;
}

const usePlayerHand = (): usePlayerHandReturn => {
  const defaultPlayerHand = Object.values(CardType).filter(
    (cardType) => cardType !== CardType.UNKNOWN
  );

  return { defaultPlayerHand };
};

export default usePlayerHand;
