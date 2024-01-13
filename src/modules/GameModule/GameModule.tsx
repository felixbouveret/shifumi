import "./GameModule.scss";
import React from "react";
import BoardModule from "../BoardModule";
import { IconButton } from "@mui/joy";
import { Settings } from "@mui/icons-material";
import { CardType, UserType } from "../../types/game.enum";

const GameModule: React.FC = () => {
  const onCardPlayed = (card: CardType, user: UserType) => {
    console.log(card, user);
  };

  return (
    <div id="gameModule">
      <div className="header">
        <IconButton className="settingsButton" size="lg">
          <Settings />
        </IconButton>
      </div>
      <BoardModule isOpponent onCardPlayed={onCardPlayed} />
      <BoardModule onCardPlayed={onCardPlayed} />
    </div>
  );
};

export default GameModule;
