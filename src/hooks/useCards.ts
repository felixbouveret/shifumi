import useGameUtils from "./useGameUtils";
import { CardType } from "@/types/game.enum";

interface useCardsReturn {
  getCardContent: (type: CardType) => { icon: string | null; title: string };
}

const useCards = (): useCardsReturn => {
  const { getIconFromEnum } = useGameUtils();
  const getCardContent = (type: CardType) => {
    const icon = getIconFromEnum(type);
    const title = type;

    return { icon, title };
  };

  return { getCardContent };
};

export default useCards;
