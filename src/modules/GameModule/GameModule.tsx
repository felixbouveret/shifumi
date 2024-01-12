import "./GameModule.scss";
import React from "react";
import BoardModule from "../BoardModule";
import { IconButton } from "@mui/joy";
import { Settings } from "@mui/icons-material";

const GameModule: React.FC = () => {
  return (
    <div id="gameModule">
      <div className="header">
        <IconButton className="settingsButton" size="lg">
          <Settings />
        </IconButton>
      </div>
      <BoardModule isOpponent />
      <BoardModule />
    </div>
  );
};

export default GameModule;
