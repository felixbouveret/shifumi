import { CardBackStyle, Theme } from "./settings.enum";

export interface AppSettings {
  game: {
    cards: {
      well: boolean;
    };
  };
  theme: Theme;
  cardBackStyle: CardBackStyle;
}
