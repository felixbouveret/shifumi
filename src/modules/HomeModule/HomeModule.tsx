import "./HomeModule.scss";
import React from "react";
import { Button, IconButton } from "@mui/joy";
import { People, Settings } from "@mui/icons-material";

const HomeModule: React.FC = () => {
  return (
    <div className="container">
      <h1>Shifumi</h1>
      <Button className="button" size="lg">
        Play
      </Button>

      <div className="iconButtonsContainer">
        <IconButton className="IconButton" size="lg">
          <People />
        </IconButton>

        <IconButton className="IconButton" size="lg">
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default HomeModule;
