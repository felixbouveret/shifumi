import useAppSettings from "./useAppSettings";
import { CardType } from "@/types/game.enum";

interface usePlayerHandReturn {
  defaultOpponentHand: CardType.UNKNOWN[];
  getDefaultPlayerHand: () => CardType[];
  getRandomPlayableCard: () => CardType;
}

const usePlayerHand = (): usePlayerHandReturn => {
  const { appSettings } = useAppSettings();

  const getDefaultPlayerHand = (): CardType[] => {
    const filteredCards = [
      CardType.UNKNOWN,
      !appSettings.game.cards.well ? CardType.WELL : undefined,
    ];

    return Object.values(CardType).filter(
      (cardType) => !filteredCards.includes(cardType)
    );
  };

  const defaultOpponentHand = new Array(3).fill(CardType.UNKNOWN);

  const getRandomPlayableCard = (): CardType => {
    const randomIndex = Math.floor(
      Math.random() * getDefaultPlayerHand().length
    );
    return getDefaultPlayerHand()[randomIndex];
  };

  return { getDefaultPlayerHand, defaultOpponentHand, getRandomPlayableCard };
};

export default usePlayerHand;
