import "./HomeModule.scss";
import React from "react";
import { Button, IconButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { People, Settings } from "@mui/icons-material";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Shifumi</h1>
      <Button className="button" size="lg" onClick={() => navigate("/Game")}>
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
