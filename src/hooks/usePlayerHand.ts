import { CardType } from "@/types/game.enum";

interface usePlayerHandReturn {
  defaultPlayerHand: Omit<CardType[], CardType.UNKNOWN>;
  defaultOpponentHand: CardType.UNKNOWN[];
  getRandomPlayableCard: () => CardType;
}

const usePlayerHand = (): usePlayerHandReturn => {
  const defaultPlayerHand = Object.values(CardType).filter(
    (cardType) => cardType !== CardType.UNKNOWN
  );

  const defaultOpponentHand = new Array(3).fill(CardType.UNKNOWN);

  const getRandomPlayableCard = (): CardType => {
    const randomIndex = Math.floor(Math.random() * defaultPlayerHand.length);
    return defaultPlayerHand[randomIndex];
  };

  return { defaultPlayerHand, defaultOpponentHand, getRandomPlayableCard };
};

export default usePlayerHand;
